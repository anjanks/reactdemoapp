import React, { Component } from 'react';
import { Navigationloggeduser } from '../layoutModule/Navigationloggeduser';

/*function appendPrevState (state, props, name) {
	console.log(state);
	console.log(props);
	if (name==='title')
		return {title : state.title + props}
	else if (name === 'description')
		return {description: state.description + props};
	else if (name === 'doneyet')
		return {doneyet: props};
  }*/

export class Addtask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			doneyet: '',
			msg: '',
			msgClass: '',
			formFieldErrorMessage: {title: '', description:'', doneyet:''},
			submitButtonDisable: true
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	resetTaskInputs() {
		this.refs.addTaskForm.reset();
	}

	componentDidMount() {}

	handleSubmit(event) {		
		event.preventDefault();
		this.validateFields();
		if (!this.state.submitButtonDisable){
			this.createTask();
		}			
	}

	enableSubmitButton() {
		if(this.state.formFieldErrorMessage['title'] !== ''
			|| this.state.formFieldErrorMessage['description'] !== ''
			|| this.state.formFieldErrorMessage['doneyet'] !== '') {
		
			 this.setState({submitButtonDisable : true});			
		 }
		 else {
		
			 this.setState({submitButtonDisable : false});	 
		 }
		
	}

	createTask() {
		let self = this;
		var data = {
			title: this.state.title,
			description: this.state.description,
			doneyet: this.state.doneyet === 'yes' ? true : false
		};
		fetch('/api/tasks/create', {
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
				self.setState({ msg: 'Task created successfully' });
				self.setState({ msgClass: 'alert alert-success' });
				self.resetTaskInputs();
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	logChange(e) {
		
		this.setState({[e.target.name]: e.target.value}, this.validateFields());
		//this.validateFields();
		
		
		
	}

	validateFields() {
		const formErrorMessage = this.state.formFieldErrorMessage;		
		let returnValue = this.validateTitle(this.state.title);
		if(returnValue !== '') {
			formErrorMessage['title'] = returnValue;			
		} else { 
			formErrorMessage['title'] = '';
		}
			
		returnValue = this.validateDescription(this.state.description);
		if(returnValue !== '') {
			formErrorMessage['description'] = returnValue;
		} else {
			formErrorMessage['description'] = '';
		}
		
		/*if ( this.state.doneyet === 'yes' ||  this.state.doneyet === 'no' ) {
			formErrorMessage['doneyet'] = '';
			
		} else {
			formErrorMessage['doneyet'] = 'Required';
		}*/
		if (document.getElementById('doneyetyes').checked || document.getElementById('doneyetno').checked){
			formErrorMessage['doneyet'] = '';
		} else
			formErrorMessage['doneyet'] = 'Required';

		
		
		this.setState({formErrorMessage : formErrorMessage});
		this.enableSubmitButton();
	}

	validateTitle(value) {
		if (!value) 
			return "Title is needed";
		if (value.length < 5) 
			return "At least 5 characters needed for title";

		return '';
	}

	validateDescription(value) {
		if (!value) 
			return "Description is needed";
		if (value.length < 5) 
			return "At least 5 characters needed for description";

		return '';
	}

	render() {
		return (
			<div>
				<Navigationloggeduser />
				<div>Enter details of the Task</div>
				<div className={this.state.msgClass}>{this.state.msg}</div>
				<form onSubmit={this.handleSubmit.bind(this)} ref="addTaskForm">
					<div className="form-group row">
						<label htmlFor="title" className="col-sm-2 col-form-label">
							* Task Title
						</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								id="title"
								name="title"
								placeholder="Task Title"
								maxLength="50"
								onChange={(e) => this.logChange(e)}
							/>
						</div>						
					</div>
					<div className="form-group row">
						&nbsp;
						<div className="col-sm-10">
							{this.state.formFieldErrorMessage['title']}
						</div>						
					</div>

					<div className="form-group row">
						<label htmlFor="description" className="col-sm-2 col-form-label">
							* Task Description
						</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								id="description"
								name="description"
								placeholder="Task Description"
								maxLength="70"
								onChange={(e) => this.logChange(e)}
							/>
						</div>
					</div>
					<div className="form-group row">
						&nbsp;
						<div className="col-sm-10">
							{this.state.formFieldErrorMessage['description']}
						</div>						
					</div>
					<fieldset className="form-group">
						<div className="row">
							<legend className="col-form-label col-sm-2 pt-0">* Done Yet?</legend>
							<div className="col-sm-10">
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="doneyet"
										id="doneyetyes"
										value="yes"
																		
										onChange={(e) => this.logChange(e)} />
									
									<label className="form-check-label">Yes</label>
								</div>

								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="doneyet"
										id="doneyetno"
										value="no"
										
										
										onChange={(e) => this.logChange(e)}
									/>
									<label className="form-check-label">No</label>
								</div>
							</div>
						</div>	
						<div className="form-group row">
						&nbsp;
						<div className="col-sm-10">
							{this.state.formFieldErrorMessage['doneyet']}
						</div>						
						</div>					
					</fieldset>
					
					<div className="form-group row">* = Required </div>
					<div className="form-group row">
						<div className="col-sm-10">
							<button type="submit" className="btn btn-primary"
							  disabled={this.state.submitButtonDisable}>
								Create Task
							</button>
						</div>
					</div>
					
				</form>
			</div>
		);
	}
}
