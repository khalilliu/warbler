import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Switch, Route, withRouter  } from 'react-router-dom';
import * as actions from '../actions/index';
import AuthForm from '../components/AuthForm';
import PrivateRoute from '../components/PrivateRoute';
import MessageForm from '../components/MessageForm';

//import PrivateRoute from '../components/PrivateRoute';



class Main extends Component {
  constructor(props){
      super(props);
      this.handleNewMessage = this.handleNewMessage.bind(this);
    }
  
  handleNewMessage(text){
    const {newMessage, history} = this.props;
    newMessage(text).then(()=>{
      history.push('/')
    })
  }

  render() {  
      const {
          currentUser,
          authErrorMessage,
          handleSignIn,
          handleSignUp,
          history
      } = this.props;
    return (
      <div className='container'>
        <Switch>
            <Route exac path='/signin' render={(props)=>{
            return(
                <AuthForm
                    signIn={true}
                    heading={'Welcome back'}
                    buttonText={"Log in"}
                    onAuth={(authInfo)=>{console.log(handleSignIn);handleSignIn(authInfo).then(()=>history.push('/'))}}
                    //onAuth={(authInfo)=>{handleSignIn(authInfo).then(()=>history.push('/'))}}
                    errorMessage={authErrorMessage}
                    {...props}
                />)
            }}/>
            <Route exac path='/signup' render={(props)=>{
            return(
                <AuthForm
                    signIn={false}
                    heading={'Join Warbler today.'}
                    buttonText={"Sign me up!"}
                    onAuth={(authInfo)=>{console.log(handleSignUp);handleSignUp(authInfo).then(()=>history.push('/'))}}
                    errorMessage={authErrorMessage}
                    {...props}
                
                />)
            }}/>
            <PrivateRoute
              path={`/users/:id/messages/new`}
              currentUser={currentUser}
              component={MessageForm} 
              componentProps={{onSubmit:this.handleNewMessage}}
            />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    messages:state.messages,
    errorMessage: state.errorMessage
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleSignIn(authData) { return dispatch(actions.signIn(authData)); },
    handleSignUp(authData) { return dispatch(actions.signUp(authData)); },
    newMessage(text){return dispatch(actions.postNewMessage(text))}
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
