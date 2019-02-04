import React, { Component } from "react";
import { history } from "../../../__helpers/history";
import Popup from "reactjs-popup";
import { adminService } from "../../../__services/adminService";
// import Modal from 'react-responsive-modal'
import styles from "../../../assets/adminpage/css/adminpage";

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
  handleSubmitAdmin(e) {
    e.preventDefault();
    const { adminPenno, adminName, adminPassword, adminPrivilege } = this.state;
    adminService.addAdmin(adminPenno, adminName, adminPassword, adminPrivilege);
    this.setState({ adminPopup: false });

    // window.location.reload(true);
  }
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
      <div style={styles.adminDivMain}>
        <header style={styles.adminHeader}>
          <h2 style={styles.adminHeaderHead}>Kerala Police</h2>
          <span style={styles.adminHeaderSpan}>Hello, Admin</span>
          <button style={styles.adminLogout} onClick={this.handleLogout}>
            Logout
          </button>
        </header>
        <div style={styles.adminAllot}>
          <div style = {styles.adminGen}>
            <button style = {styles.adminGenButton} onClick={this.handleClickGen}>
              General Transfer Applications
            </button>
          </div>
          <br />
          <div style = {styles.adminReq}>
            <button style = {styles.adminReqButton} onClick={this.handleClickReq}>
              Request Transfer Applications
            </button>
            <br />
          </div>
        </div>
        {/* _______________________________________________________________ */}
        <div>
          <h2 style = {styles.adminHead}>Admin</h2>
          <Popup
            trigger={
              <button onClick={this.handleCLickAddAdmin}>Add Admin</button>
            }
            position="bottom center"
            open={this.state.adminPopup}
			on="click"
			style = {styles.adminPopup}
          >
            <div>
              <form onSubmit={this.handleSubmitAdmin}>
                PEN Number:
                <br />
                <input
                  name="adminPenno"
                  value={this.state.adminPenno}
                  onChange={this.handleChangeAdmin}
                />
                Name:
                <br />
                <input
                  name="adminName"
                  value={this.state.adminName}
                  onChange={this.handleChangeAdmin}
                />
                <br />
                Password:
                <br />
                <input
                  type="password"
                  name="adminPassword"
                  value={this.state.adminPassword}
                  onChange={this.handleChangeAdmin}
                />
                <br />
                Privilege:
                <br />
                <select
                  name="adminPrivilege"
                  value={this.state.adminPrivilege}
                  onChange={this.handleChangeAdmin}
                >
                  <option value="1">Super Admin</option>
                  <option value="2">Admin</option>
                </select>
                <br />
                <button>Submit</button>
              </form>
            </div>
          </Popup>
          <br />
          <button onClick={this.handleClickAdminEdit}>Edit Admin</button>
          <button onClick={this.handleClickAdminPassword}>
            Reset Password
          </button>
        </div>
        {/* _______________________________________________________________ */}
        {/* _______________________________________________________________ */}
        <div>
          <div>
            <h2>User</h2>
            <Popup
              trigger={
                <button onClick={this.handleCLickAddAdmin}>Add User</button>
              }
              position="bottom center"
              open={this.state.userPopup}
              on="click"
            >
              <div>
                <form onSubmit={this.handleSubmitUser}>
                  PEN Number:
                  <br />
                  <input
                    name="userPenno"
                    value={this.state.userPenno}
                    onChange={this.handleChangeUser}
                  />
                  <br />
                  Name:
                  <input
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleChangeUser}
                  />
                  <br />
                  Password:
                  <br />
                  <input
                    type="password"
                    name="adminPassword"
                    value={this.state.adminPassword}
                    onChange={this.handleChangeAdmin}
                  />
                  <br />
                  Designation:
                  <br />
                  <select
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
                  <br />
                  <button>Submit</button>
                </form>
              </div>
            </Popup>
            <br />
            <button onClick={this.handleClickUserEdit}>Edit User</button>
            <button onClick={this.handleClickUserPassword}>
              Reset Password
            </button>
          </div>
        </div>
        {/* _______________________________________________________________ */}
        {/* _______________________________________________________________ */}
        <div>
          <div>
            <h2>Stations</h2>
            <Popup
              trigger={
                <button onClick={this.handleCLickAddStation}>
                  Add Station
                </button>
              }
              position="bottom center"
              open={this.state.stationPopup}
              on="click"
            >
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
                </form>
              </div>
            </Popup>
            <br />
            <button onClick={this.handleClickStationEdit}>Edit Admin</button>
          </div>
        </div>
        {/* _______________________________________________________________ */}
      </div>
    );
  }
}
