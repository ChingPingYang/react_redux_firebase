import React ,{ useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';

const SignUp = (props) => {
    const [info, setInfo] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    })

    const handleOnchange = (e) => {
        setInfo({
            ...info,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.signUp(info)
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleOnchange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handleOnchange} />
                </div>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" onChange={handleOnchange} />
                </div>
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" onChange={handleOnchange} />
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0">Signup</button>
                    <div className="red-text center">
                        {
                            props.authError?
                            <p>{props.authError}</p>
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
        signUp: (newUser) => dispatch(signUp(newUser)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);