import React, { Component } from "react";
import { adminService } from "../../../../__services/adminService";
import Popup from "reactjs-popup";

import '../../../../assets/editpage/css/editpage.css'

export default class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      openPopup: false,
      penno: "",
      userName: "",
      userPenno: "",
      userPrivilege: "",
      userDesignation: ""
    };
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmitUserSearch = this.handleSubmitUserSearch.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  handleChangeUser(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitUserSearch(e) {
    e.preventDefault();
    const { penno } = this.state;
    adminService.searchUser(penno).then(user => {
      this.setState({
        userName: user.user.name,
        userPenno: user.user.penno,
        userId: user.user._id,
        userDesignation: user.user.designation
      });
    });
  }
  handleClickEdit() {
    this.setState({ openPopup: true });
  }
  handleSubmitUser(e) {
	e.preventDefault();
    const {userId,userPenno, userName, userDesignation } = this.state;
	adminService.editUser(userId,userPenno, userName, userDesignation).then(
		success => {
			this.setState({openPopup:false});
			window.location.reload(true);
			return success;
		}
	)
  }
  handleClickDelete(e) {
    e.preventDefault();
    adminService.userDelete(this.state.userId);
    window.location.reload(true);
  }

  render() {
    return (
      <div className = "editMain">
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
          <form onSubmit={this.handleSubmitUserSearch}>
            <input
            className = "editInput"
              type="user"
              name="penno"
              value={this.state.penno}
              onChange={this.handleChangeUser}
            />
            <button className = "editButton">Submit</button>
          </form>
        </div>
        <div className = "editResults">
          {this.state.userId && (
            <div className = "editResult">
              <span>PEN Number:{this.state.userPenno}</span>
              <br />
              <span>Name:{this.state.userName}</span>
              <br />
              <Popup
                trigger={
                  <button className = "editButton1" onClick={this.handleClickEdit}>
                    Edit user Details
                  </button>
                }
                position="bottom center"
                open={(this.state.openPopup)}
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
                    Name:
                    <br />
                    <input
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleChangeUser}
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
              <button className = "editButton2" onClick={this.handleClickDelete}>Delete user</button>
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }
}
