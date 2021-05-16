import React from "react";
import Column from "./components/Column";
import banner from "./img/banner.jpg"
import banner2 from "./img/banner2.jpg"

type State = { no: number; count: number };
class Demo extends React.Component<{}, State> {
  state: State = { no: 0, count: 0 };
  shouldComponentUpdate(nextProps: {}, nextState: State) {
    console.log("SHOULD COMPONENT UPDATE");
    console.log("PROPS", this.props, nextProps);
    console.log("STATE", this.state, nextState);
    return this.state.no !== nextState.no || nextState.count === 7;
  }
  render() {
    console.log("RENDER CALLED", this.state);
    const name = "Mike";
    return (
      <div className="row">
        <Column size={12}>

          <div><img className="img-fluid" src={banner} alt="img1" /></div>
          <div><img className="img-fluid mt-4" src={banner2} alt="img2" /></div>
          
          {/* {this.state.count > 6 ? <p>Hello from {name.toUpperCase()}</p> : null}
          <p>{7 + 3}</p>
          <button
            onClick={() => this.setState({ no: 1 })}
            className="btn btn-sm btn-primary mx-2"
          >
            Change state to 1
          </button>
          <button
            onClick={() => this.setState({ no: 0 })}
            className="btn btn-sm btn-primary mx-2"
          >
            Change state to 0
          </button>
          <button
            className="btn btn-sm btn-primary mx-2"
            onClick={() =>
              this.setState((prevState) => ({ count: prevState.count + 1 }))
            }
          >
            Increment count
          </button> */}
        </Column>
      </div>
    );
  }
}
export default Demo;
