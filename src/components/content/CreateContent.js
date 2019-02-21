import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createContent } from '../../store/actions/contentActions'
import { Redirect } from 'react-router-dom'
import TextForm from './forms/TextForm'
import ImageForm from './forms/ImageForm/'
import Dialog from 'material-ui/Dialog'
import { CircularProgress, Tabs, Tab } from 'material-ui'

const customContentStyle = {
	width: 'auto',
	textAlign: 'center',
	maxWidth: '15%'
}

class CreateContent extends Component {
	state = {
		isUploading: false,
		uploadValue: 0,
		selectedTab: 'text'
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.id) {
			const id = nextProps.id

			this.props.history.push('/content/' + id)
		}
	}

	handleTabChange = (value) => {
		this.setState({
			selectedTab: value
		})
	}

	render() {
		const { auth } = this.props
		const { isUploading, uploadValue } = this.state

		if (!auth.uid) return <Redirect to="/signin" />
		return (
			<div className="container">
				<Tabs value={this.state.selectedTab} onChange={this.handleTabChange} className="form-container">
					<Tab label="TEXT" value="text">
						<TextForm />
					</Tab>
					<Tab label="IMAGE" value="image">
						<ImageForm />
					</Tab>
				</Tabs>

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
		auth: state.firebase.auth,
		id: state.content.id
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createContent: (content) => dispatch(createContent(content))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContent)
