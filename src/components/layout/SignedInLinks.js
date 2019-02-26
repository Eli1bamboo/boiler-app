import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
	return (
		<div>
			<ul className="right">
				{props.profile.isAdmin ? (
					<li>
						<NavLink to="/users">Users</NavLink>
					</li>
				) : null}
				<li>
					<NavLink to="/wall">Content Wall</NavLink>
				</li>
				<li>
					<NavLink to="/create">New Content</NavLink>
				</li>
				<li>
					<a onClick={props.signOut}>Log Out</a>
				</li>
				<li>
					<NavLink to="/" className="btn btn-floating teal">
						{props.profile.avatarUrl ? (
							<img src={props.profile.avatarUrl} alt="" className="circle responsive-img" />
						) : (
							props.profile.initials
						)}
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
