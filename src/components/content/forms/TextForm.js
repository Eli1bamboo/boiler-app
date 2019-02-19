import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createContent } from '../../../store/actions/contentActions'
import { withRouter } from 'react-router-dom'
import { Paper } from 'material-ui'

class TextForm extends Component {
	state = {
		title: '',
		content: ''
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.id) {
			const id = nextProps.id

			this.props.history.push('/content/' + id)
		}
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
		return (
			<Paper zDepth={3} className="content-container">
				<form onSubmit={this.handleSubmit}>
					<h5 className="grey-text text-darken-3">Create a New Text</h5>
					<div className="input-field">
						<input type="text" id="title" onChange={this.handleChange} required />
						<label htmlFor="title">Content Title</label>
					</div>
					<div className="input-field">
						<textarea id="content" className="materialize-textarea" onChange={this.handleChange} required />
						<label htmlFor="content">Text Content</label>
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1">Create</button>
					</div>
				</form>
			</Paper>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextForm))
