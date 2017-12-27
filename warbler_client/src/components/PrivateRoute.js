import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, componentProps, currentUser,...rest}) => {
return (	
	<Route {...rest} render={props => (
		currentUser 
			? <Component {...props} {...componentProps} currentUser={currentUser} />
			: <Redirect to={{ pathname: '/signin', state:{from: props.location} }}/>
		)}>
	</Route>
	)
}

export default PrivateRoute;