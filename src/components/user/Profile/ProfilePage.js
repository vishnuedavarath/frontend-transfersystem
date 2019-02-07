import React, { Component } from "react";
import { userActions } from "../../../__actions/userActions";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { userService } from "../../../__services/userService";
import { history } from "../../../__helpers/history";

import "../../../assets/profile/css/profile.css";
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: {},
      penno: "",
      name: "",
      designation: "",
      joindate: "",
      currentstattion: "",
      prevstations: {
        opt1: "",
        opt2: "",
        opt3: ""
      },
      lasttransfer: "",
      reqtransfer: {
        opt1: "",
        opt2: "",
        opt3: ""
      },
      gentransfer: {
        opt1: "",
        opt2: "",
        opt3: ""
      },
      gentransferstatus: false,
      isGeneral: false,
      isRequest: false
    };
    this.handleclickGen = this.handleclickGen.bind(this);
    this.handleclickReq = this.handleclickReq.bind(this);
    this.handleclick = this.handleclick.bind(this);
  }

  handleclickGen() {
    // const { dispatch } = this.props;
    // dispatch(userActions.reqtype(this.state.isGeneral));
    history.push("/genoption");
  }

  handleclickReq() {
    history.push("/reqoption");
  }
  handleClick() {
    history.push("/prevstation");
  }
  handleclick() {
    history.push("/login");
  }
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(userActions.getProfile());
    userService.getProfile().then(profile => {
      console.log(profile);
      var joinDate = new Date(profile.joinDate);
      var lastDate = new Date(profile.lastTransferDate);

      this.setState({
        penno: profile.penno,
        name: profile.name,
        designation: profile.designation,
        joindate: `${joinDate.getFullYear()}-${joinDate.getMonth() +
          1}-${joinDate.getDate()}`,
        currentstattion: profile.currentStation,
        prevstations: profile.prevStation,
        lasttransfer: `${lastDate.getFullYear()}-${lastDate.getMonth() +
          1}-${lastDate.getDate()}`,
        reqtransfer: profile.reqTransfer,
        gentransfer: profile.genTransfer,
        gentransferstatus: profile.genTransStatus
      });
    });
    // var stat;
    userService.getStations().then(stations => {
      console.log(stations);
      this.setState({ stations: stations });
    });
    console.log(this.stat);
    this.props.dispatch(userActions.getfirst());
  }

  render() {
    return (
      <div className="profileMainDiv">
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
        <div className="profileDiv1">
          <div className="profileDiv2">
            <h2 className="profileHead2">PROFILE</h2>
            <div className="profileProfile">
              <div className = "profileDetail">
                <span className="profileSpan">{this.state.name}</span>
                <br />
                <span className="profileSpan">
                  PEN Number:{this.state.penno}
                </span>
                <br />
                <span className="profileSpan">
                  Designation :{this.state.designation}
                </span>
                <br />
                <span className="profileSpan">
                  Joining Date :{this.state.joindate}
                </span>
                <br />
              </div>
              <button className="profileButtonEdit1" onClick={this.handleClick}>
                Edit Details
              </button>
            </div>
            <div className="profileDiv6">
              <span className="profileSpan">
                Current Station :{this.state.currentstattion}
              </span>
              <br />
            </div>
            <div className="profileDiv4">
              Previous Stations
              <br />
              <span className="profileSpan">
                1.{this.state.prevstations.first}
              </span>
              <br />
              <span className="profileSpan">
                2.{this.state.prevstations.second}
              </span>
              <br />
              <span className="profileSpan">
                3.{this.state.prevstations.Third}
              </span>
              <br />
              <br />
            </div>
            <span className="profileSpan">
              LAST TRANSFER DATE:{this.state.lasttransfer}
            </span>
            <br />
          </div>
          {/* <button>< Link To = '/optionpage'>GENERAL TRANSFER</ Link></button>
        <button> <Link To = '/optionpage'>REQUEST TRANSFER</Link></button> */}
          <div className="profileDiv3">
            <div >
              {console.log(this.state.reqtransfer.op1)}
              {this.state.gentransfer.op1 && (
                <div className="profileDiv5">
                  <h3 className="profileHead3">GENERAL TRANSFER</h3>
                  <h4>Applied Options</h4>
                  {console.log(this.state.gentransfer)}
                  <br />
                  <div className = "profileOptions">
                  <span className="profileSpan">
                    1.{this.state.gentransfer.op1}
                  </span>
                  <br />
                  <span className="profileSpan">
                    2.{this.state.gentransfer.op2}
                  </span>
                  <br />
                  <span className="profileSpan">
                    3.{this.state.gentransfer.op3}
                  </span>
                  </div>
                  <br />
                  <button
                    className="profileButtonEdit2"
                    onClick={this.handleclickGen}
                  >
                    Edit Options
                  </button>
                  <br />
                </div>
              )}
            </div>
            <div >
              {console.log(this.state.reqtransfer.op1)}
              {this.state.reqtransfer.op1 && (
                <div className="profileDiv5" >
                  <h3 className="profileHead3">REQUEST TRANSFER</h3>
                  <h4>Applied Options</h4>
                  <br />
                  <div className = "profileOptions">
                  <span className="profileSpan">
                    1.{this.state.reqtransfer.op1}
                  </span>
                  <br />
                  <span className="profileSpan">
                    2.{this.state.reqtransfer.op2}
                  </span>
                  <br />
                  <span className="profileSpan">
                    3.{this.state.reqtransfer.op3}
                  </span>
                  </div>
                  <br />
                  <button
                    className="profileButtonEdit2"
                    onClick={this.handleclickReq}
                  >
                    Edit Options
                  </button>
                  <br />
                </div>
              )}
            </div>
            <div className="profileDiv5">
              {console.log(this.state.gentransferstatus)}
              {this.state.gentransferstatus &&
                !this.state.gentransfer.op1 &&
                !this.state.reqtransfer.op1 && (
                  <button
                    className="profileButtonEdit2"
                    onClick={this.handleclickGen}
                  >
                    GENERAL TRANSFER
                  </button>
                )}
            </div>
            <div className="profileDiv5">
              {!this.state.gentransferstatus &&
                !this.state.reqtransfer.op1 &&
                !this.state.gentransfer.op1 && (
                  <button
                    className="profileButtonEdit2"
                    onClick={this.handleclickReq}
                  >
                    REQUEST TRANSFER
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const profile = state.profile;
  const { dispatch } = state;
  return {
    profile,
    dispatch
  };
}

export default connect(mapStateToProps)(ProfilePage);
