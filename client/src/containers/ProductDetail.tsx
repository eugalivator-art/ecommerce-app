import React, { ComponentProps } from "react";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import ErrorBoundary from "../components/ErrorBoundary";
import Product from "../components/Product";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { ProductType } from "../types";

type State = { product: ProductType[]}
class ProductDetail extends React.Component<State, RouteComponentProps> {
  
  // state: State = { product: [] }
  async componentDidMount() {
    try {
      // const params: any = this.props.match.params;
      // const { data } = await ProductService.getProductById(params.id);
      // console.log("success", data);
      this.setState({
        // product : data
      })
    } catch (e) {
      console.log("error", e);
    }
  }
  render() {
    return (
      <ErrorBoundary>
        <Row>
          <Column size={12}>
            <h1>Product Detail
              {/* {this.state.product.map((val) => {val.productName})} */}
            </h1>
          </Column>
        </Row>
      </ErrorBoundary>
    );
  }
}
export default ProductDetail;
