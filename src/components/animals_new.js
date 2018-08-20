import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; //reduxForm is a function and is similar to connect
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAnimal } from '../actions';

class AnimalsNew extends Component {
    renderField(field) { //pass field as an argument that contains event handler(s) to wire it up with the field component
        const {meta: { touched, error}} = field;    //destructuring - ES6
        const className = `form-group ${touched && error ? 'has-danger' : ''}`    
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input} // contains event handlers and props
                />
                    <div className="text-help">
                        {touched ? error : ''} {/*meta property is automatically added to the field object from our validate function*/}
                    </div>
            </div>
        )
    }

    //edit form
    

    onSubmit(values) {
        //this === component
        //console.log(values);
        
        this.props.createAnimal(values, () => { //Wired createAnimal action creator
            this.props.history.push('/animals'); //navigate back to /animals route
        }); 
    }

    render() {
        const { handleSubmit } = this.props;
    
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field  /*field component represents the distinct input visible to users*/
                        label="Name" // label is an arbitrary property name and it can be labelField, newname, etc.
                        name="name"
                        component={this.renderField} /* component property takes in a function that returns some JSX or another component that will be used to display the field component*/
                                                         /* helper function-renderNameField and we have not used () for the same because we are not going to call it, field will call it itself in the future*/
                     />
                     <Field 
                        label="Type"
                        name="type"
                        component={this.renderField}
                     />
                     <Field 
                        label="Countries where found the most"
                        name="countries"
                        component={this.renderField}
                     />
                     <Field 
                        label="Favourite Food"
                        name="food"
                        component={this.renderField}
                     />
                     <button type="submit" className="btn btn-primary">Submit</button>
                     <Link to="/animals" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values){  // we will pass it to the reduxForm() as a configuration option called validate
                            // validate() will be called automatically esp. whent the user tries to submit the form
                            //values is an object that contains all the values the user has entered into the form
    const errors = {};

    //validate the inputs from values
    if (!values.name) {
        errors.name = "Enter a name!";
    }

    if (!values.type) {
        errors.type = "Enter a type!";
    }

    if (!values.countries) {
        errors.countries = "Enter a countries Found!";
    }

    if (!values.food) {
        errors.food = "Enter a favouriteFood!";
    }

    // if errors is empty, the form is fine to submit
    // if errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate, //validate: validate
    form: 'AnimalsNewForm' //Important-Assign a unique string to this form property
}) (
    connect(null, { createAnimal })(AnimalsNew)  //This is for (AnimalsNew)---reduxForm accepts a single argument which is a function and this function can take some number of configuration options
); 