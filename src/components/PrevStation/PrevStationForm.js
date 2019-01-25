import React, { Component } from 'react';
import { userActions } from '../../__actions/userActions';

export default class OptionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opt1: '',
            opt2: '',
            opt3: '',
            submitted: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
		const { name,value } = e.target;
		this.setState({ [name]:value });
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
                        Select Previous Stations
                        <select
							name = "opt1" 
                            value={this.state.opt1}
                            onChange={this.handleChange}
                        >
                            <option value='Station 1'>Station 1</option>
                            <option value='Station 2'>Station 2</option>
                            <option value='Station 3'>Station 3</option>
                            <option value='Station 4'>Station 3</option>
                        </select><br/>
                        <select
							name = "opt2"
                            value={this.state.opt2}
                            onChange={this.handleChange}
                        >
                            <option value='Station 1'>Station 1</option>
                            <option value='Station 2'>Station 2</option>
                            <option value='Station 3'>Station 3</option>
                            <option value='Station 4'>Station 3</option>
                        </select><br/>
                        <select
							name = "opt3"
                            value={this.state.opt3}
                            onChange={this.handleChange}
                        >
                            <option value='Station 1'>Station 1</option>
                            <option value='Station 2'>Station 2</option>
                            <option value='Station 3'>Station 3</option>
                            <option value='Station 4'>Station 3</option>
                        </select><br/>
                    </label>
                    <input type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}
