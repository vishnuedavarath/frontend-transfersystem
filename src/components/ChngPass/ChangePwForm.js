import React, { Component } from 'react';

import { connect } from 'react-redux';

import { userActions } from '../../__actions/userActions';
require('../../assets/changepass/css/chngpwform.css')

class ChangePwForm extends Component {
    constructor(props) {
        super(props);
        // console.log(this.state);
        this.state = {
            password: '',
            newPassword: '',
            rePassword: '',
            submitted: false,
        };
        // console.log(this.state);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { password, newpassword, repassword } = this.state;
        const { dispatch } = this.props;
        if (password && newpassword && repassword) {
                dispatch(userActions.passchng(newpassword));
                // dispatch(userActions.getfirst());
        }
    }


    render() {
        const { password, newpassword, repassword } = this.state;
        return (
            <div>
                <h2>Change Password </h2>
                <form name='form' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='password'>Current Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='password'
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='newpassword'>New Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='newpassword'
                            value={newpassword}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='repassword'>Retype New Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='repassword'
                            value={repassword}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingin } = state.authentication;
    return {
        loggingin,
    };
}

export default connect(mapStateToProps)(ChangePwForm);
