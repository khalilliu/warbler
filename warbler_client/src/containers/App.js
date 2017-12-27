import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from './Main';
import * as actions from '../actions/index';
import {bindActionCreators} from 'redux';


class App extends Component {
  constructor(props){
    super(props)
  }
  render() {  
    const {currentUser, onLogout} = this.props;
    return (
      <div>
        <Navbar 
          currentUser={currentUser}
          profileImageUrl={
            currentUser && currentUser.profileImageUrl 
            ? currentUser.profileImageUrl
            : null
          }
          onLogout={onLogout}
        />
        <Main />
      </div>
    );
  }
}

const mapStateToProps=(state) => ({
  currentUser: state.currentUser
})

// const mapDispatchToProps= (dispatch) => ({
//   onLogout(){ dispatch(actions.userLogout() ) }
// })

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({onLogout: actions.userLogout},dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
