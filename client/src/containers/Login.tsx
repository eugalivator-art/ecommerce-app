import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { Dispatch } from "redux";
import Column from "../components/Column";
import LoadingWrapper from "../components/LoadingWrapper";
import Row from "../components/Row";
import TextBox from "../components/TextBox";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
import LoadingActions from "../store/actions/LoadingActions";
import UserActions from "../store/actions/UserActions";
import { StoreType } from "../types";
import formatter from "../utils/formatter";
import {CartType} from "../types"
import CartActions from "../store/actions/CartActions";

type LoginProps = {
  signinSuccess: (user: object) => void;
  signinError: (error: string) => void;
  showLoader: () => void;
  hideLoader: () => void;
  isAuthenticated: boolean;
  errorMessage: string | null;
  cartItems: CartType[];
  emptyCart: () => void;
} & RouteComponentProps;

type LoginState = { email: string; password: string };

class Login extends React.Component<LoginProps, LoginState> {

  state: LoginState = { email: "", password: "" };

  login = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      const { email, password } = this.state;
      this.props.showLoader();
      this.props.emptyCart();
      const { data } = await UserService.login(email, password);
      await StorageService.storeData("token", data.access_token);
      this.props.signinSuccess(data); // create/store session
      this.props.hideLoader();
    } catch (e) {
      this.props.signinError(formatter.titlecase(e.message.toString()));
      this.props.hideLoader();
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      let lastPage = "/"; // by default home page
      const state: any = this.props.location.state;
      if (state && state.from) {
        lastPage = state.from; // last page path
      }
      return <Redirect to={lastPage} />;
    }
    return (
      <LoadingWrapper>
        <Row>
          <Column
            size={4}
            classes={
              "offset-md-4 shadow-sm border p-4 text-center rounded mt-5"
            }
          >
            <h2>Login</h2>
            <hr />
            <small className="text-danger">{this.props.errorMessage}</small>
            <form onSubmit={this.login}>
              <TextBox
                placeholder={"Email"}
                type={"email"}
                textChange={(email) => this.setState({ email })}
              />
              <TextBox
                placeholder={"Password"}
                type={"password"}
                textChange={(password) => this.setState({ password })}
              />
              <small >in order to register <Link to={"/register"}>click here</Link></small>
              <button className={"btn mt-3 btn-success w-100 text-uppercase"}>
                Login
              </button>
            </form>
          </Column>
        </Row>
      </LoadingWrapper>
    );
  }
}

const mapStoreDataToProps = (storeData: StoreType) => {
  return {
    isAuthenticated: !!storeData.userSession.user, // converting to boolean
    errorMessage: storeData.userSession.error,
    cartItems: storeData.cart
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signinSuccess: (user: object) => dispatch(UserActions.loginSuccess(user)),
    signinError: (err: string) => dispatch(UserActions.loginError(err)),
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
    emptyCart: () => dispatch(CartActions.empty())
  };
};

export default connect(mapStoreDataToProps, mapDispatchToProps)(Login);
