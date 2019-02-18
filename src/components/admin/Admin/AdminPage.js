import React, { Component } from "react";
import { history } from "../../../__helpers/history";
import Popup from "reactjs-popup";
import { adminService } from "../../../__services/adminService";
// import Modal from 'react-responsive-modal'
import "../../../assets/adminpage/css/adminpage.css";
// import StickyFooter from 'react-sticky-footer';

export default class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      adminPopup: false,
      userPopup: false,
      adminPenno: "",
      adminName: "",
      adminPassword: "",
      adminPrivilege: "1",
      userPenno: "",
      userName: "",
      userPassword: "",
      userDesignation: "si",
      stationCode: "",
      stationName: "",
      stationPopup: false,
      stationVacancySI: "",
      stationVacancyASI: "",
      stationVacancySCPO: "",
      stationVacancyTSCPO: "",
      stationVacancyCPO: "",
      stationVacancyWCPO: ""
    };
    this.handleClickGen = this.handleClickGen.bind(this);
    this.handleClickReq = this.handleClickReq.bind(this);
    this.handleCLickAddAdmin = this.handleCLickAddAdmin.bind(this);
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
    this.handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
    this.handleClickAdminEdit = this.handleClickAdminEdit.bind(this);
    this.handleClickAdminPassword = this.handleClickAdminPassword.bind(this);
    this.handleCLickAddUser = this.handleCLickAddUser.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleClickUserEdit = this.handleClickUserEdit.bind(this);
    this.handleClickUserPassword = this.handleClickUserPassword.bind(this);
    this.handleCLickAddStation = this.handleCLickAddStation.bind(this);
    this.handleChangeStation = this.handleChangeStation.bind(this);
    this.handleSubmitStation = this.handleSubmitStation.bind(this);
    this.handleClickStationEdit = this.handleClickStationEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOpenAdmin = this.handleOpenAdmin.bind(this);
    this.handleOpenUser = this.handleOpenUser.bind(this);
    this.handleOpenStation = this.handleOpenStation.bind(this);
  }
  handleOpenAdmin() {
    this.setState({ adminPopup: true });
  }
  handleOpenUser() {
    this.setState({ userPopup: true });
  }
  handleOpenStation() {
    this.setState({ stationPopup: true });
  }
  handleClickGen() {
    history.push("/admin/general");
  }
  handleClickReq() {
    history.push("/admin/request");
  }
  handleCLickAddAdmin() {
    this.setState({ adminPopup: true });
  }
  handleChangeAdmin(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitAdmin = e => {
    e.preventDefault();
    const { adminPenno, adminName, adminPassword, adminPrivilege } = this.state;
    adminService.addAdmin(adminPenno, adminName, adminPassword, adminPrivilege);
    console.log(this.state);
    this.setState({ adminPopup: false });

    // window.location.reload(true);
  };
  handleClickAdminEdit() {
    history.push("/admin/editadmin");
  }
  handleClickAdminPassword() {
    history.push("/admin/adminpassword");
  }
  handleCLickAddUser() {
    this.setState({ userPopup: true });
  }
  handleChangeUser(e) {
    console.log(e.target);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitUser(e) {
    e.preventDefault();
    const { userPenno, userName, userPassword, userDesignation } = this.state;
    adminService.addUser(userPenno, userName, userPassword, userDesignation);
    this.setState({ userPopup: false });
  }
  handleClickUserEdit() {
    history.push("/admin/edituser");
  }
  handleClickUserPassword() {
    history.push("/admin/userpassword");
  }
  handleCLickAddStation() {
    this.setState({ stationPopup: true });
  }
  handleChangeStation(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitStation(e) {
    e.preventDefault();
    const {
      stationCode,
      stationName,
      stationVacancySI,
      stationVacancyASI,
      stationVacancySCPO,
      stationVacancyTSCPO,
      stationVacancyWCPO
    } = this.state;
    adminService.addStation(
      stationCode,
      stationName,
      stationVacancySI,
      stationVacancyASI,
      stationVacancySCPO,
      stationVacancyTSCPO,
      stationVacancyWCPO
    );
    this.setState({ stationPopup: false });
  }
  handleClickStationEdit() {
    history.push("/admin/editstation");
  }
  handleLogout() {
    console.log("logged out");
    adminService.logoutAdmin();
    window.location.reload(true);
  }
  render() {
    return (
      <div className="adminDivMain">
        {/* <div className = {adminHeaderDiv}> */}
        <header className="adminHeader">
          <h3 className="adminHeaderHead">
            <span style={{ color: "#ff471a" }}>കേ</span>
            <span style={{ color: "#fff" }}>രള</span>{" "}
            <span style={{ color: "#ff471a" }}>പോ</span>
            <span style={{ color: "#fff" }}>ലീസ്</span>
          </h3>
          <div className="adminRight">
            <span className="adminHeaderSpan">Hello, Admin </span>
            &nbsp;&nbsp;
            <button className="adminLogout" onClick={this.handleLogout}>
              LOG OUT
            </button>
          </div>
        </header>
        {/* </div> */}
        <div className="adminContent">
          <center>
            <div className="adminAllot">
              <div className="adminGen">
                <button
                  className="admingenbutton"
                  onClick={this.handleClickGen}
                >
                  General Transfer Applications
                </button>
              </div>
              <br />
              <div className="adminReq">
                <button
                  className="admingenbutton"
                  onClick={this.handleClickReq}
                >
                  Request Transfer Applications
                </button>
                <br />
              </div>
            </div>
          </center>
          {/* _______________________________________________________________ */}
          <center>
            <div className="adminFn">
              <div>
                <div className="adminAdmin">
                  <center>
                    <h2 className="adminHead">ADMIN</h2>
                  </center>
                  <Popup
                    trigger={
                      <button
                        className="adminButton"
                        onClick={this.handleCLickAddAdmin}
                      >
                        Add Admin
                      </button>
                    }
                    position="bottom center"
                    open={this.state.adminPopup}
                    onOpen={this.handleOpenAdmin}
                    on="click"
                    className="adminPopup"
                  >
                    <div>
                      <form
                        className="adminForm"
                        onSubmit={this.handleSubmitAdmin}
                      >
                        PEN Number:
                        <br />
                        <input
                          name="adminPenno"
                          value={this.state.adminPenno}
                          className="adminInput"
                          onChange={this.handleChangeAdmin}
                        />
                        Name:
                        <br />
                        <input
                          name="adminName"
                          className="adminInput"
                          value={this.state.adminName}
                          onChange={this.handleChangeAdmin}
                        />
                        Password:
                        <br />
                        <input
                          type="password"
                          name="adminPassword"
                          className="adminInput"
                          value={this.state.adminPassword}
                          onChange={this.handleChangeAdmin}
                        />
                        Privilege:
                        <br />
                        <select
                          className="adminSelect"
                          name="adminPrivilege"
                          value={this.state.adminPrivilege}
                          onChange={this.handleChangeAdmin}
                        >
                          <option value="1">Super Admin</option>
                          <option value="2">Admin</option>
                        </select>
                        <br />
                        <button className="adminButton">Submit</button>
                      </form>
                    </div>
                  </Popup>
                  <br />
                  <button
                    className="adminButton"
                    onClick={this.handleClickAdminEdit}
                  >
                    Edit Admin
                  </button>
                  <br />
                  <button
                    className="adminButton"
                    onClick={this.handleClickAdminPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </div>

              {/* _______________________________________________________________ */}
              {/* _______________________________________________________________ */}
              <div className="adminUser">
                <div>
                  <center>
                    <h2 className="adminHead">USER</h2>
                  </center>
                  <Popup
                    trigger={
                      <button
                        className="adminButton"
                        onClick={this.handleCLickAddAdmin}
                      >
                        Add User
                      </button>
                    }
                    position="bottom center"
                    open={this.state.userPopup}
                    onOpen={this.handleOpenUser}
                    on="click"
                  >
                    <div>
                      <form onSubmit={this.handleSubmitUser}>
                        PEN Number:
                        <br />
                        <input
                          className="adminInput"
                          name="userPenno"
                          value={this.state.userPenno}
                          onChange={this.handleChangeUser}
                        />
                        Name:
                        <input
                          className="adminInput"
                          name="userName"
                          value={this.state.userName}
                          onChange={this.handleChangeUser}
                        />
                        Password:
                        <br />
                        <input
                          className="adminInput"
                          type="password"
                          name="userPassword"
                          value={this.state.userPassword}
                          onChange={this.handleChangeUser}
                        />
                        Designation:
                        <br />
                        <div>
                          <select
                            className="adminSelect"
                            name="userDesignation"
                            value={this.state.userDesignation}
                            onChange={this.handleChangeUser}
                          >
                            <option value="si">SI</option>
                            <option value="asi">ASI</option>
                            <option value="scpo">SCPO</option>
                            <option value="tscpo">TSCPO</option>
                            <option value="cpo">CPO</option>
                            <option value="wcpo">WCPO</option>
                          </select>
                        </div>
                        <br />
                        <button className="adminButton">Submit</button>
                      </form>
                    </div>
                  </Popup>
                  <br />
                  <button
                    className="adminButton"
                    onClick={this.handleClickUserEdit}
                  >
                    Edit User
                  </button>
                  <br />
                  <button
                    className="adminButton"
                    onClick={this.handleClickUserPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
              {/* _______________________________________________________________ */}
              {/* _______________________________________________________________ */}
              <div className="adminStation">
                <div>
                  <h2 className="adminHead">STATIONS</h2>
                  <Popup
                    trigger={
                      <button
                        className="adminButton"
                        onClick={this.handleCLickAddStation}
                      >
                        Add Station
                      </button>
                    }
                    position="bottom center"
                    onOpen={this.handleOpenStation}
                    open={this.state.stationPopup}
                    on="click"
                  >
                    <div>
                      <form onSubmit={this.handleSubmitStation}>
                        Station Code:
                        <br />
                        <input
                          className="adminInput"
                          name="stationCode"
                          value={this.state.stationCode}
                          onChange={this.handleChangeStation}
                        />
                        Station Name:
                        <br />
                        <input
                          className="adminInput"
                          name="stationName"
                          value={this.state.stationName}
                          onChange={this.handleChangeStation}
                        />
                        Vacancy for SI:
                        <br />
                        <input
                          className="adminInput"
                          name="stationVacancySI"
                          value={this.state.stationVacancySI}
                          onChange={this.handleChangeStation}
                        />
                        Vacancy for ASI:
                        <br />
                        <input
                          className="adminInput"
                          name="stationVacancyASI"
                          value={this.state.stationVacancyASI}
                          onChange={this.handleChangeStation}
                        />
                        Vacancy for SCPO:
                        <br />
                        <input
                          className="adminInput"
                          name="stationVacancySCPO"
                          value={this.state.stationVacancySCPO}
                          onChange={this.handleChangeStation}
                        />
                        Vacancy for TSCPO:
                        <br />
                        <input
                          className="adminInput"
                          name="stationVacancyTSCPO"
                          value={this.state.stationVacancyTSCPO}
                          onChange={this.handleChangeStation}
                        />
                        Vacancy for CPO:
                        <br />
                        <input
                          className="adminInput"
                          name="stationVacancyCPO"
                          value={this.state.stationVacancyCPO}
                          onChange={this.handleChangeStation}
                        />
                        Vacancy for WCPO:
                        <br />
                        <input
                          className="adminInput"
                          name="stationVacancyWCPO"
                          value={this.state.stationVacancyWCPO}
                          onChange={this.handleChangeStation}
                        />
                        <br />
                        <button className="adminButton">Submit</button>
                      </form>
                    </div>
                  </Popup>
                  <br />
                  <button
                    className="adminButton"
                    onClick={this.handleClickStationEdit}
                  >
                    Edit Station
                  </button>
                </div>
              </div>
              <footer className="footermob">
                <center className="footerText">
                  &copy; Kerala Police Palakkad 2019-2020
                </center>
              </footer>
            </div>
            {/* _______________________________________________________________ */}
          </center>
        </div>
        <footer className="footer">
          <center className="footerText">
            &copy; Kerala Police Palakkad 2019-2020
          </center>
        </footer>
      </div>
    );
  }
}
