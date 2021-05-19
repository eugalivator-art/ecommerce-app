import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import Column from '../components/Column';
import Row from '../components/Row';
import UserService from '../services/UserService';
import {  AddressType, OrderDetailType, StoreType } from '../types';

type Props = {
    currency: string;
    orderId: number;
    
}& RouteComponentProps;

type State = {
    orderdetail: OrderDetailType[],
    Address: AddressType
}

class OrderDetai extends React.Component<Props, State>{

    componentDidMount() {
        console.log("render")
        // this.getOrderDetails()
        // this.getAddress()
    }
    
    getOrderDetails = async () => {
    const { data } = await UserService.getOrderDetails(this.props.orderId);
    this.setState({orderdetail:data})
        console.log('orderdetails')
        console.log (data)
    }
    
    getAddress = async () => {
        const { data } = await UserService.getAddress(this.props.orderId)
        this.setState({Address:data})
        console.log(data)
    }
    render() {
        return (
            <Row>
                <Link to='/profile' className="btn w-25 btn-primary mx-auto text-uppercase"> Back to Orders</Link>
                {/* {this.state.orderdetail.map((val, index) => {
                    <Column size={8} classes={"my-3 p-4 text-center mx-auto rounded mt-2"}>
                        

                        <div className="card-header bg-primary text-white">
                            <h4 className="text-uppercase">Item { index}</h4>
                        </div>
                                  
                        <div className="card-body ">
                            <p className="card-text mb-1">Order Total quantity - {val.itemAmount} { this.props.currency}</p>
                            <p className="card-text"><small> productid {val.productIdProductId}</small></p>   
                        </div>                

                    </Column>
                })
                } */}
                <div>{this.props.orderId}</div>
                {/* <h2>Address- { this.state.Address.line1} { this.state.Address.line2} { this.state.Address.city} { this.state.Address.state} { this.state.Address.country}</h2> */}


            </Row>

            


        )
    }
}

const mapStoreToProps = (store: StoreType) => {
  return {
      orderId: store.profile,
      currency: store.currency
  };
};


export default connect(mapStoreToProps) (OrderDetai)