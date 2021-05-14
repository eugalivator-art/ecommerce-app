import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CartType, StoreType } from '../types';

type Props = {
    cartitems: CartType[];
}


class CheckoutPage extends Component {
    render() {
        return (
            <div>
                checkout 
            </div>
        )
    }
}

const mapStoreToProps = (store: StoreType) => {
  return {
    cartitems: store.cart, 
  };
};

export default connect(mapStoreToProps)(CheckoutPage)
