import React, { Component } from 'react'
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { validateLocaleAndSetLanguage } from 'typescript';
import Column from '../components/Column';
import LoadingWrapper from '../components/LoadingWrapper';
import Row from '../components/Row';
import CartActions from '../store/actions/CartActions';
import { CartType, ProductType, StoreType } from '../types';

type Props = {
    cartitems: CartType[];
    removeCartItem: (id: number) => void;
    increament: (id: number) => void;
    decreament: (id: number) => void;
    currency: string
}

type State = {
    total: number;
    quantity: number;
}

class CartPage extends Component<Props, State> {
    
    state: State = { total: 0, quantity:1}
    


    // updateTotal() {
    //     this.props.cartitems.map((val) => {
    //         console.log("updatetotal" + val.productTotalPrice);
    //         const temp: number = parseInt(val.productSalePrice);
    //         this.setState((prevState) => ({ total: prevState.total + temp }))
    //     })
    // }

    // deduceTotal(price:number) {
    //     const temp: number = price;
    //     this.setState((prevState) => ({ total: prevState.total - temp }))
        
    // }

    subtotal = (cartIt: CartType[]) => {
        let total = 0;
        cartIt.map((val) => {
            total = total + val.productTotalPrice
        })
        return total
    }
    

    render() {
        return (
            <LoadingWrapper>
                <Row>
                    {this.props.cartitems.map((val, id) => (
                        <Column size={8} classes={"my-3 p-4 text-center mx-auto rounded mt-2"}>
                            

                            <div className="card d-flex allign-center border-primary w-20 text-center rounded">
                                <div className="card-header bg-primary text-white">
                                <h4 className="text-uppercase">{val.productName}</h4>
                                </div>
                                
                                <div className="card-body ">
                                    <p className="card-text mb-1">Price - {val.productSalePrice} { this.props.currency}</p>
                                    <p className="card-text mb-1"><small> {val.productStock} available in stock</small></p>

                                    <div>
                                        
                                        
                                        <button
                                            className="btn btn-sm mx-auto border-primary my-2"
                                            onClick={() => this.props.decreament(val.productId)}>-</button>
                                        {val.productQty}
                                        <button
                                            className="btn btn-sm border-primary mx-auto my-2"
                                            onClick={(e) => this.props.increament(val.productId)}>+</button>
                                    </div>

                                    <div>{val.productTotalPrice} { this.props.currency} </div>
                                        
                                    <button
                                        onClick={() => {
                                            this.props.removeCartItem(val.productId);
                                        }}
                                    className="btn btn-sm w-25 btn-danger mx-autotext-uppercase"
                                    >
                                    <i className="fa fa-trash"></i> Remove from Cart
                                    </button>
                                    
                                    
                                </div>
                            
                                
                            </div>
                        </Column>
                    ))}

                    <h1 className="mx-auto text-center">Total Amount - {this.subtotal(this.props.cartitems)}
                        {/* {this.state.total} {this.props.currency} */}
                    </h1>

                    <Link className="btn w-50 btn-primary mx-auto mt-5 text-uppercase" to={"/checkout"}>
                        Proceed to checkout
                    </Link>

                    </Row>
                </LoadingWrapper>
        )
    }
}

const mapStoreToProps = (store: StoreType) => {
  return {
      cartitems: store.cart,
      currency: store.currency
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>  {
    return {
        removeCartItem: (id: number) => dispatch(CartActions.removeItem(id)),
        increament: (id:number ) => dispatch(CartActions.increaseQuantity(id)),
        decreament: (id:number ) => dispatch(CartActions.decreaseQuantity(id))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(CartPage)