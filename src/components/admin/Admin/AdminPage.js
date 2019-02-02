import React, { Component } from "react";
import { history } from "../../../__helpers/history";
import Popup from "reactjs-popup";
import { adminService } from "../../../__services/adminService";
// import Modal from 'react-responsive-modal'

export default class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      adminPopup: false,
      adminPenno: "",
      adminName: "",
      adminPassword: "",
      adminPrivilege: "",
    };
    this.handleClickGen = this.handleClickGen.bind(this);
    this.handleClickReq = this.handleClickReq.bind(this);
    this.handleCLickAddAdmin = this.handleCLickAddAdmin.bind(this);
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
	this.handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
	this.handleClickAdminEdit = this.handleClickAdminEdit.bind(this);
	this.handleClickAdminPassword = this.handleClickAdminPassword.bind(this);

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
  handleSubmitAdmin() {
    const { adminPenno, adminName, adminPassword, adminPrivilege } = this.state;
    adminService.addAdmin(adminPenno, adminName, adminPassword, adminPrivilege);
    this.setState({ adminPopup: false });
  }
  handleClickAdminEdit(){
	  history.push('/admin/editstation');
  }
  handleClickAdminPassword(){
	  history.push('/admin/adminpassword');
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
        {/* _______________________________________________________________ */}
        <div>
          <Popup
            trigger={
              <button onClick={this.handleCLickAddAdmin}>Add Admin</button>
            }
            position="bottom center"
            open={this.state.adminPopup}
            on="click"
          >
            <div>
              <form onSubmit={this.handleSubmitAdmin}>
                Station Name:
                <br />
                <input
                  name="adminPenno"
                  value={this.state.adminPenno}
                  onChange={this.handleChangeAdmin}
                />
                <input
                  name="adminName"
                  value={this.state.adminName}
                  onChange={this.handleChangeAdmin}
                />
                <br />
                Station Code:
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
		  <button onClick={this.handleClickAdminPassword}>Reset Password</button>
        </div>
        {/* _______________________________________________________________ */}
        _______________________________________________________________
        <div />
        {/* _______________________________________________________________ */}
        {/* _______________________________________________________________ */}
        <div />
        {/* _______________________________________________________________ */}
      </div>
    );
  }
}
