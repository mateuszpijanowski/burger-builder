import React, { Component } from 'react';
import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSingUp: true
    };

    static checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if(rules.required && isValid) {
            isValid = value.trim() !== "";
        }

        if(rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }

        if(rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: Auth.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSingUp: !prevState.isSingUp
            };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map(inputEl => (
             <Input
                key={inputEl.id}
                valueName={inputEl.id}
                elementType={inputEl.config.elementType}
                elementConfig={inputEl.config.elementConfig}
                value={inputEl.config.value}
                invalid={!inputEl.config.valid}
                touched={inputEl.config.touched}
                shouldValidate={inputEl.config.validation}
                changed={(event) => this.inputChangeHandler(event, inputEl.id)} />
        ));

        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSingUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
};

export default connect(null, mapDispatchToProps)(Auth);
