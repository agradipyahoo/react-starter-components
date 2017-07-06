/**
 * Created by ravi.hamsa on 3/25/17.
 */
export default {
    'eq': function(value, rule) {
        return value.value ===  rule.value;
    },
    'neq': function(value, rule) {
        return value.value !==  rule.value;
    },
    'falsey': function(value, rule){
        return !value.value;
    },
    'truthy': function(value, rule){
        return value.value;
    },
    'contains': function(value, rule){
        return rule.value.indexOf(value.value) !== -1;
    },
    'function': function(value, rule) {
        var func = rule.func;
        return func.apply(this, arguments);
    }
};