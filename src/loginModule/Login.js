import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { LocalStorage } from 'local-storage';
import {Nonloginmenu} from '../layoutModule/Nonloginmenu';
import axios from 'axios';

export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			msg: '',
			msgClass:'',
			user: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	logChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(event) {
		let self = this;
		event.preventDefault();
		

		axios.post('/api/login', {
			username: this.state.username,
			password: this.state.password
		  })
		  .then(function (response) {
				self.state.user = response.data;
				localStorage.setItem('user', JSON.stringify(self.state.user));
				self.setState({ msg: 'success' });
				self.setState({ msgClass : ''});		
		  })
		  .catch(function (error) {	
			  console.log(error.response.data['message']);
			self.setState({ msg : error.response.data['message']});		
			self.setState({ msgClass : 'alert alert-danger'});		
				
		  });

		/*fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(function(response) {
       	if (response.status >= 400) {
					throw new Error(response.json());
				}
				return response.json();
			})
			.then(function(data) {
				self.state.user = data;
				localStorage.setItem('user', JSON.stringify(self.state.user));
				self.setState({ msg: 'success' });
			})
			.catch(function(err) {       
				self.setState({ msg: 'Invalid credentials. Please try again!' });
			});*/
	}

	render() {
		if (this.state.msg === 'success') {
			return <Redirect to="/userhome" />;
		} 
		return (
				<div>
					<Nonloginmenu></Nonloginmenu>
					<div>Please enter username and password to login</div>
					<div className={this.state.msgClass}>{this.state.msg}</div>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className="form-group row">
							<label htmlFor="username" className="col-sm-2 col-form-label">
								Username
							</label>
							<div className="col-sm-10">
								<input
									type="text"
									className="form-control"
									id="username"
									name="username"
									placeholder="username"
									onChange={(e) => this.logChange(e)}
								/>
							</div>
						</div>
		
						<div className="form-group row">
							<label htmlFor="password" className="col-sm-2 col-form-label">
								Password
							</label>
							<div className="col-sm-10">
								<input
									type="password"
									className="form-control"
									id="password"
									name="password"
									placeholder="Password"
									onChange={(e) => this.logChange(e)}
								/>
							</div>
						</div>
						<div className="form-group row">
							<div className="col-sm-10">
								<button type="submit" className="btn btn-primary">
									Login
								</button>
							</div>
						</div>
					</form>
				</div>	
			);	
		
	
		
	}
}
