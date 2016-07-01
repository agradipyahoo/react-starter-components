/**
 * Created by ravi.hamsa on 6/28/16.
 */

import fetch from './fetch';
import Promise from 'bluebird';

class DataLoader {
    _resourceConfigIndex = {}

    _commonHeaders = {}

    generateGetUrl(url, data) {
        if (!data) {
            return url;
        }
        _.each(data, function (value, index) {
            url = url.replace(':' + index, value);
        })

        return url;
    }


    addResource(requestId, config) {
        this._resourceConfigIndex[requestId] = config;
    }

    setCommonHeaders(headers) {
        this._commonHeaders = headers
    }

    getRequestDef(requestId, payload) {
        var config = this._resourceConfigIndex[requestId];

        return new Promise(function (resolve, reject) {
            if (config.type === 'static') {
                resolve(config.data);
                return;
            }


            if (config.paramParser) {
                payload = config.paramParser(payload);
            }

            var cache = config.cache || 'session';

            var requestUrl = config.url;
            var requestConfig = {
                method: config.method || 'get',
                headers: this._commonHeaders,
                credentials: 'include'
            }

            config.method === 'post' ? requestConfig.body = JSON.stringify(payload) : requestUrl = this.generateGetUrl(requestUrl, payload);
            var fetchPromise = fetch(requestUrl, requestConfig);
            fetchPromise
                .then(function (response) {
                    return response.json();
                })
                .then(function (body) {
                    if (config.parser) {
                        body = config.parser(body);
                    }
                    resolve(body);
                }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
        });
    }
}


export default new DataLoader();