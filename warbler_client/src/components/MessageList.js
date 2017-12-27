import React,{Component} from 'react';
import MessageItem from './MessageItem';

const MessageList = ({messages}) =>{
	let messageList = messages.map(message => {
		return (
			<MessageItem 
				key={message.id}
				date={message.createdAt}
				username={message.username}
				text={message.text}
				profileImageUrl={message.profileImageUrl}
			/>
		)
	})
	return(
		<div className='col-sm-8'>
			<ul className='list-group'>
				{messageList}
			</ul>
		</div>
	)
}


MessageList.defaultProps = {
	messages : []
}

export default MessageList