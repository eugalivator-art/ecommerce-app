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
    oid:  number
}

class CheckoutPage extends Component<Props, State> {

    state: State = { line1: "", line2: "", city: "", state: "",country:"", pincode:0, totalAmount:0, cardNo:"", cvv:"", expiration:"", oid:0 }
    
    subtotal = () => {
        let total = 0;
        this.props.cartitems.map((val) => {
            total = total + val.productTotalPrice
        })
        return total
    }

    submitOrder = async () => {
        let { totalAmount } = this.state;
        totalAmount = this.subtotal();
        const { data, status } = await CheckoutService.postOrder(totalAmount);
        this.setState({ oid: data.orderId })
        console.log("submitOrder" + "oid " + this.state.oid)
        console.log(status)
        return data
    }

    submitOrderDetail = async () => {
        const { oid } = this.state;
        this.props.cartitems.map(async (val) => {
            const { data, request } = await CheckoutService.postOrderDetail(val.productId, oid,  val.productQty, val.productTotalPrice);
            console.log(data);
            console.log(request)
            return data
        })
        
    }

    submitAddress = async () => {
        const { line1, line2, city, state, country, pincode, oid } = this.state;
        const { data } = await CheckoutService.postAddress(line1, line2, city, state, country, pincode, oid );
        console.log(data)
        return data
        
    }

    submitPayment = async () => {
        let { cardNo, cvv, expiration, totalAmount, oid } = this.state;
        totalAmount = this.subtotal();
        const { data } = await CheckoutService.postPayment(totalAmount, parseInt(cardNo), parseInt(cvv), parseInt(expiration), oid);
        console.log(data)
        return data
    }

    

    submission = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();

            await this.submitOrder();

            await this.submitOrderDetail();
            
            await this.submitAddress();
        
            await this.submitPayment();
            
        } catch (error) {
            console.log(error)
        }
        
    }

    // add ordering function, pincode func, cardno func, cvv func, expiration func, 
    // add order no to address and payment

    render() {
        return (
            <Row>
                <Column
                    size={6}
                    classes={
                        "offset-md-3 shadow-sm border p-4 text-center rounded mt-5"}
                >
                    <form onSubmit={ this.submission}>
                        
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
                                placeholder="Pincode (only number)"
                                onChange={(e) => (this.setState({ pincode: parseInt(e.target.value) }))}
                                max="6"
                                required
                            />
                        </div>

                        <hr />

                        <h2> Payment</h2>

                        <TextBox
                            placeholder={"Card No (only number)"}
                            type={"text"}
                            textChange={(cardNo) => this.setState({ cardNo })}
                        />

                        <TextBox
                            placeholder={"CVV (only number)"}
                            type={"text"}
                            textChange={(cvv) => this.setState({ cvv })}
                        />

                        <TextBox
                            placeholder={"Expiring Date (onlynumber)"}
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
