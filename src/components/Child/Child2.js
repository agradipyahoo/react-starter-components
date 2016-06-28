/**
 * Created by ravi.hamsa on 6/22/16.
 */
import React, {Component} from "react";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Child.scss'
import BaseComponent from '../../core/BaseComponent'


class ChildComponent2 extends BaseComponent {
    constructor(){
        super(...arguments);
        this.state = {}
    }

    inputs = {
        'app.some.key1': 'setKey2'
    }

    render() {
        return <div className={s.root}> Child Comp2 {this.state.setKey2} setKey2
           
        </div>
    }
}




export default withStyles(s)(ChildComponent2);