import React from "react";

class CounterClassBasedComponent extends React.Component {
  constructor() {
    super();
    this.state = { currCount: 0 };
  }

  // main difference here is functions don't need const in front of them
  increment = () => {
    this.setState({
      currCount: this.state.currCount + 1,
    });
  };

  decrement = () => {
    this.setState({
      currCount: this.state.currCount - 1,
    });
  };

  render() {
    return (
      <>
        <h2>{this.state.currCount}</h2>
        {/* to invoke functions use the 'this' keyword */}
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement} disabled={this.state.currCount === 0}>
          Decrement
        </button>
      </>
    );
  }
}

export default CounterClassBasedComponent;
