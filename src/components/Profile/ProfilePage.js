import React, { Component } from "react";
import { userActions } from "../../__actions/userActions";
import { connect } from 'react-redux';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
	this.state = {
		penno:"",
		name:"",
		designation:"",
		joindate:"",
		currentstattion:"",
		prevstations : {
			opt1:"",
			opt2:"",
			opt3:"",
		},
		lasttransfer:"",
		reqtransfer : {
			opt1 : "",
			opt2 : "",
			opt3 : ""
		},
		gentransfer : {
			opt1 : "",
			opt2 : "",
			opt3 : ""
		},
		gentransferstatus: false

	};
	
  }
  componentDidMount(){
	const { dispatch } = this.props;
	dispatch(userActions.getProfile())
	this.setState(
		{
			penno:this.profile.penno,
			name:this.profile.name,
			designation:this.profile.designation,
			joindate:this.profile.joinDate,
			currentstattion:this.profile.currentStation,
			prevstations : this.profile.prevStation,
			lasttransfer:this.profile.lastTransferDate,
			reqtransfer : this.profile.reqTransfer,
			gentransfer : this.profile.genTransfer,
			gentransferstatus: this.profile.genTransferStatus

		}

	);
	
  }
  render() {
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
		  <button Link To = '/previousstation'>Select Previous Stations</button>
        </div>
        <span>LAST TRANSFER DATE:{this.state.lasttransfer}</span>
        <span>Name :</span>
		<button Link To = '/optionpage'>GENERAL TRANSFER</button>
		<button Link To = '/optionpage'>REQUEST TRANSFER</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
	const { profile } = state;
	const {dispatch} = state;
    return {
		profile,
        dispatch,
    };
}

export default connect(mapStateToProps)(ProfilePage);