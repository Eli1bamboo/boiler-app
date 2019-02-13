import React from 'react'
import ContentSummary from './ContentSummary'
import { Link } from 'react-router-dom'

const ContentList = ({ allContent }) => {
	return (
		<div className="content-list section">
			{allContent &&
				allContent.map((content) => {
					console.log(content)
					return (
						<Link to={'/content/' + content.id} key={content.id}>
							<ContentSummary content={content} />
						</Link>
					)
				})}
		</div>
	)
}

export default ContentList
