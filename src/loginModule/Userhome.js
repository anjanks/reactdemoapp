import React, { Component } from 'react';
import { Navigationloggeduser } from '../layoutModule/Navigationloggeduser';

export class Userhome extends Component {
	componentDidMount() {
		fetch('/api/loggedin', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error(response.json());
				}
				return response.json();
			})
			.then(function(data) {
				console.log(data);
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				<Navigationloggeduser />
				<div>Welcome User</div>
			</div>
		);
	}
}
