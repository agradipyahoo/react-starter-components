/**
 * Created by ravi.hamsa on 6/27/16.
 */
import {EventEmitter} from "events"


class Watcher extends EventEmitter{

    _subscriptionIndex = {};
    _dataIndex = {};

    triggerOutput(outputName, newValue, oldValue){
        let fullOutputName = outputName;
        this._dataIndex[outputName] = newValue;
        while(outputName.indexOf('.') !== -1){
            this.executeHandlers(outputName, newValue, oldValue, fullOutputName);
            outputName = outputName.substr(0,outputName.lastIndexOf('.'))
        }
    }

    executeHandlers(outputName, newValue, oldValue, fullOutputName){
        for(let subscriptionId in this._subscriptionIndex){
            let component = this._subscriptionIndex[subscriptionId];
            let inputs = component.inputs;
            if(inputs && inputs[outputName]){
                component.setState({[inputs[outputName]]:newValue})
            }
        }
    }

    subscribe(baseComponent){
        let componentId = baseComponent._componentId;
        this._subscriptionIndex[componentId] =  baseComponent;

        let outputs = baseComponent.outputs;
        if(outputs){
            for(let output in outputs){
                if(baseComponent.props){
                    var outputValue = baseComponent.props[output];
                    if(outputValue !== undefined){
                        // this._dataIndex[outputs[output]] = outputValue
                        this.triggerOutput(outputs[output], outputValue);
                    }
                }
            }
        }

        let inputs = baseComponent.inputs;
        if(inputs){
            for(let input in inputs){
                var inputValue = this._dataIndex[input];
                if(inputValue !== undefined){
                    baseComponent.setState({[inputs[input]]:inputValue})
                }
            }
        }

        return function(){
            delete this._subscriptionIndex[componentId];
        }
    }
}

window.watcher = new Watcher();
export default window.watcher;