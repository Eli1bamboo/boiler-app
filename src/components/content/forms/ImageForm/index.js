import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createContent } from '../../../../store/actions/contentActions'
import firebase from 'firebase/app'
import { Paper, LinearProgress } from 'material-ui'

const styles = {
	progress: {
		position: 'fixed',
		width: '100%',
		top: 0,
		left: 0
	}
}

class ImageForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			content: {},
			imageFile: null,
			validationError: '',
			isUploading: false
		}

		this.imageFileInput = React.createRef()
	}

	handleChange = (e) => {
		const state = this.state

		this.setState({
			content: { ...state.content, [e.target.id]: e.target.value }
		})
	}

	handleImageInput = (e) => {
		const image = e.target.files[0]

		if (image) {
			this.setState(
				{
					imageFile: image
				},
				() => {
					this.handleImageValidation()
				}
			)
		}
	}

	handleImageValidation = () => {
		const { imageFile } = this.state
		const image = imageFile

		const validExtentions = [ 'jpg', 'jpeg', 'png' ]
		const maxWeight = 1024000
		const imageExtention = _.last(image.name.split('.')).toLowerCase()
		const imageWeight = image.size

		const isValidFileType =
			validExtentions.indexOf(imageExtention) === -1
				? (this.setState({
						validationError: 'Unsupported file type'
					}),
					false)
				: true

		const isValidWeight =
			imageWeight > maxWeight
				? (this.setState({
						validationError: 'Max file size exceedede'
					}),
					false)
				: true

		if (
			(!isValidFileType && !isValidWeight) ||
			(isValidWeight && !isValidFileType) ||
			(isValidFileType && !isValidWeight)
		) {
			return false
		} else {
			this.setState({
				validationError: null
			})

			return true
		}
	}

	handleImageUpload = () => {
		const { imageFile } = this.state
		const image = imageFile

		if (this.handleImageValidation()) {
			const storageRef = firebase.storage().ref(`/files/${image.name}`)
			const task = storageRef.put(image)
			task.on(
				'state_changed',
				(snapshot) => {
					let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100

					this.setState({
						isUploading: true,
						uploadValue: percentage
					})
				},
				(error) => {
					this.setState({
						validationError: error.message,
						isUploading: false
					})
				},
				() => {
					task.snapshot.ref.getDownloadURL().then((url) => {
						this.setState(
							{
								validationError: null,
								uploadValue: 100,
								content: { ...this.state.content, imageUrl: url }
							},
							() => {
								this.props.createContent(this.state.content)

								this.setState({
									isUploading: false
								})
							}
						)
					})
				}
			)
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.handleImageUpload()
	}

	render() {
		const { validationError, isUploading, uploadValue } = this.state

		return (
			<Paper zDepth={3} className="content-container">
				{isUploading ? <LinearProgress mode="determinate" value={uploadValue} style={styles.progress} /> : null}

				<form onSubmit={this.handleSubmit}>
					<h5 className="grey-text text-darken-3">Create a New Image</h5>
					<div className="input-field">
						<input type="text" id="title" onChange={this.handleChange} required />
						<label htmlFor="title">Image Title</label>
					</div>
					<div className="input-field">
						<textarea id="caption" className="materialize-textarea" onChange={this.handleChange} required />
						<label htmlFor="caption">Image Caption</label>
					</div>
					<div className="file-field input-field">
						<div>
							<div className="btn">
								<span>Select Image</span>
								<input
									type="file"
									id="file"
									onChange={this.handleImageInput}
									ref={this.imageFileInput}
									accept="image/jpg,image/jpeg,image/png"
									required
								/>
							</div>
							<div className="file-path-wrapper flex-1">
								<input className="file-path validate" type="text" />
							</div>
						</div>
						{validationError && validationError.length ? (
							<span className="helper-text red-text">{validationError}</span>
						) : null}
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1" disabled={isUploading ? 'disabled' : null}>
							Create
						</button>
					</div>
				</form>
			</Paper>
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
