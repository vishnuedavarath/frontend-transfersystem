import React, { Component } from "react";
import { adminService } from "../../../../__services/adminService";
import Popup from 'reactjs-popup';

export default class EditAdmin extends Component {
  constructor() {
    super();
    this.state = {
      penno: "",
      adminName: "",
      adminPenno: "",
      adminPrivilege: "",
      adminDesignation: ""
    };
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
	this.handleSubmitAdminSearch = this.handleSubmitAdminSearch.bind(this);
	this.handleClickEdit = this.handleClickEdit.bind(this);
	handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
  }
  handleChangeAdmin(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitAdminSearch() {
    const { penno } = this.state;
    adminService.searchAdmin(penno).then(admin => {
      this.setState({
		  openPopup:false,
        adminName: admin.name,
        adminPenno: admin.penno,
        adminPrivilege: admin.privilege,
        adminDesignation: admin.designation
      });
    });
  }
  handleClickEdit(){
	  this.setState({openPopup:true});
  }
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmitAdminSearch}>
            <input
              type="admin"
              name="penno"
              value={this.state.penno}
              onChange={this.handleChangeAdmin}
            />
            <button>Submit</button>
          </form>
        </div>
        <div>
          {user => (
            <div>
              <span>PEN Number:{this.state.adminPenno}</span>
              <br />
              <span>Name:{this.state.adminName}</span>
              <br />
              <span>Privilege:{this.state.adminPrivilege}</span>
              <br />u
              <Popup
                trigger={
                  <button onClick={this.handleClickEdit}>
                    Edit Admin Details
                  </button>
                }
                position="bottom center"
                open={this.state.openPopup}
                on="click"
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
                    Designation:
                    <br />
                    <input
                      name="code"
                      value={this.state.admin}
                      onChange={this.handleChangeStation}
                    />
					<select value = {this.state.adminDesignation} onChange = {this.handleChangeAdmin}>
						<option value="si">SI</option>
						<option value="asi">ASI</option>
						<option value="scpo">SCPO</option>
						<option value="tscpo">TSCPO</option>
						<option value="cpo">CPO</option>
						<option value="wcpo">WCPO</option>
					</select>
                    <br />
                    <select value = {this.state.adminPrivilege} onChange = {this.handleChangeAdmin}>
						<option value="1">Super</option>
						<option value="2">Admin</option>
					</select>
                    <br />
                    <button>Submit</button>
                  </form>
                </div>
              </Popup>
            </div>
          )}
        </div>
      </div>
    );
  }
}
