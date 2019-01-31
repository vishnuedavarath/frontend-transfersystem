import React, { Component } from "react";
import { history } from "../../../__helpers/history";

export default class AdminPage extends Component {
  constructor() {
    super();
    this.handleClickGen = this.handleClickGen.bind(this);
    this.handleClickReq = this.handleClickReq.bind(this);
  }
  handleClickGen() {
    history.push("/admin/general");
  }
  handleClickReq() {
    history.push("/admin/request");
  }
  handleClickStation() {
    history.push("/admin/stations");
  }

  handleClickUser() {
    history.push("/admin/user");
  }
  handleClickAdmin() {
    history.push("/admin/admin");
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClickGen}>
          General Transfer Applications
        </button>
        <br />
        <button onClick={this.handleClickReq}>
          Request Transfer Applications
        </button>
        <br />
        <button onClick={this.handleClickStation}>Stations</button>
        <br />
        <button onClick={this.handleClickUser}>Users</button>
        <br />
        <button onClick={this.handleClickAdmin}>Admin</button>
        <br />
      </div>
    );
  }
}
