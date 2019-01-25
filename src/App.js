import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './__helpers/history';
import { alertActions } from './__actions/alertActions';
import { PrivateRoute } from './components/Login/PrivateRoute';
// import { FirstTimeRoute } from './components/ChngPass/FirstTimeRoute';
import './App.css';
import LoginPage from './components/Login/LoginPage';
import OptionPage from './components/Options/OptionPage';
import ChangePwPage from './components/ChngPass/ChangePwPage';
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
		const{ alert } = this.props
        return (
            <div className='App'>
				<div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                        	<switch>
								<div>
                                    <Route exact path="/login" component={LoginPage} />
                                    {localStorage.getItem('firsttime')&&
                                    <PrivateRoute exact path="/passchng" component={ChangePwPage} /> }
                                    <PrivateRoute exact path = "/" component = {OptionPage} />      
								</div>
							</switch>
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
