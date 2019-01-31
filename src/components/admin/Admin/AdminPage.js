import React, { Component } from "react";
import {history} from "../../../__helpers/history"

export default class AdminPage extends Component {
  constructor() {
	  super();
	  this.handleClickGen = this.handleClickGen.bind(this);
	  this.handleClickReq = this.handleClickReq.bind(this);

  }
  handleClickGen(){
	  history.push("/admin/general");

  }
  handleClickReq(){
	  history.push("/admin/request")

  }
  handleClick(){
	  history.push("/admin/stations")
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClickGen}>General Transfer Applications</button><br/>
		<button onClick={this.handleClickReq}>Request Transfer Applications</button>
		<button onClick={this.handleClickStation}>Stations</button>
		<button>Users</button>
      </div>
    );
  }
}
