import React, { Component } from 'react'
import { connect } from 'react-redux'
import Column from '../components/Column';
import Row from '../components/Row';
import { CartType, StoreType } from '../types';

type Props = {
    cartitems: CartType[];
}


class CheckoutPage extends Component<Props> {
    render() {
        return (
            <Row>
                <Column
                    size={6}
                    classes={
                        "offset-md-4 shadow-sm border p-4 text-center rounded mt-5"}
                >



                </Column>
            </Row>
        )
    }
}

const mapStoreToProps = (store: StoreType) => {
  return {
    cartitems: store.cart, 
  };
};

export default connect(mapStoreToProps)(CheckoutPage)
