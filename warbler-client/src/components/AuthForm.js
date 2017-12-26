import React, {Component} from 'react';

class AuthForm extends Component{
    static defaultProps = {
      onAuth(){},
      
    }
    constructor(props){
        super(props);
        this.state = {
            email:'',
            username:'',
            password:'',
            profileImageUrl:''
        }
    }
    
    render(){
        const {email,username,password,profileImageUrl}=this.state;
        const {signIn,heading,buttonText,errorMessage}=this.props;
        return(
           <div className='col-sm-4 col-sm-offset-4'>
            
           </div>
        )
    }
}