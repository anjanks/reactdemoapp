import React, { Component } from 'react';
import { Navigationloggeduser } from '../layoutModule/Navigationloggeduser';

export class Viewtask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		};
	}

	componentDidMount() {
		let self = this;
		fetch('/api/tasks', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				self.setState({ tasks: data });
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				<Navigationloggeduser />
				<div className="row">
					<div className="col border border-success">Task Title</div>
					<div className="col border border-success">Task Description</div>
					<div className="col border border-success">Done Yet?</div>
				</div>
				{this.state.tasks.map((member) => (
					<div className="row" key={member._id}>
						<div className="col ">{member.title}</div>
						<div className="col">{member.description}</div>
						<div className="col">{member.doneyet === true ? 'Yes' : 'No'}</div>
					</div>
				))}
			</div>
		);
	}
}
