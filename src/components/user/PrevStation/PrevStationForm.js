import React, { Component } from "react";
import { userActions } from "../../../__actions/userActions";
import { connect } from "react-redux";
import { userService } from "../../../__services/userService";
import "../../../assets/prevstations/css/prevstation.css";
// import moment from "moment";
class PrevStationForm extends Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // const { dispatch } = this.props;
    userService
      .getStations()
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

  handleChange(e) {
    //   console.log(e)
    const { name, value } = e.target;
    // console.log(value);
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();

    this.setState({ submitted: true });
    const { cur, opt1, opt2, opt3, joindate, lastdate } = this.state;
    const { dispatch } = this.props;
    dispatch(
      userActions.submitPrevStations(cur, opt1, opt2, opt3, joindate, lastdate)
    );
  }
  render() {
    return (
      <div className="prevDiv1">
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
        <div className = "prevContent">
          <div className="prevDiv2">
            <h2 className="prevH">Edit Details</h2>
            <form className="prevForm" onSubmit={this.handleSubmit}>
              <label>
                Select Previous Stations
                <br />
                <select
                  name="opt1"
                  value={this.state.opt1}
                  onChange={this.handleChange}
                >
                  {this.state.stations.map(station => (
                    <option key={station.code} value={station.value}>
                      {station.display}
                    </option>
                  ))}
                </select>
                <br />
                <select
                  name="opt2"
                  value={this.state.opt2}
                  onChange={this.handleChange}
                >
                  {this.state.stations.map(station => (
                    <option key={station.code} value={station.value}>
                      {station.display}
                    </option>
                  ))}
                </select>
                <br />
                <select
                  name="opt3"
                  value={this.state.opt3}
                  onChange={this.handleChange}
                >
                  {this.state.stations.map(station => (
                    <option key={station.code} value={station.value}>
                      {station.display}
                    </option>
                  ))}
                </select>
                <br />
                Enter Current Station
                <br />
                <select
                  name="cur"
                  value={this.state.cur}
                  onChange={this.handleChange}
                >
                  {this.state.stations.map(station => (
                    <option key={station.code} value={station.value}>
                      {station.display}
                    </option>
                  ))}
                </select>
                <br />
              </label>
              <label>
                Joining Date(YYYY-MM-DD):
                <input
                  type="text"
                  name="joindate"
                  value={this.state.joindate}
                  placeholder="YYYY-MM-DD"
                  onChange={this.handleChange}
                  className="prevInput"
                />
              </label>
              <br />
              <label>
                Last Transfer Date(YYYY-MM-DD):
                <input
                  type="text"
                  name="lastdate"
                  value={this.state.lastdate}
                  placeholder="YYYY-MM-DD"
                  onChange={this.handleChange}
                  className="prevInput"
                />
              </label>
              <br />

              <button onSubmit={this.handleSubmit} className="prevButton">
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

export default connect(mapStateToProps)(PrevStationForm);
