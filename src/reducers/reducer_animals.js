import _ from 'lodash';
import { FETCH_ANIMALS, FETCH_ANIMAL, DELETE_ANIMAL, EDIT_ANIMAL } from '../actions';

export default function ( state = {}, action) {  // default state to object because we gonna store list of animals inside an object
    switch ( action.type ) {
    case DELETE_ANIMAL:
        return _.omit(state, action.payload);
    case FETCH_ANIMAL: 
        //const animal = action.payload.data;
        //const newState = {...state};
        //newState[post.id] = post;
        //return newState;

        //ES6
        return { ...state, [action.payload.data.id]: action.payload.data }; //...state-takes all the existing animals out of the state on=bject and put them into this new object that we are about to return
    case FETCH_ANIMALS:
        return _.mapKeys(action.payload.data, 'id'); // fetch initial list of animals, refer notes
    default:
        return state;
    }
}