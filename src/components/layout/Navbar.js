import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
	const { auth, profile } = props;

	return (
		<Fragment>
			{auth.uid ? (
				<nav className="nav-wrapper grey darken-3">
					<div className="container">
						<Link to="/" className="brand-logo">
							App
						</Link>
						<SignedInLinks profile={profile} />
					</div>
				</nav>
			) : null}
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(mapStateToProps)(Navbar);
