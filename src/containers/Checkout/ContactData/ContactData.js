import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    required: true
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
                    required: true
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
        loading: false,
        formIsValid: false
    };

    checkValidity(value, rules) {
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

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElId in this.state.orderForm) {
            formData[formElId] = this.state.orderForm[formElId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    };

    inputChangeHandler = (event, inputID) => {
        const orderFormCopy = { ...this.state.orderForm };
        const inputElCopy = { ...orderFormCopy[inputID] };

        inputElCopy.value = event.target.value;
        inputElCopy.valid = this.checkValidity(inputElCopy.value, inputElCopy.validation);
        inputElCopy.touched = true;
        orderFormCopy[inputID] = inputElCopy;
        console.log(inputElCopy);

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

        let form = (
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

        if (this.state.loading) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;