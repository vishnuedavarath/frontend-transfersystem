import React, { Component } from "react";
import { adminService } from "../../../__services/adminService";
import Modal from "react-responsive-modal";
import "../../../assets/allotpage/css/allotpage.css";
export default class GenPage extends Component {
  constructor() {
    super();
    this.state = {
      designations: ["si", "asi", "scpo", "tscpo", "cpo", "wcpo"],
      des: "si",
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
    adminService.GenList(this.state.des).then(list => {
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
        tgt.genTransfer.op1,
        tgt.genTransfer.op2,
        tgt.genTransfer.op3
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
      .genAllot(this.state.openPenno, e.target.value, this.state.des)
      .then(data => {
        console.log(data);
        this.setState({ open: false });
        window.location.reload(true);
      });
  }
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className="allotMainDiv">
        <header className="profileHeader">
          <h3 className="profileHeaderHead">Kerala Police</h3>
          <div className="profileRight">
            <span className="profileHeaderSpan">
              Hello, &nbsp;&nbsp;{this.state.name}
            </span>
            &nbsp;&nbsp;
            <button className="profileLogout" onClick={this.handleclick}>
              Logout
            </button>
          </div>
        </header>
        <div className="allotContent">
          <div className="allotDiv1">
            <h2>General Transfer Applications</h2>
            <div className = "allotSearchDiv">
              <span className = "allotDesigSpan">Select Designation:</span>
              <select
                name="des"
                value={this.state.opt1}
                onChange={this.handleChange}
              >
                {this.state.designations.map(des => (
                  <option key={des} value={des}>
                    {des}
                  </option>
                ))}
              </select>
              <button className = "allotButton" onClick={this.handleClick}>Submit</button>
            </div>
          </div>
          <div>
            {this.state.users.map(user => (
              <div className = "allotDiv1">
                <div className = "allotResultDiv">
                  <br />
                  {/* _________________________________________________ */}
                  <br />
                  <span>PEN Number:{user.penno}</span>
                  <br />
                  <span>Name:{user.name}</span>
                  <br />
                  <span>Joining Date:{user.joinDate}</span>
                  <br />
                  <button
                    onClick={this.onOpenModal}
                    value={JSON.stringify(user)}
                  >
                    Check
                  </button>
                  <br />
                  {/* ___________________________________________________ */}
                  <br />
                </div>
                <Modal
                  open={this.state.open}
                  onClose={this.onCloseModal}
                  center
                >
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
                        value={this.state.op1.id}
                        onClick={this.handleclick}
                      >
                        {this.state.op1.name}
                      </button>
                      <br />
                      <span>Vacancy:{this.state.op1.vacancy}</span>
                      <br />
                      <button
                        value={this.state.op2.id}
                        onClick={this.handleclick}
                      >
                        {this.state.op2.name}
                      </button>
                      <br />
                      <span>Vacancy:{this.state.op2.vacancy}</span>
                      <br />
                      <button
                        value={this.state.op3.id}
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
      </div>
    );
  }
}
