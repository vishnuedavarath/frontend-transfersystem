import React, { Component } from "react";
import { adminService } from "../../../../__services/adminService";
import Popup from 'reactjs-popup';

export default class EditUser extends Component {
  constructor() {
    super();
    this.state = {
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
  handleSubmitUserSearch() {
    const { penno } = this.state;
    adminService.searchUser(penno).then(user => {
      this.setState({
		  openPopup:false,
        userName: user.name,
        userPenno: user.penno,
        userPrivilege: user.privilege,
        userDesignation: user.designation
      });
    });
  }
  handleClickEdit(){
	  this.setState({openPopup:true});
  }
  handleSubmitUser(){
	  const {userPenno,userName,userPrivilege,userDesignation} = this.state
	  adminService.editUser(userPenno,userName,userPrivilege,userDesignation);
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmitUserSearch}>
            <input
              type="user"
              name="penno"
              value={this.state.penno}
              onChange={this.handleChangeUser}
            />
            <button>Submit</button>
          </form>
        </div>
        <div>
          {user => (
            <div>
              <span>PEN Number:{this.state.userPenno}</span>
              <br />
              <span>Name:{this.state.userName}</span>
              <br />
              <span>Privilege:{this.state.userPrivilege}</span>
              <br />u
              <Popup
                trigger={
                  <button onClick={this.handleClickEdit}>
                    Edit user Details
                  </button>
                }
                position="bottom center"
                open={this.state.openPopup}
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
                    <input
                      name="code"
                      value={this.state.user}
                      onChange={this.handleChangeStation}
                    />
					<select value = {this.state.userDesignation} onChange = {this.handleChangeUser}>
						<option value="si">SI</option>
						<option value="asi">ASI</option>
						<option value="scpo">SCPO</option>
						<option value="tscpo">TSCPO</option>
						<option value="cpo">CPO</option>
						<option value="wcpo">WCPO</option>
					</select>
                    <br />
                    <select value = {this.state.userPrivilege} onChange = {this.handleChangeUser}>
						<option value="1">Super</option>
						<option value="2">user</option>
					</select>
                    <br />
                    <button>Submit</button>
                  </form>
                </div>
              </Popup>
			  <button onClick = {this.handleClickDelete}>Delete user</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
