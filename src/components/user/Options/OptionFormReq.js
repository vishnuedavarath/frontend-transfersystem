import React, { Component } from "react";
import { userActions } from "../../../__actions/userActions";
import { connect } from "react-redux";
import { userService } from "../../../__services/userService";
import "../../../assets/optionform/optionform.css";
import Select from "react-select";
// import moment from "moment";
class OptionFormGen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [{ value: "", label: "(Select Station)" }],
      cur: "",
      opt1: "",
      opt2: "",
      opt3: "",
      joindate: "",
      lastdate: "",
      submitted: false
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeOp1 = this.handleChangeOp1.bind(this);
    this.handleChangeOp2 = this.handleChangeOp2.bind(this);
    this.handleChangeOp3 = this.handleChangeOp3.bind(this);
  }
  handleChangeOp1 = e => {
    this.setState({ opt1: e });
  };
  handleChangeOp2 = e => {
    this.setState({ opt2: e });
  };
  handleChangeOp3 = e => {
    this.setState({ opt3: e });
  };
  componentDidMount() {
    // const { dispatch } = this.props;
    userService
      .getStationsOpt()
      // dispatch(userActions.getAllStation());
      .then(stations => {
        var arr = [];
        let stationsFromApi = stations => {
          for (const station in stations.stations) {
            console.log(station);
            console.log(stations.stations);

            arr.push({
              value: stations.stations[station]._id,
              label: stations.stations[station].name,
              code: stations.stations[station].statCode
            });
          }
          return arr;
        };

        this.setState({
          stations: [{ value: "", label: "(Select station)", code: "" }].concat(
            stationsFromApi(stations)
          )
        });
        console.log(this.state);
      });
  }

  handleChange1(e) {
    //   console.log(e)
    const { name, value } = e.target;
    // console.log(value);
    console.log(name);
    console.log(value);
    this.setState({ opt1: value }, function() {
      console.log(this.state.opt1);
      console.log("hrllloo");
    });
    console.log(this.state);
  }
  handleChange2(e) {
    //   console.log(e)
    const { name, value } = e.target;
    // console.log(value);
    console.log(name);
    console.log(value);
    this.setState({ opt2: value });
    console.log(this.state);
  }
  handleChange3(e) {
    //   console.log(e)
    const { name, value } = e.target;
    // console.log(value);
    console.log(name);
    console.log(value);
    this.setState({ opt3: value });
    console.log(this.state);
  }

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();
    console.log(this.state);
    // this.setState({ submitted: true });
    const { opt1, opt2, opt3 } = this.state;
    const { dispatch } = this.props;
    dispatch(userActions.submitStationsReq(opt1.value, opt2.value, opt3.value));
  }
  render() {
    return (
      <div className="optionMain">
        <header className="profileHeader">
          <h3 className="profileHeaderHead">Kerala Police</h3>
          <div className="profileRight">
            <button className="profileLogout" onClick={this.handleclick}>
              Logout
            </button>
          </div>
        </header>
        <div className="optionDiv1">
          <div className="optionDiv2">
            <form onSubmit={this.handleSubmit}>
              <label className="optionHead">Select Stations</label>
              <br />
              <Select
                options={this.state.stations}
                onChange={this.handleChangeOp1}
                value={this.state.opt1}
              />
              <br />
              <Select
                options={this.state.stations}
                onChange={this.handleChangeOp2}
                value={this.state.opt2}
              />
              <br/>
              <Select
                options={this.state.stations}
                onChange={this.handleChangeOp3}
                value={this.state.opt3}
              />
              <br />
              <br />

              <button className="optionButton" onSubmit={this.handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { loggingin } = state.authentication;
  const { dispatch } = state;
  //   const {isgen,isreq} = state.transfer;
  return {
    dispatch
    // isgen,
    // isreq
  };
}

export default connect(mapStateToProps)(OptionFormGen);
