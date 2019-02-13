import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createContent } from '../../../store/actions/contentActions'
import firebase from 'firebase/app'

class ImageForm extends Component {
	state = {
		title: '',
		content: '',
		downloadURL: null
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleImageUpload = (e) => {
		e.preventDefault()

		const file = e.target.files[0]
		const fileExtention = _.last(file.name.split('.')).toLowerCase()

		// const storageRef = firebase.storage().ref(`/files/${file.name}`);
		// const task = storageRef.put(file);

		// task.on('state_changed', snapshot => {
		// 	let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

		// 	console.log(percentage);

		// 	this.setState({
		// 		isUploading: true,
		// 		uploadValue: percentage
		// 	})

		// }, error => {
		// 	console.log(error.message)
		// }, () => {
		// 	this.setState({
		// 		uploadValue: 100,
		// 		downloadURL: task.snapshot.downloadURL
		// 	})

		// 	this.props.createContent(this.state);

		// 	setTimeout(() => {
		// 		this.setState({
		// 			isUploading: false
		// 		})
		// 	},750)
		// })
		// console.log(this.state);
		// Uncomment this when react-redux-firebase storage reducer is working.

		console.log(fileExtention)
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.createContent(this.state)
	}

	render() {
		return (
			<form className="white" onSubmit={this.handleSubmit}>
				<h5 className="grey-text text-darken-3">Create a New Content</h5>
				<div className="input-field">
					<input type="text" id="title" onChange={this.handleChange} />
					<label htmlFor="title">Content Title</label>
				</div>
				<div className="input-field">
					<textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
					<label htmlFor="content">Content Content</label>
				</div>
				<div className="file-field input-field">
					<div className="btn">
						<span>Select Image</span>
						<input type="file" id="file" onChange={this.handleImageUpload} />
					</div>
					<div className="file-path-wrapper">
						<input className="file-path validate" type="text" />
					</div>
					<span className="helper-text red-text">Helper text</span>
				</div>
				<div className="input-field">
					<button className="btn pink lighten-1">Create</button>
				</div>
			</form>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createContent: (content) => dispatch(createContent(content))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageForm)
