import React, { Component } from 'react';
import { Navigationloggeduser } from '../layoutModule/Navigationloggeduser';
import Modal from 'react-modal';

const customStyles = {
	content: {
		position: 'absolute',
		top: '80px',
		left: '100px',
		right: '100px',
		bottom: '100px'
	}
};

export class Modifytask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			msg: '',
			msgClass: '',
			modalIsOpen: false,
			taskTitle: '',
			taskDescription: '',
			taskDoneyet: '',
			id: ''
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.saveAndClose = this.saveAndClose.bind(this);
		//this.logChange = this.logChange.bind(this);
	}

	deleteTask(member) {
		
		let tobedeleted = false;
		if(window.confirm('Are you sure to delete this?')) {
			tobedeleted = true;
		}
	
		if(tobedeleted) {
			this.executeDeleteTask(member);
		}
		
	}

	executeDeleteTask(member){
		let self = this;
		fetch('/api/tasks/delete/' + member._id, {
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
				self.setState({ msg: 'Task was deleted successfully' });
				self.fetchData();
				self.setState({ msgClass: 'alert alert-success' });
			})
			.catch(function(err) {
				self.setState({ msg: 'There was a problem deleting/fetching data' });
				self.setState({ msgClass: 'alert alert-danger' });
			});
	}

	editTask(data) {
		let self = this;
		fetch('/api/tasks/edit/' + self.state.id, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			})
			.then(function(data) {
				self.setState({ msg: 'Task was updated successfully' });
				self.fetchData();
				self.setState({ msgClass: 'alert alert-success' });
			})
			.catch(function(err) {
				self.setState({ msg: 'There was a problem updating/fetching data' });
				self.setState({ msgClass: 'alert alert-danger' });
			});
	}
	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
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
				self.setState({ tasks: data });
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	openModal(member) {
		this.setState({
			modalIsOpen: true,
			taskTitle: member.title,
			taskDescription: member.description,
			taskDoneyet: member.doneyet === true ? 'yes' : 'no',
			id: member._id
		});
	}

	logChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	closeModal() {
		this.setState({
			modalIsOpen: false
		});
	}

	saveAndClose(event) {
		this.closeModal();
		event.preventDefault();
		var data = {
			title: this.state.taskTitle,
			description: this.state.taskDescription,
			doneyet: this.state.taskDoneyet === 'yes' ? true : false
		};
		this.editTask(data);
	}

	render() {
		return (
			<div id="modalTask">
				<div>
					<Navigationloggeduser />
					<div className={this.state.msgClass}>{this.state.msg}</div>
					<div className="row">
						<div className="col border border-success">Task Title</div>
						<div className="col border border-success">Task Description</div>
						<div className="col border border-success">Done Yet?</div>
						<div className="col border border-success">Action</div>
					</div>
					{this.state.tasks.map((member) => (
						<div className="row" key={member._id}>
							<div className="col ">{member.title}</div>
							<div className="col">{member.description}</div>
							<div className="col">{member.doneyet === true ? 'Yes' : 'No'}</div>
							<div className="col">
								<a href="javascript:void(0)" onClick={() => this.openModal(member)}>
									Edit
								</a>/
								<a href="javascript:void(0)" onClick={() => this.deleteTask(member)}>
									Delete
								</a>
							</div>
						</div>
					))}
				</div>

				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Modify Task"
				>
					<form onSubmit={this.saveAndClose}>
						<div className="form-group row">
							<label htmlFor="title" className="col-sm-2 col-form-label">
								Task Title
							</label>
							<div className="col-sm-10">
								<input
									type="text"
									className="form-control"
									id="taskTitle"
									name="taskTitle"
									value={this.state.taskTitle}
									placeholder="Task Title"
									maxLength="50"
									onChange={(e) => this.logChange(e)}
								/>
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="description" className="col-sm-2 col-form-label">
								Task Description
							</label>
							<div className="col-sm-10">
								<input
									type="text"
									className="form-control"
									id="taskDescription"
									name="taskDescription"
									value={this.state.taskDescription}
									placeholder="Task Description"
									maxLength="70"
									onChange={(e) => this.logChange(e)}
								/>
							</div>
						</div>
						<fieldset className="form-group">
							<div className="row">
								<legend className="col-form-label col-sm-2 pt-0">Done Yet?</legend>
								<div className="col-sm-10">
									<div className="form-check">
										<input
											className="form-check-input"
											type="radio"
											name="taskDoneyet"
											id="doneyetyes"
											
											value="yes"
											checked={this.state.taskDoneyet === 'yes'}
											onClick={(e) => this.logChange(e)}
										/>
										<label className="form-check-label">Yes</label>
									</div>

									<div className="form-check">
										<input
											className="form-check-input"
											type="radio"
											name="taskDoneyet"
											id="doneyetno"
											checked={this.state.taskDoneyet === 'no'}
											value="no"
											onClick={(e) => this.logChange(e)}
										/>
										<label className="form-check-label">No</label>
									</div>
								</div>
							</div>
						</fieldset>

						<div className="form-group row">
							<div className="col-sm-10">
								<button type="submit" className="btn btn-primary">
									Save Changes
								</button>{' '}
								&nbsp;&nbsp;
								<button onClick={this.closeModal} className="btn btn-primary">
									Cancel
								</button>
							</div>
						</div>
					</form>
				</Modal>
			</div>
		);
	}
}
