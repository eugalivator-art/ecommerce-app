import React, { Component } from 'react'
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import Column from '../components/Column';
import Product from '../components/Product';
import Row from '../components/Row';
import CartActions from '../store/actions/CartActions';
import { ProductType, StoreType } from '../types';

type Props = {
    cartitems: ProductType[]
    // removeItem: (number: id) => void;
} 

class CartPage extends Component <Props> {
    render() {
        return (
            <Row>
                {this.props.cartitems.map((val) => (
                    <Column size={12} classes={"my-3 p-4 text-center rounded mt-5"}>
                        

                        <div className="card text-center">

                            <div className="card-header ">
                            <h4>{val.productName}</h4>
                            </div>
                            
                            <div className="card-body">
                                <h5 className="card-title">Description- The details of the product</h5>
                                <p className="card-text">Price - { val.productPrice}</p>
                                <p className="card-text"><small> {val.productStock} available in stock</small></p>
                                    
                                <button
                                // onClick={() => this.props.removeItem(val.productId)}
                                className="btn btn-sm w-100 btn-danger text-uppercase"
                                >
                                <i className="fa fa-trash"></i> Remove from Cart
                                </button> 
                            </div>
                        
                        </div>
                    </Column>
                ))}
            </Row>
        )
    }
}

const mapStoreToProps = (store: StoreType) => {
  return {
    cartitems: store.cart, // undefined => INR => USD
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>  {
    return {
        removeCartItem: (id: number) => dispatch(CartActions.removeItem(id)),
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(CartPage)