const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS": 
            console.log('user signed in')
            return {
                ...state,
                authError: null
            }
        case "LOGIN_FAILED":
            console.log(action.err)
            return {
                ...state,
                authError: `login failed... ${action.err}`
            }
        case "SIGNOUT_SUCCESS":
            console.log('logout success!')
            return state
        case "SIGNUP_SUCCESS":
            console.log('from authReducer: ',action.respon)
            return state
        case "SIGNUP_FAILED":
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }
}

export default authReducer;