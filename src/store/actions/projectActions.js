
export const createProject = (project) => {
    return async(dispatch, getState, {getFirebase, getFirestore}) => {
        console.log('middleware:', project)
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        try {
            await firestore.collection('projects').add({
                ...project,
                authorFirstName: profile.firstName,
                authorLastName: profile.lastName,
                authorId: authorId,
                createdAt: new Date()
            })
            return dispatch({type: 'CREATE_PROJECT', project})
        } catch(err) {
            return dispatch({type: 'CREATE_PROJECT_ERROR', err})
        }
    }
}

