import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createContent } from '../../../../store/actions/contentActions'
import firebase from 'firebase/app'

const styles = {
	uploadButton: {
		marginLeft: 12,
		Zindex: 9999
	}
}

class ImageForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			content: {},
			isValidFormat: null
		}

		// create a ref to store the textInput DOM element
		this.image = React.createRef()
	}

	handleChange = (e) => {
		const state = this.state

		this.setState({
			content: { ...state.content, [e.target.id]: e.target.value }
		})
	}

	handleImageValidation = () => {
		const image = this.image.current.files[0]
		const validExtentions = [ 'jpg', 'png' ]
		const maxWeight = 1000
		const imageExtention = _.last(image.name.split('.')).toLowerCase()

		if (this.image) {
			console.log(imageExtention)
			return true
		}
	}

	handleImageUpload = (e) => {
		e.preventDefault()

		// const image = e.target.files[0]

		console.log(this.handleImageValidation())

		// console.log(this.handleImageValidation(image))

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
				<div className="flex-field">
					<div className="file-field flex-1 input-field">
						<div className="flex-content">
							<div className="btn">
								<span>Select Image</span>
								<input type="file" id="file" ref={this.image} />
							</div>
							<div className="file-path-wrapper flex-1">
								<input className="file-path validate" type="text" />
							</div>
						</div>
						<span className="helper-text red-text">Helper text</span>
					</div>
					<button className="btn pink lighten-1" style={styles.uploadButton} onClick={this.handleImageUpload}>
						Upload
					</button>
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
