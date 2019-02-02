import React, { Component } from 'react';

import { connect } from 'react-redux';

import { userActions } from '../../../__actions/userActions';
// require('../../../assets/changepass/css/chngpwform.css')

class ChangePwForm extends Component {
    constructor(props) {
        super(props);
        // console.log(this.state);
        this.state = {
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
        const { password, newPassword, rePassword } = this.state;
        if (password && newPassword && rePassword) {
                // dispatch(userActions.getfirst());
        }
    }


    render() {
        const { newPassword, rePassword } = this.state;
        return (
            <div>
                <h2>Change Password </h2>
                <form name='form' onSubmit={this.handleSubmit}>

                    <div>
                        <label htmlFor='newPassword'>New Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='newPassword'
                            value={newPassword}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='rePassword'>Retype New Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='rePassword'
                            value={rePassword}
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