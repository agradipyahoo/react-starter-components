/**
 * Created by ravi.hamsa on 6/22/16.
 */


import React, {Component, PropTypes} from "react";
import Child, {Child2} from './components/Child'
import emptyFunction from 'fbjs/lib/emptyFunction';

const context = {
    insertCss: styles => styles._insertCss(),
    onSetTitle: value => (document.title = value),
}

let counter = 100

class App extends Component {

    constructor(){
        super(...arguments);
        this.state = {
            value1:counter
        }
    }

    onClickMe(){
        this.setState({
            value1:counter++
        })
    }

    getChildContext() {
        const context = this.props.context;
        return {
            insertCss: context.insertCss || emptyFunction,
            onSetTitle: context.onSetTitle || emptyFunction,
        }
    }

    render() {

        return <div>
            <Child2 />
            This is React App

            <div>
                <div>asdfa
                    <div>asdfasdf
                        <div>
                            Some where deep down
                            <Child key1={this.state.value1} />
                        </div></div></div>
            </div>


            <Child2 />

            <div className="clickMe" onClick={this.onClickMe.bind(this)}>ClickMe update value1</div>
        </div>
    }


}

App.childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired
}

window.App = App;
window.appContext = context;

export default App;