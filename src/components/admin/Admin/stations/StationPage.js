import React, { Component } from 'react'
// import { adminService } from '../../../../__services/adminService';
import history from "../../../../__helpers/history"

export default class StationPage extends Component {
	constructor(){
		super();
		this.state = {

		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		if(e.target.value === "search"){
			history.push("/admin/stations/searchstation");
		}
		else{
			history.push("/admin/stations/addstation")
		}
	}
  render() {
	return (
	  <div>
		<button value = "search" onClick = { this.handleClick }>Search Station</button><br/>
		<button value = "add" onClick = { this.handleClick }>Add Station</button>
	  </div>
	)
  }
}
