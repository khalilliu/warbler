import React from 'react';
import MessageList from './MessageList';
import UserAside from './UserAside';

const MessageTimeline = ({profileImageUrl,username,messages})=>{
	return(
		<div className='row'>
			<UserAside username={username} profileImageUrl={profileImageUrl}/>
			<MessageList messages={messages} />
		</div>
	)
}


export default MessageTimeline;