const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const createNotification = (notification) => {
    return admin.firestore().collection('notifications').add(notification)
    .then(doc => console.log('Good:', doc))
}

exports.projectCreated = functions.firestore
    .document('projects/{projectId}')
    .onCreate(doc => {
        const project = doc.data();
        const notification = {
            content: 'Added a new project',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
    })

exports.userJoined = functions.firestore
    .document('users/{userId}')
    .onCreate(doc => {
        const newUser = doc.data();
        console.log('worked:', newUser)
        const notification = {
            content: 'New user joined',
            user: `${newUser.firstName} ${newUser.lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
    })