import React from 'react'
import moment from 'moment'

const ContentSummary = ({content}) => {
  return (
    <div className="card z-depth-0 content-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{content.title}</span>
        <p>Posted by {content.authorName}</p>
        <p className="grey-text">{moment(content.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default ContentSummary
