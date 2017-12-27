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

export const addMessage = (message) => {
    return ({
        type: "ADD_MESSAGE",
        message
    })
}

export const postNewMessage = (text) => {
    return (dispatch, getState) => {
        let {currentUser} = getState();
        if(!currentUser){return Promise.resolve();}
        const {userId,token} = currentUser;

        const url = `/api/users/${userId}/messages`;
        return fetch(url,{
            method:'post',
            headers:new Headers({
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }),
            body:JSON.stringify({text})
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
        .then(m => {

            let message = {
                id: m._id,
                createdAt : m.createdAt,
                text: m.text,
                username: m.userId.username,
                profileImageUrl: m.userId.profileImageUrl
            }
            return dispatch(addMessage(message))
        })
    }
}

export const loadMessages = (messages) => ({
    type:"LOAD_MESSAGES",
    messages
})

export const fetchMessages = () => {
   return (dispatch) => (
        fetch(`/api/messages`)
        .then(data => data.json())
        .then(m => {
            let messages= m.map(m => {
                return {
                    id:m._id,
                    createdAt:m.createdAt,
                    text:m.text,
                    username:m.userId.username,
                    profileImageUrl:m.userId.profileImageUrl
                }
            });
            return dispatch(loadMessages(messages));
        })
    )
}