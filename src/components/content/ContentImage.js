import React from 'react'
import Img from 'react-image'
import { CircularProgress } from 'material-ui'

function ContentImage(props) {
	const { src } = props
	return <Img src={src} loader={<CircularProgress size={70} />} />
}

export default ContentImage
