import {Component} from "react";
import watcher from "./watcher";

let componentCounter = 1;


class BaseComponent extends Component {
    constructor(){
        super(...arguments);
        this._componentId = this.constructor.name + '-'+componentCounter++;
        this._watcherChangeHandler = this.updateStateFromWatcher.bind(this);
    }
    componentWillMount(){
        this.setupWatcher();
    }

    setupWatcher(){
        let self = this;
        if(this.props && this.props.inputs){
            self.updateStateFromWatcher();
            watcher.on('change', this._watcherChangeHandler)
        }
    }

    updateStateFromWatcher(){
        let self = this;
        let inputs = this.props.inputs;
        let fullData = watcher.getAll();
        let toSet = {};
        for(let stateKey in inputs){
            let watcherKey = inputs[stateKey];
            if(fullData[watcherKey] !== undefined){
                toSet[stateKey]=fullData[watcherKey];
            }
        }
        self.setState(toSet);
    }

    updateStateToWatcher(){
        let self = this;
        let outputs = this.props.outputs;
        let fullData = this.state;
        let toSet = {};
        for(let stateKey in outputs){
            let watcherKey = outputs[stateKey];
            if(fullData[stateKey] !== undefined){
                toSet[watcherKey]=fullData[stateKey];
            }
        }
        watcher.set(toSet);
    }

    componentWillUnmount(){
        watcher.off('change', this._watcherChangeHandler)
    }

    componentWillUpdate(newProps, nextState){
        if(this.props && this.props.outputs){
            this.updateStateToWatcher();
        }
    }
}


export default BaseComponent
