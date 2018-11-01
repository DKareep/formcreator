import React, {Component} from 'react';
import classes from './Input.css'
import DatePicker from 'react-datepicker';
import moment from "moment/moment";

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Input extends Component {

    dateChange = (date) => {
        this.props.changed(date, this.props.elementType)

    }

    render() {
        let inputElement = null;
        const inputClasses = [classes.InputElement];

        if (this.props.invalid && this.props.shouldValidate && this.props.touched) {
            inputClasses.push(classes.Invalid);
        }
        switch (this.props.elementType) {
            case ('input'):
                inputElement = <input
                    onChange={this.props.changed}
                    className={inputClasses.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.value}

                />;
                break;
            case ('textarea'):
                inputElement = <textarea className={inputClasses.join(' ')}
                                         {...this.props.elementConfig}
                                         value={this.props.value}
                                         onChange={this.props.changed}
                />
                break;
            case ('datetime'):
                let maxDate, minDate, exclude;
                if (this.props.elementConfig.dateLabel === 'listing' || this.props.elementConfig.dateLabel === 'issued') {
                    maxDate = moment();
                } else if (this.props.elementConfig.dateLabel === 'repay') {
                    minDate = moment();
                    exclude = [moment()];

                }
                inputElement = <DatePicker
                    selected={this.props.value}
                    minDate={minDate}
                    maxDate={maxDate}
                    excludeDates={exclude}
                    className={inputClasses.join(' ')}
                    required={true}

                    inputProps={{id: 'date'}}
                    onChange={this.dateChange}
                />;
                break;
            case ('select'):
                inputElement =
                    <select className={classes.InputElement} onChange={this.props.changed}>
                        {this.props.elementConfig.options.map(option => {
                            return (<option key={option.value} value={option.value}>{option.displayValue} </option>)
                        })}

                    </select>
                break;
            default:
                inputElement = <input className={inputClasses.join(' ')} {...this.props} />
        }

        return (
            <div className={this.props.invoice ? [classes.Input, classes.WidthReset].join(' ') : classes.Input}>
                <label className={classes.Label}>{this.props.label} </label>
                {inputElement}
                {this.props.invalid && this.props.touched ? <p className={classes.Error}>{this.props.error}</p> : ''}

            </div>
        )
    }
}

export default Input;
