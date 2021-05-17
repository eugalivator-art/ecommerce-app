import React, { Component, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import Column from '../components/Column';
import Row from '../components/Row';
import TextBox from '../components/TextBox';
import CheckoutService from '../services/CheckoutService';
import { AddressResponseType, CartType, PostResponseType, StoreType } from '../types';

type Props = {
    cartitems: CartType[];
    user: any;
    paymentResponse: PostResponseType;
    addressResponse: AddressResponseType
}

type State = {
    line1: string,
    line2: string,
    city: string,
    state: string,
    country: string,
    pincode: number,
    totalAmount: number,
    cardNo: string,
    cvv: string,
    expiration: string,
}

class CheckoutPage extends Component<Props, State> {

    state: State = { line1: "", line2: "", city: "", state: "",country:"", pincode:0, totalAmount:0, cardNo:"", cvv:"", expiration:"",  }
    
    subtotal = () => {
        let total = 0;
        this.props.cartitems.map((val) => {
            total = total + val.productTotalPrice
        })
        return total
    }

    submitAddress = async (e:SyntheticEvent) => {
        e.preventDefault();
        const { line1, line2, city, state, country, pincode, } = this.state;
        const { data } = await CheckoutService.postAddress(line1, line2, city, state, country, pincode);

        console.log(data)
       
    }

    submitPayment = async (e:SyntheticEvent) => {
    e.preventDefault();
        let { cardNo, cvv, expiration, totalAmount } = this.state;
        totalAmount = this.subtotal();
        const { data } = await CheckoutService.postPayment(totalAmount, parseInt(cardNo), parseInt(cvv), parseInt(expiration),);
        console.log(data)
    }

    render() {
        return (
            <Row>
                <Column
                    size={6}
                    classes={
                        "offset-md-3 shadow-sm border p-4 text-center rounded mt-5"}
                >
                    <form onSubmit={ this.submitAddress}>
                        
                        <h2>Address</h2>

                        <TextBox
                            placeholder={"House no/Building"}
                            type={"text"}
                            textChange={(line1) => this.setState({ line1 })}
                        />

                        <TextBox
                            placeholder={"Street/Locality"}
                            type={"text"}
                            textChange={(line2) => this.setState({ line2 })}
                        />

                        
                            
                        <div className="form-group col-lg-12 d-flex my-4">
                            <select className="form-control custom-select d-block w-50 m-1" onChange={(e) => (this.setState({ state:e.target.value }))} required>
                                <option value="">Select State</option>
                                <option>Karnataka</option>
                                <option>Maharashtra</option>
                            </select>
                            <select className="form-control custom-select d-block w-50 m-1" onChange={(e) => (this.setState({ city:e.target.value }))} required>
                                <option value="">Select City</option>
                                <option>Bangalore</option>
                                <option>Mysore</option>
                            </select>
                        </div>

                        <div className="form-group col-lg-12 d-flex my-4">
                            <select className="form-control custom-select w-100 m-1" onChange={(e) => (this.setState({ country:e.target.value }))} required>
                                <option value="">Select Country</option>
                                <option>India</option>
                                <option>Srilanka</option>
                            </select>

                            <input
                                className="form-control m-1"
                                placeholder="Pincode"
                                onChange={(e) => (this.setState({ pincode: parseInt(e.target.value) }))}
                                required
                            />
                        </div>

                        <button  className={"btn btn-success w-100 text-uppercase"}> Submit Address </button>

                    </form>

                    <hr />

                    <form onSubmit={ this.submitPayment}>

                        <h2> Payment</h2>

                        <TextBox
                            placeholder={"Card No"}
                            type={"text"}
                            textChange={(cardNo) => this.setState({ cardNo })}
                        />

                        <TextBox
                            placeholder={"CVV"}
                            type={"text"}
                            textChange={(cvv) => this.setState({ cvv })}
                        />

                        <TextBox
                            placeholder={"Expiring Date"}
                            type={"text"}
                            textChange={(expiration) => this.setState({ expiration })}
                        />

                        <button  className={"btn btn-success w-100 text-uppercase"}> Submit Payment Details </button>

                    </form>

                        
                    
                </Column>
            </Row>
        )
    }
}


const mapStoreToProps = (store: StoreType) => {
  return {
      cartitems: store.cart,
      user: store.userSession.user
  };
};


export default connect(mapStoreToProps)(CheckoutPage)
