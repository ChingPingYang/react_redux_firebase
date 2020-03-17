import React ,{ useState } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';

const CreateProject = (props) => { 
    const [project, setProject] = useState({
        title: '',
        content: '',
    })

    const handleOnchange = (e) => {
        setProject({
            ...project,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.createProject(project)
        props.history.push('/')
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create Project</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={handleOnchange} />
                </div>
                <div className="input-field">
                    <label htmlFor="content">Project Content</label>
                    <textarea id="content" className="materialize-textarea" onChange={handleOnchange}></textarea>
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0">Create</button>
                </div>
                <h2>{project.authorFirstName}</h2>
                <h2>{project.authorLastName}</h2>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project)) 
    }
}

export default connect(null, mapDispatchToProps)(CreateProject);