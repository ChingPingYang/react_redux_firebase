import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import { reduxFirestore, createFirestoreInstance, getFirestore} from 'redux-firestore';
import firebase, { firebaseConfig } from './config/firebase';

const composeEnhancers = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

const store = createStore(rootReducer ,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore})),
        reduxFirestore(firebase, firebaseConfig),
    )
);

const rrfProps = {
    firebase,
    config: firebaseConfig,
    config: {
        useFirestoreForProfile: true,
        userProfile: 'users'
    },
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

const AuthIsLoaded = (props) => {
    const auth = useSelector(state => state.firebase.auth);
    if(!isLoaded(auth)) {
        return <div>Loading Screen...</div>
    } 
    return props.children   
}



ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>, 
    document.getElementById('root')
);



