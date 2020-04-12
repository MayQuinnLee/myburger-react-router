import React , {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address : {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        //As a default in <Form> it will rerender itself, so we prevent the default
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price,
            customer: {
                name: 'Jovan Goh',
                address: {
                    street: 'TestStreet',
                    zipCode: 56330,
                    country: 'Malaysia',
                },
                email: 'jojo@test.com',
            },
            deliveryMethod: 'ASAP',
        }

        axios.post('/orders.json', order) //.json for firebase only
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
            })
    };

    render () {

        let form = (
            <form>
              <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
              <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
              <input className={classes.Input} type="text" name="street" placeholder="Street" />
              <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code" />
              <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        ); 
        if(this.state.loading){
            form = <Spinner />
        };
        return (
          <div className={classes.ContactData}>
            <h4> Please enter your Contact Data</h4>
            {form}
          </div>
        );
    }
}


export default ContactData;