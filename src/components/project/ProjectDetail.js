import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';

const ProjectDetail = (props) => {
    const { project } = props;
    return (
        project? 
        <div className="container section project-details">
            <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                        <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).format('lll')}</div>
                        </div>
                    </div>
            </div>
        </div>
        : 
        <div className="container center">
            <p>Loading project...</p>
        </div>
    )
    
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { projects } = state.firestore.data;    
    const project = projects
                    ? projects[id]
                    : null
    return {
        project: project
    }
    
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'projects'
    }])
)(ProjectDetail);