import React, { Component } from "react";
import { userActions } from "../../../__actions/userActions";
import { connect } from "react-redux";
import { userService } from "../../../__services/userService";
// import moment from "moment";
class OptionFormGen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [{ value: "", display: "(Select Station)" }],
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
  }
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
              display: stations.stations[station].name,
              code: stations.stations[station].statCode
            });
          }
          return arr;
        };

        this.setState({
          stations: [
            { value: "", display: "(Select station)", code: "" }
          ].concat(stationsFromApi(stations))
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
    this.setState({opt1: value}, function () {
      console.log(this.state.opt1);
      console.log('hrllloo')
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
    this.setState({ opt3 : value });
    console.log(this.state);
  }

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();
    console.log(this.state);
    // this.setState({ submitted: true });
    const {opt1, opt2, opt3} = this.state;
    const { dispatch } = this.props;
    dispatch(userActions.submitStationsReq(opt1, opt2, opt3));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select Previous Stations
            <br />
            <select
              name="opt1"
              value={this.state.opt1}
              onChange={this.handleChange1}
            >
              {this.state.stations.map(station => (
                <option key={station.value} value={station.code}>
                  {station.display}
                </option>
              ))}
            </select>
            <br />
            <select
              name="opt2"
              value={this.state.opt2}
              onChange={this.handleChange2}
            >
              {this.state.stations.map(station => (
                <option key={station.value} value={station.code}>
                  {station.display}
                </option>
              ))}
            </select>
            <br />
            <select
              name="opt3"
              value={this.state.opt3}
              onChange={this.handleChange3}
            >
              {this.state.stations.map(station => (
                <option key={station.value} value={station.code}>
                  {station.display}
                </option>
              ))}
            </select>
            <br />
            <br />
          </label>

          <button onSubmit={this.handleSubmit}>Submit</button>
        </form>
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
