/**
 * Created by ravi.hamsa on 3/24/17.
 */
import FormElement from './FormElement';
import Selection from 'selection-manager';


export default class SelectionFormElement  extends FormElement {
    constructor(){
        super(...arguments);
        this.multiSelect = this.props.multiSelect === true;
        this.selectionManager = new Selection({multiSelect: this.multiSelect});
        this.changeSubscription = this.selectionManager.on('change', this.onChange.bind(this));
    }

    componentWillMount(){
        super.componentWillMount();
        let defaultValue = this.getDefaultValue();
        this.applyValue(defaultValue)
    }

    componentWillReceiveProps(newProps){
        if(newProps.options && newProps.options !== this.props.options){
            this.selectionManager.clear();
        }
    }

    onChange(selection) {
        let valueToSet;
        if(selection){
            if (this.multiSelect) {
                valueToSet = (_.map(selection, 'id'));
            } else {
                valueToSet = (selection.id);
            }
        }else{
            valueToSet = this.props.emptyValue !== undefined ? this.props.emptyValue : selection;
        }
        this.setValue(valueToSet);
        this.onChangeUpdates(valueToSet);
    }

    onChangeUpdates(){
        // to be overridden by components
    }

    applyValue(value) {
        if (this.multiSelect) {
            value = value || [];
            _.each(value, (valueId) => {
                this.selectById(valueId)
            })
        } else {
            this.selectById(value)
        }
    }

    selectById(value) {
        let options = this.props.options;
        let toSelectItem = _.find(options, (item) => item.id === value);
        if (toSelectItem) {
            if (this.multiSelect) {
                this.selectionManager.toggle(toSelectItem)
            } else {
                this.selectionManager.select(toSelectItem)
            }
        }
    }

    clickHandler(event) {
        let target = event.target;
        if (target.classList.contains('list-item')) {
            let dataId = target.dataset.id;
            this.selectById(dataId);
        }
    }

    getFormClasses() {
        let classArray = ['form-group'];
        classArray.push(this.props.className)
        if (this.state.errors.length > 0) {
            classArray.push('has-error');
        }
        return classArray.join(' ')
    }


}