import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';

import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    normalCharacters: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true,
                    normalCharacters: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.props.onStartBurger();
        const formData = {};
        for (let formElId in this.state.orderForm) {
            formData[formElId] = this.state.orderForm[formElId].value;
        }

        const order = {
            ingredients: this.props.ig,
            price: this.props.pri,
            orderData: formData,
            userId: this.props.userId,
            finish: false
        };

        this.props.onOrderBurger(order, this.props.token);
    };

    inputChangeHandler = (event, inputID) => {
        const inputElCopy = updateObject(this.state.orderForm[inputID], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputID].validation),
            touched: true,
        });

        const orderFormCopy = updateObject(this.state.orderForm, {
            [inputID]: inputElCopy
        });

        let formIsValid = true;

        for (let inputID in orderFormCopy) {
            formIsValid = orderFormCopy[inputID].valid && formIsValid;
        }

        this.setState({ orderForm: orderFormCopy, formIsValid: formIsValid });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        let form = <Spinner />;

        if (!this.props.loading) {
            form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(inputEl => (
                        <Input
                            key={inputEl.id}
                            valueName={inputEl.id}
                            elementType={inputEl.config.elementType}
                            elementConfig={inputEl.config.elementConfig}
                            value={inputEl.config.value}
                            invalid={!inputEl.config.valid}
                            touched={inputEl.config.touched}
                            shouldValidate={inputEl.config.validation}
                            changed={(event) => this.inputChangeHandler(event, inputEl.id)}/>
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            );
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ig: state.burgerBuilder.ingredients,
        pri: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStartBurger: () => dispatch(actions.purchaseBurgerStart()),
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
