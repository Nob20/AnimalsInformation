import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAnimal, deleteAnimal } from '../actions';
import { Field, reduxForm } from 'redux-form';

class AnimalsShow extends Component {
    componentDidMount() {
        //if(!this.props.animal) {    //if is used to avoid re-fetching of posr-network performance
            const { id } = this.props.match.params;  //provided directly by react-router to match a particular id
            this.props.fetchAnimal(id, () => {   //call action creator
                this.props.history.push('/animals');
            });   
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deleteAnimal(id, () => { //call the action creator to send an AJAX request to the backend API to delete
            this.props.history.push('/animals');
        });  
    }

    render() {
        const { animal } = this.props;

        if (!animal) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/animals">Back to Main Screen</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Animal
                </button>
                <h3>{animal.name}</h3>
                <h3>Types: {animal.type}</h3>
                <h3>Countries: {animal.countries}</h3>
                <h3>Food: {animal.food}</h3>

                <button type="submit" className="btn btn-primary">Edit</button>
                     <Link to="/animals" className="btn btn-danger">Cancel</Link>
            </div>    
        );
    };
}

function mapStateToProps( { animals }, ownProps ) { //mapStateToProps(appn state, ownProps) ownProps is an arg by convention
    return { animal: animals[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchAnimal, deleteAnimal }) (AnimalsShow);
