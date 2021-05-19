import React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import Column from "../components/Column";
import Row from "../components/Row";
import UserService from "../services/UserService";
import ProfileActions from "../store/actions/ProfileActions";
import UserActions from "../store/actions/UserActions";
import { OrderType, StoreType } from "../types";
type Props = {
  currency: string;
  updateOrderId:(id:number) => void
}& RouteComponentProps;

type State = {
  userName: string,
  userEmail: string,
  redirect: boolean,
  orderId: number,
  orders:OrderType[]
};

class Profile extends React.Component<Props, State> {
  state:State ={ userName: "xyz", userEmail:"xyz@g", redirect:false,  orders:[], orderId:0}
  async componentDidMount() {
    try {
      this.getUser()
      this.getOrders()
    } catch (e) {
      console.log(e.response.data);
    }
  }

  getUser = async () => {
    const { data } = await UserService.profile();
    this.setState({userName:data.userName})
    console.log (data)
  }

   getOrders = async () => {
    const { data } = await UserService.getOrders();
    this.setState({orders:data})
    console.log (this.state.orders)
   }
  
  
  render() {

    if (this.state.redirect) {
      console.log(this.state.orderId)
      return (<Redirect to={{
        pathname: '/orderdetail',
        state: { oid: this.state.orderId }
      }} />)
    }
    
    return (
      <Row>

        

        <h1 className="mx-auto text-center">Welcome {this.state.userName}, Here are your orders, click for details</h1>
        
        {this.state.orders.map((val, index) => (

          <Column size={8} classes={"my-3 p-4 text-center mx-auto rounded mt-2"}>
        
            <div className="card d-flex allign-center border-primary w-20 text-center rounded">
                  <div className="card-header bg-primary text-white">
                      <h4 className="text-uppercase">Order {index}</h4>
                  </div>
                                  
                  <div className="card-body ">
                    <p className="card-text mb-1">Order Total Amount - {val.orderAmount} { this.props.currency}</p>
                    <p className="card-text"><small> ordered on {val.orderDate}</small></p>
                <p className="card-text text-success"> Order Status - { val.orderStatus}</p>
                      
                      <div>
                      <Link to='/orderdetail' className="btn btn-sm border-primary mx-auto my-2"
                    onClick={() => this.props.updateOrderId(val.orderId)} >click for details</Link>
                  
                  
                      </div>
                      
                  </div>                
          
            </div>
          </Column>
        ))} 

        
      </Row>
    );
  }
}

const mapStoreToProps = (store: StoreType) => {
  return {
      currency: store.currency
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>  {
    return {
        updateOrderId: (id: number) => dispatch(ProfileActions.orderid(id)),
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(Profile)
