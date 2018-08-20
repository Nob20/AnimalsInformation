import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAnimals } from '../actions';

class AnimalsIndex extends Component {
    // componentDidMount will be automatically called by react immediately after AnimalsIndex has shown up inside the DOM
    componentDidMount() {
        this.props.fetchAnimals(); //starts data loading process
    }    
    
    renderAnimals() {
        //map over the list of animals and generate one li for every animal thet we fetched
        // now we wre working with an object that contains a list of animals
        return _.map(this.props.animals, animal => {    // since objects do not have built in map function like arrays, here we use lodash _.map function that deals with objects
            return (
                <li className="list-group-item" key={animal.id}>
                    <Link to={`/animals/${animal.id}`}>
                        {animal.name}    

                        <button type="edit" className="btn btn-primary pull-xs-right">Edit</button>
                    </Link>    
                    
                </li>
            );
        }); 
    }
   
    render () { 
        //console.log(this.props.animals) //object containing all the animals that we fetched off the API
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/animals/new">
                        Add a new animal
                    </Link>
                </div>
                <h3>Animals</h3>
                <ul className="list-group">
                    {this.renderAnimals()}  {/*helper function*/}
                </ul>
            </div>
        );
    }
}


//to consume anything from application level state use mapStateToProps
function mapStateToProps(state) {
    return { animals: state.animals };
}

export default connect( mapStateToProps, {fetchAnimals}) (AnimalsIndex); // wires the connect helper and {fetchAnimals: fetchAnimals} becomes {fetchAnimals} in ES6