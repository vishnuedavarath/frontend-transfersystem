import React, { Component } from "react";
import { adminService } from "../../../../__services/adminService";
import '../../../../assets/password/css/password.css'

export default class AdminPassword extends Component {
  constructor() {
    super();
    this.state = {
      penno: "",
      adminId: "",
      adminPenno: "",
      adminName: "",
      newpassword: "",
      repassword: ""
    };
    this.handleSubmitAdminSearch = this.handleSubmitAdminSearch.bind(this);
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeAdmin(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitAdminSearch(e) {
    e.preventDefault();
    const { penno } = this.state;
    adminService.searchAdmin(penno).then(admin => {
      this.setState({
        adminName: admin.admins.name,
        adminPenno: admin.admins.penno,
        adminId: admin.admins._id
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    adminService.adminPassword(this.state.adminId, this.state.newpassword);
    window.location.reload(true);
  }
  render() {
    return (
      <div className="passwordMain">
        <header className="profileHeader">
          <h3 className="profileHeaderHead">Kerala Police</h3>
          <div className="profileRight">
            <span className="profileHeaderSpan">Hello, Admin&nbsp;&nbsp;</span>
            &nbsp;&nbsp;
            <button className="profileLogout" onClick={this.handleclickLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="passwordContent">
          <div className="passwordSearchDiv">
            <form onSubmit={this.handleSubmitAdminSearch}>
              <input
                className="passwordInput"
                type="admin"
                name="penno"
                value={this.state.penno}
                onChange={this.handleChangeAdmin}
              />
              <button className="passwordButton">Submit</button>
            </form>
          </div>
          <div className="passwordResults">
            {this.state.adminId && (
              <div className="passwordResult">
                <span>PEN Number:{this.state.adminPenno}</span>
                <br />
                <span>Name:{this.state.adminName}</span>
                <br />
                <h3>Change Password</h3>
                <br />
                <form onSubmit={this.handleSubmit}>
                  <span>New Password:</span>
                  <br />
                  <input
                    className="passwordInput"
                    type="password"
                    name="newpassword"
                    value={this.state.newpassword}
                    onChange={this.handleChangeAdmin}
                  />
                  <br />
                  <span>Retype New Password:</span>
                  <br />
                  <input
                    className="passwordInput"
                    type="password"
                    name="repassword"
                    value={this.state.repassword}
                    onChange={this.handleChangeAdmin}
                  />
                  <br />
                  <button className = "passwordButton">Submit</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
