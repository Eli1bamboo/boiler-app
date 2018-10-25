import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const UserList = ({ users }) => {
	return (
		<div className="section">
			<ul className="collection">
				{users &&
					users.map((user) => {
						console.log(user);
						return (
							<li className="collection-item avatar" key={user.id}>
								<img src={user.avatarUrl} alt="" className="circle" />
								<span className="title">{user.displayName}</span>
								<p>
									{user.providerData[0].email}
									<br />
									Last login at: {moment(user.lastLoginAt.toDate()).calendar()}
								</p>
								<Link to={'/user/' + user.id} className="secondary-content">
									<i className="material-icons">settings</i>
								</Link>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default UserList;
