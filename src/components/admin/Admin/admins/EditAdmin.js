import React, { Component } from "react";
import { adminService } from "../../../../__services/adminService";
import Popup from "reactjs-popup";
import '../../../../assets/editpage/css/editpage.css'

export default class EditAdmin extends Component {
  constructor() {
    super();
    this.state = {
      openPopup: false,
      penno: "",
      adminName: "",
      adminPenno: "",
      adminPrivilege: "",
      adminDesignation: "",
      adminId: "",
      privilege: {
        "1": "Super Admin",
        "2": "Admin"
      }
    };
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
    this.handleSubmitAdminSearch = this.handleSubmitAdminSearch.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
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
        openPopup: false,
        adminName: admin.admins.name,
        adminPenno: admin.admins.penno,
        adminPrivilege: admin.admins.privilege,
        adminDesignation: admin.admins.designation,
        adminId: admin.admins._id
      });
    });
  }
  handleClickEdit() {
    this.setState({ openPopup: true });
  }
  handleSubmitAdmin(e) {
    e.preventDefault();
    const { adminPenno, adminName, adminPrivilege, adminId } = this.state;
    adminService.editAdmin(adminPenno, adminName, adminPrivilege, adminId);
  }
  handleClickDelete() {
    adminService.adminDelete(this.state.adminId).then(
      data => {
        window.location.reload(true);
      },
      error => {}
    );
    window.location.reload(true);
  }

  render() {
    return (
      <div className="editMain">
        <header className="profileHeader">
          <h3 className="profileHeaderHead">Kerala Police</h3>
          <div className="profileRight">
            &nbsp;&nbsp;
            <button className="profileLogout" onClick={this.handleclick}>
              Logout
            </button>
          </div>
        </header>

        <div className="editContent">
          <div className="editSearch">
            <form onSubmit={this.handleSubmitAdminSearch}>
              <input
                className="editInput"
                type="admin"
                name="penno"
				value={this.state.penno}
				placeholder = "PEN Number"
                onChange={this.handleChangeAdmin}
              />
              <button className = "editButton">Submit</button>
            </form>
          </div>
          <div className = "editResults">
            {this.state.adminId && (
              <div className = "editResult">
                <span>PEN Number:{this.state.adminPenno}</span>
                <br />
                <span>Name:{this.state.adminName}</span>
                <br />
                <span>
                  Privilege:{this.state.privilege[this.state.adminPrivilege]}
                </span>
                <br />
                <Popup
                  trigger={
                    <button className = "editButton1" onClick={this.handleClickEdit}>
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
                      Privilege:
                      <br />
                      <select
                        name="adminPrivilege"
                        value={this.state.adminPrivilege}
                        onChange={this.handleChangeAdmin}
                      >
                        <option value="1">Super</option>
                        <option value="2">Admin</option>
                      </select>
                      <br />
                      <button>Submit</button>
                    </form>
                  </div>
                </Popup>
                <button className = "editButton2" onClick={this.handleClickDelete}>Delete Admin</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
