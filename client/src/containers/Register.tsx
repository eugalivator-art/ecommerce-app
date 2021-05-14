import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
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
type LoginProps = {
  signinSuccess: (user: object) => void;
  signinError: (error: string) => void;
  showLoader: () => void;
  hideLoader: () => void;
  isAuthenticated: boolean;
  errorMessage: string | null;
} & RouteComponentProps;
type LoginState = { email: string; password: string; name:string };
class Login extends React.Component<LoginProps, LoginState> {
    state: LoginState = { email: "", password: "", name: "" };
    
  login = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const { email, password, name } = this.state;
      this.props.showLoader();
      const { data } = await UserService.register(email, password, name);
    
      this.props.hideLoader();
    } catch (e) {
      this.props.hideLoader();
    }
  };
  render() {
    if (this.props.isAuthenticated) {
      let lastPage = "/login"; // by default home page
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
            <h2>Register</h2>
            <hr />
            <small className="text-danger">{this.props.errorMessage}</small>
            <form onSubmit={this.login}>
                
              <TextBox
                placeholder={"Name"}
                type={"text"}
                textChange={(name) => this.setState({ name })}
               />
                        
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
              
                      
              <button className={"btn btn-warning w-100 text-uppercase"}>
                            Register
              </button>
                        
            </form>
          </Column>
        </Row>
      </LoadingWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
  };
};
export default connect(mapDispatchToProps)(Login);
