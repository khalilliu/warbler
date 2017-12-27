export const userLogout = () => ({
    type:'USER_LOGOUT'
})

//user login 
export const authenticateUser = (currentUser) => ({
    type: 'AUTHENTICATE_USER',
    currentUser
})

const authRequest = (authInfo, url) => {
    return fetch(url,{
        method:"post",
        headers: new Headers({
            'Content-Type':'application/json'
        }),
        body: JSON.stringify(authInfo)
    })
    .then(response => {
        if(!response.ok){
            if(response.status >= 400 && response.status<500){
                return response.json().then(data => {
                    let err = {authErrorMessage: data.message};
                    throw err;
                })
            }else{
               let err = { authErrorMessage: "Please try again later.  Server not responding."};
               throw err;
            }
        }
        return response.json();
    })
}

export const signUp = (authInfo) => {
   return  (dispatch, getState) => (
        authRequest(authInfo,'/api/auth/signup')
        .then(currentUser => dispatch(authenticateUser(currentUser)))
    )
}

export const signIn = (authInfo) => {
   return  (dispatch, getState) => (
        authRequest(authInfo, '/api/auth/signin')
        .then(currentUser => dispatch(authenticateUser(currentUser)))
    )
}

export const addMessage = message => {
    return ({
        type: "ADD_MESSAGE",
        message
    })
}

export const postNewMessage = (text) => {
    return (dispatch) => {
        return dispatch(addMessage(text))
    }
}