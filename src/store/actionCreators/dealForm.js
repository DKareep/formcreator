import * as actionTypes from './actionTypes';
import * as actions from './index';


export const inputChangedHandler = (e, inputIdentifier, dealForm) => {

    return dispatch => {
        const updatedOrderForm = {
            ...dealForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        if (inputIdentifier === 'dealdate') {
            updatedFormElement.value = e;
        } else {
            updatedFormElement.value = e.target.value;
        }
        updatedFormElement.valid = actions.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        dispatch({
            type: actionTypes.SAVE_DEAL_FORM,
            dealForm: updatedOrderForm,
            dealFormValid: formIsValid
        })
    }
};
export const transitionToInvoice = () => {
    return {
        type: actionTypes.TRANSITION_TO_INVOICE,
        transitionToInvoice: true,
        transitionToDeal: false
    }
};
