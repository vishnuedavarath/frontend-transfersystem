import React, { Component } from "react";
import { adminService } from "../../../__services/adminService";
import Modal from "react-responsive-modal";

export default class ReqPage extends Component {
  constructor() {
    super();
    this.state = {
      designations: ["a1", "a2", "a3"],
      des: "a1",
      users: [],
      open: false,
      openPenno: "",
      openName: "",
      cur: "",
      op1: "",
      op2: "",
      op3: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleclick = this.handleclick.bind(this);
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({ des: e.target.value });
  }
  handleClick() {
    //   console.log(this.state.des);
    adminService.ReqList(this.state.des).then(list => {
      this.setState({ users: list.users });
    });
  }
  onOpenModal = e => {
    var tgt = JSON.parse(e.target.value);
    this.setState({
      open: true,
      openPenno: tgt.penno,
      openName: tgt.name
    });
    console.log(tgt);
    adminService
      .openModal(
        this.state.des,
        tgt.currentStation,
        tgt.reqTransfer.op1,
        tgt.reqTransfer.op2,
        tgt.reqTransfer.op3
      )
      .then(data => {
        this.setState({
          cur: data.current,
          op1: data.first,
          op2: data.second,
          op3: data.third
        });
      });
    console.log(this.state);
  };
  handleclick(e) {
    adminService
      .reqAllot(this.state.openPenno, e.target.value, this.state.des)
      .then(data => {
        console.log(data);
		this.setState({ open: false });
		// var desig = this.state.des;
		// window.location.reload(true);
		// this.setState({des:desig});
		this.handleClick();
      });
  }
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <div>
          <h2>Request Transfer Applications</h2>
          <span>Select Designation:</span>
          <select
            name="des"
            value={this.state.opt1}
            onChange={this.handleChange}
          >
            {this.state.designations.map(station => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
          <button onClick={this.handleClick}>Submit</button>
        </div>
        <div>
          {this.state.users.map(user => (
            <div>
              <div>
                <br />
                _________________________________________________
                <br />
                <span>PEN Number:{user.penno}</span>
                <br />
                <span>Name:{user.name}</span>
                <br />
                <span>Joining Date:{user.joinDate}</span>
                <br />
                <button onClick={this.onOpenModal} value={JSON.stringify(user)}>
                  Check
                </button>
                <br />
                ___________________________________________________
                <br />
              </div>
              <Modal open={this.state.open} onClose={this.onCloseModal} center>
                <div>
                  <span>Pen Number: {this.state.openPenno}</span>
                  <br />
                  <span>Name: {this.state.openName}</span>
                  <br />
                  <span>Current Station: {this.state.cur.name}</span>
                  <br />
                  <div>
                    <strong>Applied Option</strong>
                    <br />
                    <button
                      value={this.state.op1.statCode}
                      onClick={this.handleclick}
                    >
                      {this.state.op1.name}
                    </button>
                    <br />
                    <span>Vacancy:{this.state.op1.vacancy}</span>
                    <br />
                    <button
                      value={this.state.op2.statCode}
                      onClick={this.handleclick}
                    >
                      {this.state.op2.name}
                    </button>
                    <br />
                    <span>Vacancy:{this.state.op2.vacancy}</span>
                    <br />
                    <button
                      value={this.state.op3.statCode}
                      onClick={this.handleclick}
                    >
                      {this.state.op3.name}
                    </button>
                    <br />
                    <span>Vacancy:{this.state.op3.vacancy}</span>
                    <br />
                  </div>
                  <button onClick={this.onCloseModal}>Close</button>
                </div>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
