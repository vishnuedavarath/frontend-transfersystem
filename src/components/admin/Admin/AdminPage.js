import React, { Component } from "react";

export default class AdminPage extends Component {
  constructor() {
	  super();
	  this.handleClickGen = this.handleClickGen.bind(this);
	  this.handleClickReq = this.handleClickReq.bind(this);

  }
  handleClickGen(){

  }
  handleClickReq(){
	  
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClickGen}>General Transfer Applications</button><br/>
		<button onClick={this.handleClickReq}>Request Transfer Applications</button>
      </div>
    );
  }
}
