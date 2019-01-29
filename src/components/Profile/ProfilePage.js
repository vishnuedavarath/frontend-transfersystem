import React, { Component } from "react";
import { userActions } from "../../__actions/userActions";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { userService } from "../../__services/userService";
import { history } from "../../__helpers/history";

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
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(userActions.getProfile());
    userService.getProfile().then(profile => {
      console.log(profile);
      this.setState({
        penno: profile.penno,
        name: profile.name,
        designation: profile.designation,
        joindate: profile.joinDate,
        currentstattion: profile.currentStation,
        prevstations: profile.prevStation,
        lasttransfer: profile.lastTransferDate,
        reqtransfer: profile.reqTransfer,
        gentransfer: profile.genTransfer,
        gentransferstatus: profile.genTransStatus
      });
	});
    // var stat;
    userService.getStations().then(stations => {
		console.log(stations);
		this.setState({stations:stations});

	});
    console.log(this.stat);
    this.props.dispatch(userActions.getfirst());
  }

  render() {
	
	//   console.log(p);
    return (
      <div>
        <h2>Profile</h2>
        <span>Name :{this.state.name}</span>
        <br />
        <span>PEN Number:{this.state.penno}</span>
        <br />
        <span>Designation :{this.state.designation}</span>
        <br />
        <span>Joining Date : {this.state.joindate}</span>
        <br />
        <div>
          <span>
            {/* Current Station :{this.state.stations.stations[(this.state.currentstattion)].name} */}
          </span>
          <br />
        </div>
        <div>
          Previous Stations
          <br />
          <span>1.{this.state.prevstations.first}</span>
          <br />
          <span>2.{this.state.prevstations.second}</span>
          <br />
          <span>3.{this.state.prevstations.Third}</span>
          <br />
          <button onClick={this.handleClick}>Edit Details</button>
          <br />
        </div>
        <span>LAST TRANSFER DATE:{this.state.lasttransfer}</span>
        <br />
        {/* <button>< Link To = '/optionpage'>GENERAL TRANSFER</ Link></button>
		<button> <Link To = '/optionpage'>REQUEST TRANSFER</Link></button> */}
        <div>
          {console.log(this.state.reqtransfer.op1)}
          {!(this.state.gentransfer.op1 === undefined) && (
            <div>
              <h3>GENERAL TRANSFER</h3>
              <h4>Applied Options</h4>
              {console.log(this.state.gentransfer)}
              <br />
              <span>1.{this.state.gentransfer.op1}</span>
              <br />
              <span>2.{this.state.gentransfer.op2}</span>
              <br />
              <span>3.{this.state.gentransfer.op3}</span>
              <br />
              <button onClick={this.handleclickGen}>Edit Options</button>
              <br />
            </div>
          )}
        </div>
        <div>
          {!(this.state.reqtransfer.op1 === undefined) && (
            <div>
              <h3>REQUEST TRANSFER</h3>
              <h4>Applied Options</h4>
              <br />
              <span>1.{this.state.reqtransfer.op1}</span>
              <br />
              <span>2.{this.state.reqtransfer.op2}</span>
              <br />
              <span>3.{this.state.reqtransfer.op3}</span>
              <br />
              <button onClick={this.handleclickReq}>Edit Options</button>
              <br />
            </div>
          )}
        </div>
        <div>
          {this.state.gentransferstatus &&
            this.state.gentransfer.op1 === undefined && (
              <button onClick={this.handleclickGen}>GENERAL TRANSFER</button>
            )}
        </div>
        <div>
          {!this.state.gentransferstatus &&
            this.state.reqtransfer.op1 === undefined && (
              <button onClick={this.handleclickReq}>REQUEST TRANSFER</button>
            )}
        </div>
        {/* <button onClick={this.handleCLick}>Logout</button> */}
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
