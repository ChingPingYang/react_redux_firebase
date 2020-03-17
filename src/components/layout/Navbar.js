import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignInedLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
    const { auth, profile } = props;
    return (
        <nav className="nav-wrapper grey light-1">
            <div className="container">
                <Link to='/' className="brand-logo">ProjectCreater</Link>
                {
                    auth.uid?
                    <SignedInLinks profile={profile}/>:
                    <SignedOutLinks />
                }
            </div>
        </nav>
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);