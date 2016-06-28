/**
 * Created by ravi.hamsa on 6/27/16.
 */

import {Component} from "react";
import watcher from "../core/watcher";

let componentCounter = 1;


class BaseComponent extends Component {
    constructor(){
        super(...arguments);
        this._componentId = this.constructor.name + '-'+componentCounter++;
    }
    componentWillMount(){
        this.unsubscribeWatcher = watcher.subscribe(this);
    }
    componentWillUnMount(){
        this.unsubscribeWatcher();
    }
    componentWillReceiveProps(newProps){
        var outputs = this.outputs;
        if(!outputs)
        {
            return;
        }

        for(let output in outputs){
            watcher.triggerOutput(outputs[output], newProps[output], this.props[output])
        }
    }
}


export default BaseComponent