import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createContent } from '../../store/actions/contentActions'
import { Redirect } from 'react-router-dom'
import TextForm from './forms/TextForm'
import ImageForm from './forms/ImageForm'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

const customContentStyle = {
	width: 'auto',
	textAlign: 'center',
	maxWidth: '15%'
}

class CreateContent extends Component {
	state = {
		isUploading: false,
		uploadValue: 0
	}

	render() {
		const { auth } = this.props
		const { isUploading, uploadValue } = this.state

		if (!auth.uid) return <Redirect to="/signin" />
		return (
			<div className="container">
				<TextForm />
				<ImageForm />

				<Dialog
					title="Uploading file:"
					modal={false}
					open={isUploading}
					contentStyle={customContentStyle}
					onRequestClose={this.handleClose}
				>
					<CircularProgress mode="determinate" value={uploadValue} />
				</Dialog>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateContent)
