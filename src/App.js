import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "./__helpers/history";
import { alertActions } from "./__actions/alertActions";
import { PrivateRoute } from "./components/user/Login/PrivateRoute";

import "./App.css";
import LoginPage from "./components/user/Login/LoginPage";
import OptionFormGen from "./components/user/Options/OptionFormGen";
import OptionFormReq from "./components/user/Options/OptionFormReq";
import ChangePwPage from "./components/user/ChngPass/ChangePwPage";
import ProfilePage from "./components/user/Profile/ProfilePage";
import PrevStationPage from "./components/user/PrevStation/PrevStationPage";
import AdminLoginPage from "./components/admin/Login/AdminLoginPage";
import ChangePwPageAdmin from "./components/admin/ChngPass/ChangePwPageAdmin";
import AdminPage from "./components/admin/Admin/AdminPage"
import GenPage from "./components/admin/Applications/GenPage";
import ReqPage from "./components/admin/Applications/ReqPage";
// import PrevStationPage from './components/PrevStation/PrevStationPage';

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              {/* <switch> */}
              <div>
                <Route exact path="/login" component={LoginPage} />
                <PrivateRoute exact path="/passchng" component={ChangePwPage} />
                <PrivateRoute exact path="/" component={ProfilePage} />
                <PrivateRoute
                  exact
                  path="/genoption"
                  component={OptionFormGen}
                />
                <PrivateRoute
                  exact
                  path="/reqoption"
                  component={OptionFormReq}
                />
                <PrivateRoute
                  exact
                  path="/prevstation"
                  component={PrevStationPage}
                />
                <Route exact path="/admin/login" component={AdminLoginPage} />
                <PrivateRoute
                  exact
                  path="/admin/passchng"
                  component={ChangePwPageAdmin}
                />
                <PrivateRoute exact path="/admin" component={AdminPage} />

				<PrivateRoute exact path="/admin/general" component={GenPage} />
				<PrivateRoute exact path="/admin/request" component={ReqPage} />
              </div>
              {/* </switch> */}
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
