import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createContent } from '../../../store/actions/contentActions'
import { Redirect } from 'react-router-dom'

class TextForm extends Component {
	state = {
		title: '',
		content: ''
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.createContent(this.state)
	}

	render() {
		const { auth } = this.props

		if (!auth.uid) return <Redirect to="/signin" />
		return (
			<div className="container">
				<form className="white" onSubmit={this.handleSubmit}>
					<h5 className="grey-text text-darken-3">Create a New Content</h5>
					<div className="input-field">
						<input type="text" id="title" onChange={this.handleChange} />
						<label htmlFor="title">Content Title</label>
					</div>
					<div className="input-field">
						<textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
						<label htmlFor="content">Text Content</label>
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1">Create</button>
					</div>
				</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextForm)
