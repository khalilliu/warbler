const LOCAL_STORAGE_USER_KEY = 'warbler-user-auth-info';

//save jsonwebtoken from server
const clearCurrentUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}
const setCurrentUser = (currentUser) => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY,JSON.stringify(currentUser))
}

//get current user from localStorage
export const getCurrentUser = () => {
    Promise.resolve(JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)))
    .then((result)=>{return result}).catch((e)=>{return undefined})
}

const currentUser = (state=null, action) => {
    switch(action.type){
        case 'USER_LOGOUT':
            clearCurrentUser();
            return null;
        case "AUTHENTICATE_USER":
            setCurrentUser(action.currentUser);
            return {...action.currentUser};
        default:
            return state;
    }
}

export default currentUser;