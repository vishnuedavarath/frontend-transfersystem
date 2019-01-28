import React, { Component } from "react";
import { userActions } from "../../__actions/userActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleclick = this.handleclick.bind(this);
  }
  handleclick(e) {
    const { dispatch } = this.props;
    this.setState({ name: true });
    dispatch(userActions.reqtype(this.state.isGeneral, this.state.isRequest));
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getProfile());
  }

  render() {
    console.log("this.props.profile");
    this.setState({
      penno: this.props.profile.penno,
      name: this.props.profile.name,
      designation: this.props.profile.designation,
      joindate: this.props.profile.joinDate,
      currentstattion: this.props.profile.currentStation,
      prevstations: this.props.profile.prevStation,
      lasttransfer: this.props.profile.lastTransferDate,
      reqtransfer: this.props.profile.reqTransfer,
      gentransfer: this.props.profile.genTransfer,
      gentransferstatus: this.props.profile.genTransferStatus
    });
    return (
      <div>
        <h2>Profile</h2>
        <span>Name :{this.state.name}</span>
        <span>Designation :{this.state.designation}</span>
        <span>Joining Date : </span>
        <div>
          <span>Current Station :{this.state.currentstattion}</span>
          <button>Select Current Station</button>
        </div>
        <div>
          Previous Stations
          <span>1.{this.state.prevstations.opt1}</span>
          <span>2.{this.state.prevstations.opt2}</span>
          <span>3.{this.state.prevstations.opt3}</span>
          <button>
            {" "}
            <Link to="/previousstation">Select Previous Stations</Link>
          </button>
        </div>
        <span>LAST TRANSFER DATE:{this.state.lasttransfer}</span>
        <span>Name :</span>
        {/* <button>< Link To = '/optionpage'>GENERAL TRANSFER</ Link></button>
		<button> <Link To = '/optionpage'>REQUEST TRANSFER</Link></button> */}
        <button onClick={this.handleclick} name="gen">
          GENERAL TRANSFER
        </button>
        <button onClick={this.handleclick} name="req">
          REQUEST TRANSFER
        </button>
        {/* <button onClick={this.handleCLick}>Logout</button> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const profile = state.profile;
  // const {dispatch} = state;
  return {
    profile
  };
}

export default connect(mapStateToProps)(ProfilePage);
