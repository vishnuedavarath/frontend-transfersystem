import React, { Component } from "react";
import { userActions } from "../../__actions/userActions";
import { connect } from "react-redux";

class PrevStationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      opt1: "",
      opt2: "",
      opt3: "",
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAllStation());
    const toState = (data) => {
      let stationsFromApi = data.map(station => {
        return { value: station._id, display: station.name };
      });
      this.setState({
        stations: [
          { value: "", display: "(Select your Previous station)" }
        ].concat(stationsFromApi)
      });
    };
    toState(this.data.stations);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { opt1, opt2, opt3 } = this.state;
    const { dispatch } = this.props;
    if (opt1 && opt2 && opt3) {
      dispatch(userActions.submitStations(opt1, opt2, opt3));
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Fill the Options
            <select
              name="opt1"
              value={this.state.opt1}
              onChange={this.handleChange}
            >
              {this.state.stations.map(station => (
                <option key={station.value} value={station.value}>
                  {station.display}
                </option>
              ))}
            </select>
            <select
              name="opt2"
              value={this.state.opt2}
              onChange={this.handleChange}
            >
              {this.state.stations.map(station => (
                <option key={station.value} value={station.value}>
                  {station.display}
                </option>
              ))}
            </select>
            <select
              name="opt3"
              value={this.state.opt3}
              onChange={this.handleChange}
            >
              {this.state.stations.map(station => (
                <option key={station.value} value={station.value}>
                  {station.display}
                </option>
              ))}
            </select>
          </label>
          <input
            type="submit"
            value={this.state.opt1}
            onSubmit={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { loggingin } = state.authentication;
  const { dispatch } = state;
  return {
    dispatch
  };
}
export default connect(mapStateToProps)(PrevStationForm);
