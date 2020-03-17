import React ,{ useState } from 'react';
import { signIn } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const SignIn = (props) => {
    const [info, setInfo] = useState({
        email: '',
        password: ''
    })
    const { authError } = props

    const handleOnchange = (e) => {
        setInfo({
            ...info,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn(info)
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Log In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleOnchange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handleOnchange} />
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0">Login</button>
                    <div className="red-text center">
                        {
                            authError?
                            <p>{authError}</p>
                            : null
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);