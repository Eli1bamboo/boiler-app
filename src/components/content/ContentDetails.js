import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ContentDetails = (props) => {
  const { content, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (content) {
    return (
      <div className="container section content-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{content.title}</span>
            <p>{content.content}</p>s
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {content.authorName}</div>
            <div>{moment(content.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading content...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const allContent = state.firestore.data.content;
  const content = allContent ? allContent[id] : null
  return {
    content: content,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'content'
  }])
)(ContentDetails)
