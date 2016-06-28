/**
 * Created by ravi.hamsa on 6/22/16.
 */
import React, {Component} from "react";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Child.scss'
import BaseComponent from '../../core/BaseComponent'


class ChildComponent extends BaseComponent {

    outputs = {
        key1: 'app.some.key1'
    }


    render() {
        return <div className={s.root}>Child Component {this.props.key1} rendered with Style</div>
    }
}

export default withStyles(s)(ChildComponent);