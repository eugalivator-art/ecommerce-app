import React, { Component } from 'react'
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { validateLocaleAndSetLanguage } from 'typescript';
import CartItem from '../components/CartItem';
import Column from '../components/Column';
import LoadingWrapper from '../components/LoadingWrapper';
import Row from '../components/Row';
import CartActions from '../store/actions/CartActions';
import { CartType, ProductType, StoreType } from '../types';

type Props = {
    cartitems: CartType[];
    removeCartItem: (id: number) => void;
    increment: (id: number) => void;
    decrement: (id: number) => void;
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

                            <CartItem
                                prodName={val.productName}
                                prodSP={val.productPrice}
                                prodStock={val.productStock}
                                prodId={val.productId}
                                prodQuantity={val.productQty}
                                prodsTP={val.productTotalPrice}
                                currencyCode={this.props.currency}
                                incrementClick={(id) => this.props.increment(id)}
                                decrementClick={(id) => this.props.decrement(id)}
                                removeItem = {(id) => this.props.removeCartItem(id)}
                            ></CartItem>
                            
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
        increment: (id:number ) => dispatch(CartActions.increaseQuantity(id)),
        decrement: (id:number ) => dispatch(CartActions.decreaseQuantity(id))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(CartPage)