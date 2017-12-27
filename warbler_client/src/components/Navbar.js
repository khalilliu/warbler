import React,{Component} from 'react';
import Logo from '../images/warbler-logo.png';
import {Link} from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {currentUser,onLogout, profileImageUrl}=this.props;
        return(
            <nav className="navbar navbar-default navbar-fixed-top ">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">
                    <img src={Logo} alt='Warbler Home' />
                    <span>Warbler</span>
                  </a>
                </div>
            
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                {!currentUser ?
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/signup">Sign up</Link></li>
                    <li><Link to="/signin">Log in</Link></li>
                  </ul> :
                  <ul className="nav navbar-nav navbar-right">
                    <li><a><img src={profileImageUrl} alt='user'/></a></li>
                    <li><Link to={`/users/${currentUser.userId}/messages/new`}>New message</Link></li>
                    <li><Link to='/signin' onClick={onLogout}>Log out</Link></li>
                  </ul>
                }
                </div>
              </div>
            </nav>
        )
    }
}

export default Navbar;