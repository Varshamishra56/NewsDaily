import React, { Component } from "react";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center" style={{ marginTop: "190px" }}>
        <img src="/assets/walk.gif" alt="loading" />
      </div>
    );
  }
}

export default Spinner;
