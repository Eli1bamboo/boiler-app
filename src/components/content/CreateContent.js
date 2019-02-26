import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createContent } from '../../store/actions/contentActions'
import { Redirect } from 'react-router-dom'
import TextForm from './forms/TextForm'
import ImageForm from './forms/ImageForm/'
import { Tabs, Tab } from 'material-ui'

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

		if (!auth.uid) return <Redirect to="/signin" />

		return (
			<div className="container">
				<div className="row">
					<div className="col s12 m1 l2" />
					<div className="col s12 m10 l8">
						<Tabs value={this.state.selectedTab} onChange={this.handleTabChange} className="form-container">
							<Tab label="TEXT" value="text">
								<TextForm />
							</Tab>
							<Tab label="IMAGE" value="image">
								<ImageForm />
							</Tab>
						</Tabs>
					</div>
					<div className="col s12 m1 l2" />
				</div>
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
