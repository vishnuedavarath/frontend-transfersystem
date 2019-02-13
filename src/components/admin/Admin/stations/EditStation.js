import React, { Component } from "react";
import { adminService } from "../../../../__services/adminService";
import Modal from "react-responsive-modal";

export default class EditStation extends Component {
  constructor() {
    super();
    this.state = {
      openPopup: false,
      name: "",
      stationId: "",
      stationName: "",
      stationCode: "",
      stationVacancySI: "",
      stationVacancyASI: "",
      stationVacancySCPO: "",
      stationVacancyTSCPO: "",
      stationVacancyCPO: "",
      stationVacancyWCPO: "",
      stations: []
    };
    this.handleChangeStation = this.handleChangeStation.bind(this);
    this.handleSubmitStationSearch = this.handleSubmitStationSearch.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleSubmitStation = this.handleSubmitStation.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  handleChangeStation(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitStationSearch(e) {
    e.preventDefault();
    const { name } = this.state;
    var Name = name.toUpperCase();

    // var Name = name(l => l.toUpperCase());
    adminService.searchStation(Name).then(stations => {
      this.setState({
        stations: stations.stations,
        openPopup: false
      });
    });
  }
  handleClickEdit(e) {
    var tgt = JSON.parse(e.target.value);
    console.log(tgt);
    this.setState({
      openPopup: true,
      stationId: tgt._id,
      stationCode: tgt.statCode,
      stationName: tgt.name,
      stationVacancySI: tgt.si,
      stationVacancyASI: tgt.asi,
      stationVacancySCPO: tgt.scpo,
      stationVacancyTSCPO: tgt.tscpo,
      stationVacancyCPO: tgt.cpo,
      stationVacancyWCPO: tgt.wcpo
    });
  }
  handleSubmitStation(e) {
    e.preventDefault();
    const {
      stationId,
      stationCode,
      stationName,
      stationVacancySI,
      stationVacancyASI,
      stationVacancySCPO,
      stationVacancyTSCPO,
      stationVacancyCPO,
      stationVacancyWCPO
    } = this.state;
    adminService.editStation(
      stationId,
      stationCode,
      stationName,
      stationVacancySI,
      stationVacancyASI,
      stationVacancySCPO,
      stationVacancyTSCPO,
      stationVacancyCPO,
      stationVacancyWCPO
    );
    this.setState({ openPopup: false });
  }
  onCloseModal() {
    //   console.log(this.state)
    this.setState({ openPopup: false });
  }
  handleClickDelete(e) {
    e.preventDefault();
    console.log(this.state);
    var tgt = JSON.parse(e.target.value);
    console.log(tgt);
    // this.setState({
    //     stationId:tgt._id
    // })
    adminService.stationDelete(tgt._id).then(success => {
      adminService
        .searchStation(this.state.name.toUpperCase())
        .then(stations => {
          this.setState({
            stations: stations.stations,
            openPopup: false
          });
        });
    });
  }

  render() {
    return (
      <div className="editMain">
        <header className="profileHeader">
          <h3 className="profileHeaderHead">Kerala Police</h3>
          <div className="profileRight">
            <span className="profileHeaderSpan">
              Hello, &nbsp;&nbsp;{this.state.name}
            </span>
            &nbsp;&nbsp;
            <button className="profileLogout" onClick={this.handleclickLogout}>
              Logout
            </button>
          </div>
        </header>
        <div>
          <form onSubmit={this.handleSubmitStationSearch}>
            <input
              type="station"
              name="name"
              value={this.state.name}
              onChange={this.handleChangeStation}
            />
            <button>Submit</button>
          </form>
        </div>
        <div>
          {this.state.stations.map(station => (
            <div>
              <span>Station Code:{station.statCode}</span>
              <br />
              <span>Station Name:{station.name}</span>
              <br />
              <button
                onClick={this.handleClickEdit}
                value={JSON.stringify(station)}
              >
                Edit station Details
              </button>
              <button
                onClick={this.handleClickDelete}
                value={JSON.stringify(station)}
              >
                Delete station
              </button>
              <Modal open={this.state.openPopup} onClose={this.onCloseModal}>
                <div>
                  <form onSubmit={this.handleSubmitStation}>
                    Station Code:
                    <br />
                    <input
                      name="stationCode"
                      value={this.state.stationCode}
                      onChange={this.handleChangeStation}
                    />
                    Station Name:
                    <br />
                    <input
                      name="stationName"
                      value={this.state.stationName}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Vacancy for SI:
                    <br />
                    <input
                      name="stationVacancySI"
                      value={this.state.stationVacancySI}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Vacancy for ASI:
                    <br />
                    <input
                      name="stationVacancyASI"
                      value={this.state.stationVacancyASI}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Vacancy for SCPO:
                    <br />
                    <input
                      name="stationVacancySCPO"
                      value={this.state.stationVacancySCPO}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Vacancy for TSCPO:
                    <br />
                    <input
                      name="stationVacancyTSCPO"
                      value={this.state.stationVacancyTSCPO}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Vacancy for CPO:
                    <br />
                    <input
                      name="stationVacancyCPO"
                      value={this.state.stationVacancyCPO}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    Vacancy for WCPO:
                    <br />
                    <input
                      name="stationVacancyWCPO"
                      value={this.state.stationVacancyWCPO}
                      onChange={this.handleChangeStation}
                    />
                    <br />
                    <button>Submit</button>
                    <button onClick={this.onCloseModal}>Close</button>
                  </form>
                </div>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
