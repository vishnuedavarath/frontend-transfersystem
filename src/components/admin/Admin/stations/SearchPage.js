import React, { Component } from "react";
// import { history } from "../../../../__helpers/history";
import { adminService } from "../../../../__services/adminService";
import Popup from "reactjs-popup";

export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      stat: "",
      stations: [],
	  popup: false,
	  name:"",
	  code:"",
	  vacancy:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleChangeStation = this.handleChangeStation.bind(this);
    this.handleSubmitStation = this.handleSubmitStation.bind(this);
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState({ stat: value });
  }
  handleSubmit() {
    adminService.searchStation().then(stations => {
      this.setState({});
    });
  }
  handleClickEdit() {
    this.setState({ popup: true });
  }
  handleClickDelete() {
    adminService.DeleteStation();
  }
  handleChangeStation(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitStation(){
	  const {name,code,vacancy} = this.state;
	  adminService.Station(name,code,vacancy);
	  this.setState({popup:false});
	  this.handleSubmit();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="station"
            value={this.state.stat}
            onChange={this.handleChange}
          />
          <br />
          <button>Submit</button>
          <br />
          <br />
        </form>
        <div>
          {this.state.stations.map(station => (
            <div>
              ------------------------------------------------------------
              <span>{station.code}</span>
              <br />
              <span>{station.name}</span>
              <br />
              <Popup
                trigger={
                  <button value={station.id} onClick={this.handleCLickEdit}>
                    Edit Station Details
                  </button>
                }
                position="bottom center"
                open={this.state.popup}
                on="click"
              >
                <div>
                  <form onSubmit={this.handleSubmitStation}>
                    Station Name:
                    <br />
                    <input
                      name="name"
                      value={station.name}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Station Code:
                    <br />
                    <input
                      name="code"
                      value={station.code}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Vacancy:
                    <br />
                    <input
                      name="vacancy"
                      value={station.vacancy}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    <button>Submit</button>
                  </form>
                </div>
              </Popup>
              <br />
              <button value={station.id} onClick={this.handleCLickDelete}>
                Delete Station
              </button>
              ------------------------------------------------------------
            </div>
          ))}
        </div>
      </div>
    );
  }
}
