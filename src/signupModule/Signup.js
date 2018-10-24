import React, { Component } from 'react';

import {Nonloginmenu} from '../layoutModule/Nonloginmenu';
import axios from 'axios';


export class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			msg: '',
			msgClass:''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {}

	handleSubmit(event) {
		
		let self = this;
		event.preventDefault();
		
		axios.post('/api/signup', {
			username: this.state.username,
			password: this.state.password
		  })
		  .then(function (response) {
			console.log(response);
			self.setState({ msg: 'Thanks for registering. Click on Login to continue' });
			self.setState({ msgClass: 'alert alert-success' });
		  })
		  .catch(function (error) {			
			  console.log(error.response.data);	
			self.setState({ msg : error.response.data['message']});
			self.setState({ msgClass: 'alert alert-danger' });
		  });

		 

		/*fetch('/api/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(function(response) {
				console.log(JSON.stringify(response));
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			})
			.then(function(data) {
				console.log(data);

				self.setState({ msg: 'Thanks for registering. Click on Login to continue' });
				self.setState({ msgClass: 'alert alert-success' });
				//this.state.msg = "Thanks for registering";
			})
			.catch(function(err) {
				console.log(err);
				self.setState({ msg: 'Couldnt sign up as credentials were empty!' });
				self.setState({ msgClass: 'alert alert-danger' });

			});*/
	}

	logChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	render() {
		
		return (
			<div>
			<Nonloginmenu></Nonloginmenu>
			<div>Sign up below to log in to this app.</div>
			<div className={this.state.msgClass}>{this.state.msg}</div>
			
			<div className="container register-form">
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
									Sign up
								</button>
							</div>
						</div>
					
					
				</form>
			</div>
			</div>
		);
	}
}
