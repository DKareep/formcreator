import React, {Component} from 'react';
import Input from '../Input/input';
import Classes from './Form.css';
import Aux from '../../hoc/Aux';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actionCreators/index';
import {connect} from 'react-redux';

class DealForm extends Component {
    render() {
        const formElementArrayDeal = [];
        const formElementArrayInvoice = [];

        for (let key in this.props.dealForm) {
            formElementArrayDeal.push({
                id: key,
                config: this.props.dealForm[key]
            });
        }
        for (let key in this.props.invoiceForm) {
            formElementArrayInvoice.push({
                id: key,
                config: this.props.invoiceForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArrayDeal.map(formElement => (
                    <Input
                        label={formElement.config.label}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        error={formElement.config.error}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.props.inputChangedHandler(event, formElement.id, this.props.dealForm)}
                    />
                ))}
                <div>

                </div>
            </form>
        )
        let invoiceDetails = (
            <Aux>
                {formElementArrayInvoice.map((formElement, key) => {
                    let value;
                    if (formElement.config.elementType === 'datetime') {
                        value = moment(formElement.config.value).format();
                    } else {
                        value = formElement.config.value;
                    }
                    return (
                        <div key={key}>
                            <p>
                                {formElement.config.label}

                            </p>
                            <p className={Classes.InvoiceValueOnDealForm}>
                                > {value === '' ? '(Yet to be filled)' : value}
                            </p>
                        </div>
                    )
                })
                }
            </Aux>
        );
        return (
            <Aux>
                <h2 className={Classes.createDealText}>CREATE DEAL FORM</h2>
                <section className={Classes.FormContainer}>
                    <div className={this.props.transitionToDeal ? Classes.halfForm : Classes.FormSizing}>
                        {form}
                    </div>
                    {this.props.transitionToDeal ?
                        <div className={Classes.InvoiceStyle}>
                            {invoiceDetails}
                        </div>
                        : null}

                    {this.props.transitionToInvoice ? <Redirect to='/invoice'/> : null}
                </section>
                <div className={Classes.ButtonContainer}>
                    <button disabled={!this.props.dealFormValid} className={this.props.dealFormValid ? Classes.ButtonNext : Classes.ButtonDisabled}
                            onClick={this.props.transitionToInvoiceHandler}>Next
                    </button>
                </div>
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return {
        dealForm: state.dealForm,
        invoiceForm: state.invoiceForm,
        transitionToInvoice: state.transitionToInvoice,
        transitionToDeal: state.transitionToDeal,
        dealFormValid: state.dealFormValid
    }

};

const mapDispatchToProps = dispatch => {
    return {
        transitionToInvoiceHandler: () => dispatch(actions.transitionToInvoice()),
        inputChangedHandler: (e, inputIdentifier, dealForm) => dispatch(actions.inputChangedHandler(e, inputIdentifier, dealForm)),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DealForm);


