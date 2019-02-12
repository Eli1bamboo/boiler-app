import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {
	state = {
		title: '',
		content: '',
		file: null
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.id === 'file' ? e.target.files[0] : e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// console.log(this.state);
		this.props.createProject(this.state);
	};

	render() {
		const { auth } = this.props;
		console.log(this.state, this.props);

		if (!auth.uid) return <Redirect to="/signin" />;
		return (
			<div className="container">
				<form className="white" onSubmit={this.handleSubmit}>
					<h5 className="grey-text text-darken-3">Create a New Project</h5>
					<div className="input-field">
						<input type="text" id="title" onChange={this.handleChange} />
						<label htmlFor="title">Project Title</label>
					</div>
					<div className="input-field">
						<textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
						<label htmlFor="content">Project Content</label>
					</div>
					<div className="file-field input-field">
						<div className="btn">
							<span>File</span>
							<input type="file" id="file" onChange={this.handleChange} />
						</div>
						<div className="file-path-wrapper">
							<input className="file-path validate" type="text" />
						</div>
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1">Create</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createProject: (project) => dispatch(createProject(project))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
