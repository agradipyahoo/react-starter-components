/**
 * Created by ravi.hamsa on 6/22/16.
 */
import React,{Component} from "react";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Child.scss'

import {BaseComponent} from '../../core';


class Child extends BaseComponent {
    render(){
        return <div className={s.root}>Child Component {this.props.name} rendered with Style, text {this.state.text}</div>
    }
}

export default withStyles(s)(Child);