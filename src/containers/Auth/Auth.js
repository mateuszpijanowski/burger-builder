import React, { PureComponent } from 'react';
import classes from './Auth.css';
import { Redirect, withRouter } from "react-router-dom";

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends PureComponent {
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

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath) {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            })
        });
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
        let error = null;

        if (this.props.error) {
            switch (this.props.error.message) {
                case ('EMAIL_EXISTS'):
                    error = <p className={classes.Error}>This E-mail already exists!</p>;
                    break;
                case ('TOO_MANY_ATTEMPTS_TRY_LATER'):
                    error = <p className={classes.Error}>Too many attempts. Try again later</p>;
                    break;
                case ('EMAIL_NOT_FOUND'):
                    error = <p className={classes.Error}>This E-mail was not found!</p>;
                    break;
                case ('INVALID_PASSWORD'):
                    error = <p className={classes.Error}>This password is incorrect!</p>;
                    break;
                case ('USER_DISABLED'):
                    error = <p className={classes.Error}>This user has been disabled by Administrator!</p>;
                    break;
                default:
                    error = null;
                    break;
            }
        }

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = <Spinner />;

        if(!this.props.loading) {
            form = formElementsArray.map(inputEl => (
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
        }

        let authRedirect = null;

        if (this.props.isAuth === true) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {error}
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

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger: state.burgerBuilder.building !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectAuth('/'))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
