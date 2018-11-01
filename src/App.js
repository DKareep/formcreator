import React, {Component} from 'react';
// import logo from './logo.svg';
import Classes from './App.css';
import DealForm from './containers/Form/dealForm';
import InvoiceForm from './containers/Form/invoiceForm';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path="/deal" component={DealForm}/>

                <Redirect to="/deal"/>
            </Switch>
        )
        if (this.props.dealFormValid) {
            routes = <Switch>
                <Route path="/deal" component={DealForm}/>
                <Route path="/invoice" exact component={InvoiceForm}/>
                <Redirect to="/deal"/>
            </Switch>
        }
        return (
            <div>
                <nav className={Classes.Nav}>
                    <div className={Classes.NavWrapper}>
                        <a href="#!" className="brand-logo">
                            {/*<img src={logo} className="" style={{height: '20px'}} alt="logo"/>*/}
                        </a>
                    </div>
                </nav>

                <div className="App">
                    {routes}
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        dealFormValid: state.dealFormValid
    }
}
export default withRouter(connect(mapStateToProps,)(App));
