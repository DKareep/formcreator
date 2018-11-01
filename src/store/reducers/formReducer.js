import * as actionTypes from '../actionCreators/actionTypes';
import moment from "moment/moment";

const initialState = {
    dealForm: {
        name: {
            label: 'Name',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Deal name'
            },
            value: '',
            validation: {
                required: true,
                isText: true
            },
            valid: false,
            touched: false,
            error: 'Numerics and special characters not allowed'
        },
        dealdate: {
            label: 'Deal Date',
            elementType: 'datetime',
            elementConfig: {
                dateLabel: 'listing',
                type: 'datetime',

            },
            value: moment(),
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        amount: {
            label: 'Amount',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Deal Amount'
            },
            value: 0,
            validation: {
                required: true,
                isNumeric: true
            },
            error: 'Enter a valid number',
            valid: false,
            touched: false
        }

    },
    invoiceForm: {
        invoiceName: {
            label: 'Invoice Name',

            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Invoice Name'
            },
            value: '',
            validation: {
                required: true,
                isText: true
            },
            valid: false,
            touched: false,
            error: 'Numerics and special characters not allowed'
        },
        issueDate: {
            label: 'Issue Date',
            elementType: 'datetime',
            elementConfig: {
                dateLabel: 'issued',
                type: 'datetime',
                placeholder: 'Your Name'
            },
            value: moment(),
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        repaymentDate: {
            label: 'Repayment Date',
            elementType: 'datetime',
            elementConfig: {
                dateLabel: 'repay',
                type: 'datetime',
                placeholder: 'Your Name'
            },
            value: moment(),
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        amount: {
            label: 'Amount',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Amount '
            },
            value: 0,
            validation: {
                required: true,
                isNumeric: true,
                greaterThan: true
            },
            valid: false,
            touched: false,
            error: 'Enter a valid number/ amount should be greater than deal amount',
        }
    },
    dealFormValid: false,
    //formIsValid: false,
    invoiceFormValid: false,
    // formIsValid: false,
    transitionToInvoice: false,
    transitionToDeal: false,
    submitForm: false,
    dateValidity: true,
    showModal: false

}

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_DEAL_FORM:
            return {
                ...state,
                dealForm: action.dealForm,
                dealFormValid: action.dealFormValid
            }


        case actionTypes.SAVE_INVOICE_FORM:
            return {
                ...state,
                invoiceForm: action.invoiceForm,
                invoiceFormValid: action.invoiceFormValid

            }

        case actionTypes.TRANSITION_TO_INVOICE:
            return {
                ...state,
                transitionToInvoice: action.transitionToInvoice,
                transitionToDeal: action.transitionToDeal
            }

        case actionTypes.TRANSITION_TO_DEAL:
            return {
                ...state,
                transitionToDeal: action.transitionToDeal,
                transitionToInvoice: action.transitionToInvoice

            }

        case actionTypes.SUBMIT_FORM:
            return {
                ...state,
                showModal: action.showModal,
                dateValidity: action.dateValidity
            }
        case actionTypes.SUBMIT_FORM_REST:
            return {
                ...state,
                showModal: action.showModal
            }

        default:
            return state;

    }
}
export default formReducer;
