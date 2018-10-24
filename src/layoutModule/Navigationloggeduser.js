import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
export class Navigationloggeduser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSuccessfullLogout: false
		};
		this.logOutUser = this.logOutUser.bind(this);
	}

	logOutUser() {
		let self = this;
		fetch('/api/logout/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			})
			.then(function(data) {
				self.setState({ isSuccessfullLogout: true });
			})
			.catch(function(err) {});
	}

	render() {
		if (this.state.isSuccessfullLogout) {
			return <Redirect to="/" />;
		}

		return (
			<nav className="nav">
				<Link className="nav-link active" to="/">
					Home
				</Link>
				<Link className="nav-link" to="/addtask">
					Add Task
				</Link>
				<Link className="nav-link" to="/viewtask">
					View Tasks
				</Link>
				<Link className="nav-link" to="/modifytask">
					Modify/Delete Task
				</Link>
				<a href="javascript:void(0)" className="nav-link" onClick={this.logOutUser}>
					Logout
				</a>
			</nav>
		);
	}
}
