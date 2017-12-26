import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from './Main';
import * as actions from '../actions/index';



class App extends Component {
  constructor(props){
    super(props)
  }
  render() {  
    const {currentUser} = this.props;
    return (
      <div>
        <Navbar 
          currentUser={currentUser}
          profileImageUrl={
            currentUser&&currentUser.profileImageUrl 
            ? currentUser.profileImageUrl
            : null
          }
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
  
// })

export default withRouter(connect(mapStateToProps)(App));
