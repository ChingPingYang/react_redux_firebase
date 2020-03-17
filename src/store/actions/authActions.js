
export const signIn = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(
                credentials.email,
                credentials.password
            )
            return dispatch({type: 'LOGIN_SUCCESS'})
        } catch(err) {
            return dispatch({type: "LOGIN_FAILED", err})
        }
    }
}

export const signOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        try {
            await firebase.auth().signOut();
            return dispatch({type: "SIGNOUT_SUCCESS"})
        } catch(err) {
            return dispatch({type: "SIGNOUT_FAILED", err})
        }
    }
}

export const signUp = (newUser) => {
    return async(dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            //create user in firebase
            const respon = await firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            )
            //get the uid and save other info to firestore
            await firestore.collection('users').doc(respon.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
            return dispatch({type: "SIGNUP_SUCCESS"})
        } catch(err) {
            return dispatch({type: "SIGNUP_FAILED", err})
        }
    }
}