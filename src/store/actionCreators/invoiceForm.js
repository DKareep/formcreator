import * as actionTypes from './actionTypes';
import * as actions from './index';
import moment from "moment/moment";

export const inputChangedHandlerInvoice = (e, inputIdentifier, invoiceForm, dealForm) => {

    return dispatch => {
        const updatedOrderForm = {
            ...invoiceForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        if (inputIdentifier === 'issueDate' || inputIdentifier === 'repaymentDate') {
            updatedFormElement.value = e;
        } else {
            updatedFormElement.value = e.target.value;
        }
        updatedFormElement.valid = actions.checkValidation(updatedFormElement.value, updatedFormElement.validation, dealForm);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        dispatch({
            type: actionTypes.SAVE_INVOICE_FORM,
            invoiceForm: updatedOrderForm,
            invoiceFormValid: formIsValid
        })
    }
}

export const transitionToDeal = () => {
    return {
        type: actionTypes.TRANSITION_TO_DEAL,
        transitionToDeal: true,
        transitionToInvoice: false
    }
}
export const dateCheck = (dealForm, invoiceForm) => {

    if (moment(invoiceForm['issueDate'].value).unix() < moment(dealForm['dealdate'].value).unix() && moment(dealForm['dealdate'].value).unix() < moment(invoiceForm['repaymentDate'].value).unix()) {

        return true;
    } else {
        return false;
    }
}

export const submitHandler = (dealForm, invoiceForm) => {
    const dateValidity = dateCheck(dealForm, invoiceForm)
    if (dateValidity) {
        return {
            type: actionTypes.SUBMIT_FORM,
            showModal: true,
            dateValidity: dateValidity

        }
    } else {
        return {
            type: actionTypes.SUBMIT_FORM,
            showModal: false,
            dateValidity: false

        }
    }

}
export const submitHandlerReset = () => {
    return {
        type: actionTypes.SUBMIT_FORM_REST,
        showModal: false,
    }
}
