import React, { Component } from "react";
import { adminService } from "../../../../__services/adminService";
import Popup from "reactjs-popup";

export default class EditStation extends Component {
  constructor() {
    super();
    this.state = {
      openPopup: false,
      name: "",
      stationName: "",
      stationCode: "",
      stationVacancySI: "",
      stationVacancyASI: "",
      stationVacancySCPO: "",
      stationVacancyTSCPO: "",
      stationVacancyCPO: "",
      stationVacancyWCPO: ""
    };
    this.handleChangeStation = this.handleChangeStation.bind(this);
    this.handleSubmitStationSearch = this.handleSubmitStationSearch.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleSubmitStation = this.handleSubmitStation.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  handleChangeStation(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitStationSearch() {
    const { name } = this.state;
    adminService.searchStation(name).then(station => {
      this.setState({
        openPopup: false,
        stationName: station.name,
        stationCode: station.code,
        stationVacancySI: "",
        stationVacancyASI: "",
        stationVacancySCPO: "",
        stationVacancyTSCPO: "",
        stationVacancyCPO: "",
        stationVacancyWCPO: ""
      });
    });
  }
  handleClickEdit() {
    this.setState({ openPopup: true });
  }
  handleSubmitStation() {
    const {
      stationPenno,
      stationName,
      stationPrivilege,
      stationDesignation
    } = this.state;
    adminService.editStation(
      stationPenno,
      stationName,
      stationPrivilege,
      stationDesignation
    );
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmitStationSearch}>
            <input
              type="station"
              name="penno"
              value={this.state.penno}
              onChange={this.handleChangeStation}
            />
            <button>Submit</button>
          </form>
        </div>
        <div>
          {station => (
            <div>
              <span>PEN Number:{this.state.stationPenno}</span>
              <br />
              <span>Name:{this.state.stationName}</span>
              <br />
              <span>Privilege:{this.state.stationPrivilege}</span>
              <br />u
              <Popup
                trigger={
                  <button onClick={this.handleClickEdit}>
                    Edit station Details
                  </button>
                }
                position="bottom center"
                open={this.state.openPopup}
                on="click"
              >
                <div>
                  <form onSubmit={this.handleSubmitStation}>
                    PEN Number:
                    <br />
                    <input
                      name="stationPenno"
                      value={this.state.stationPenno}
                      onChange={this.handleChangeStation}
                    />
                    Name:
                    <br />
                    <input
                      name="stationName"
                      value={this.state.stationName}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Designation:
                    <br />
                    <input
                      name="code"
                      value={this.state.station}
                      onChange={this.handleChangeStation}
                    />
                    <select
                      value={this.state.stationDesignation}
                      onChange={this.handleChangeStation}
                    >
                      <option value="si">SI</option>
                      <option value="asi">ASI</option>
                      <option value="scpo">SCPO</option>
                      <option value="tscpo">TSCPO</option>
                      <option value="cpo">CPO</option>
                      <option value="wcpo">WCPO</option>
                    </select>
                    <br />
                    <select
                      value={this.state.stationPrivilege}
                      onChange={this.handleChangeStation}
                    >
                      <option value="1">Super</option>
                      <option value="2">station</option>
                    </select>
                    <br />
                    <button>Submit</button>
                  </form>
                </div>
              </Popup>
              <button onClick={this.handleClickDelete}>Delete station</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
