import React, { Component } from "react";
import { history } from "../../../../__helpers/history"
import { adminService } from "../../../../__services/adminService";
import Popup from 'react-popup';

export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
		stat:"",
		stations:[],
	};
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleCLickEdit = this.handleCLickEdit.bind(this);
	this.handleCLickDelete = this.handleCLickDelete.bind(this);
  }
  handleChange(e){
	const {value} = e.target;
	this.setState({stat:value});
  }
  handleSubmit(){
	  adminService.searchStation()
	  .then(
		  stations =>{
			  this.setState({});
		  }
	  )
  }
  handleCLickEdit(){
	  history.push("/admin/stations/editstation")
  }
  handleCLickDelete(){
	  adminService.DeleteStation()
  }

  render() {
    return (
      <div>
        <form onSubmit = { this.handleSubmit }>
          <input type="station" value = {this.state.stat} onChange={this.handleChange} />
          <br />
		  <button>Submit</button><br/><br/>
        </form>
		<div>
			{
				this.state.stations.map(
					station =>(
						<div>
							------------------------------------------------------------
							<span>{station.code}</span><br/>
							<span>{station.name}</span><br/>
							<button value = {station.id} onClick = {this.handleCLickEdit}>Edit Station Details</button><br/>
							<button value = {station.id} onClick = {this.handleCLickDelete}>Delete Station</button>
							------------------------------------------------------------
						</div>
					)
				)
			}
		</div>
      </div>
    );
  }
}
