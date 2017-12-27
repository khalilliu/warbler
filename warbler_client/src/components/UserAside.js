import React from 'react';
import './UserAside.css'

const UserAside = ({profileImageUrl, username}) => {
	return (
		<aside className='col-sm-4' id="home-side">
			<div className='panel panel-default'>
				<div className='panel-body'>
					<img src={profileImageUrl} alt={username} id="profile-image"/>
					<div className='row text-center'>
						<h2>{username}</h2>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default UserAside;