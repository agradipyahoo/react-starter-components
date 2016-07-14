/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {PropTypes, Component} from "react";
import FormElement from './FormElement'


class CheckBox extends FormElement {

    getValueFromNode(node){
        return node.checked;
    }
    
    render() {

        let defaultValue = this.getDefaultValue();
        let formClasses = this.getFormClasses();

        return <fieldset className={formClasses}>

            <div class="checkbox">
                <label>
                    <input type="checkbox" name={this.props.name}
                           placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}
                           defaultChecked={defaultValue}/> {this.props.label}
                </label>
                {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
                {this.props.errors ? <small className="text-muted">{this.props.errors}</small> : '' }
            </div>
        </fieldset>
    }
}


CheckBox.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue:PropTypes.bool,
    options:PropTypes.array
}


export default CheckBox;