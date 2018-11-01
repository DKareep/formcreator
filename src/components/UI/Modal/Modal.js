import React, {Component} from 'react';
import Classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {
    state = {
        show: true
    }
    modalClosed = () => {
        this.setState({
            show: false
        }, () => {
            this.props.submitHandlerReset();
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.show !== this.state.show
    }

    render() {

        return (

            <Aux>
                <BackDrop show={this.state.show} clicked={this.modalClosed}/>
                <div className={Classes.Modal}
                     style={{
                         transform: this.state.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.state.show ? '1' : '0'
                     }}>
                    <table>
                        <thead></thead>
                        <tbody>
                        {this.props.formElementArrayDeal.map(function (item, key) {
                            return (
                                <tr key={key}>
                                    <td>{item.config.label}</td>
                                    <td>{JSON.stringify(item.config.value)}</td>
                                </tr>
                            )
                        })}
                        {this.props.formElementArrayInvoice.map(function (item, key) {
                            return (
                                <tr key={key}>
                                    <td>{item.config.label}</td>
                                    <td>{JSON.stringify(item.config.value)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                   <button className={Classes.ButtonNext} onClick={this.modalClosed}>Confirm</button>
                </div>
            </Aux>
        )
    }

}

export default Modal;
