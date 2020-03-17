import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({ component: Component, restricted, auth,...rest}) => { 
    return (
        <Route 
            {...rest}
            render={(props) => {
                return auth.uid && restricted ? <Redirect to="/" /> : <Component {...props}/>
            }}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(PublicRoute);