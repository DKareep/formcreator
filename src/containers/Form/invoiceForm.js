import React, {Component} from 'react';
import Input from '../Input/input';
import Classes from './Form.css';

import Modal from '../../components/UI/Modal/Modal'
import * as actions from '../../store/actionCreators/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Aux from "../../hoc/Aux";

class InvoiceForm extends Component {
    render() {
        const formElementArrayInvoice = [];
        const formElementArrayDeal = [];

        for (let key in this.props.invoiceForm) {
            formElementArrayInvoice.push({
                id: key,
                config: this.props.invoiceForm[key]
            });
        }
        for (let key in this.props.dealForm) {
            formElementArrayDeal.push({
                id: key,
                config: this.props.dealForm[key]
            });
        }

        let invoice = (
            <form onSubmit={this.orderHandler} className={Classes.FormSizing}>
                {formElementArrayInvoice.map(formElement => (
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
                        changed={(event) => this.props.inputChangedHandler(event, formElement.id, this.props.invoiceForm, this.props.dealForm)}
                    />
                ))}
            </form>
        )

        return (
            <Aux>
                {this.props.showModal && this.props.dateValidity ?
                    <Modal submitHandlerReset={this.props.submitHandlerReset}
                           formElementArrayDeal={formElementArrayDeal}
                           formElementArrayInvoice={formElementArrayInvoice}/> : null}

                {this.props.transitionToDeal ? <Redirect to='/deal'/> : null}
                <h2 className={Classes.createDealText}>CREATE AN INVOICE</h2>
                <section className={Classes.FormContainer}>

                    {invoice}

                </section>


                <div style={{height: '30px', textAlign: 'center'}}>
                    {!this.props.dateValidity ?
                        <p className={Classes.Error}>Deal creation date should be between Invoice date and Payment
                            date</p> : ''}
                </div>
                <div className={Classes.ButtonContainer}>
                    <button disabled={!this.props.dealFormValid}
                            className={this.props.dealFormValid ? Classes.ButtonPrev : Classes.ButtonDisabled}
                            onClick={this.props.transitionToDealHandler}>Prev
                    </button>
                    <button disabled={!this.props.dealFormValid}
                            className={this.props.dealFormValid && this.props.invoiceFormValid ? Classes.ButtonSubmit : Classes.ButtonDisabledSubmit}
                            onClick={() => this.props.submitHandler(this.props.dealForm, this.props.invoiceForm)}>Submit
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
        submitForm: state.submitForm,
        dateValidity: state.dateValidity,
        dealFormValid: state.dealFormValid,
        invoiceFormValid: state.invoiceFormValid,
        showModal: state.showModal

    }

};

const mapDispatchToProps = dispatch => {
    return {
        transitionToDealHandler: () => dispatch(actions.transitionToDeal()),
        submitHandler: (dealForm, invoiceForm) => dispatch(actions.submitHandler(dealForm, invoiceForm)),
        submitHandlerReset: () => dispatch(actions.submitHandlerReset()),
        inputChangedHandler: (e, inputIdentifier, invoiceForm, dealForm) => dispatch(actions.inputChangedHandlerInvoice(e, inputIdentifier, invoiceForm, dealForm)),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);


