import axios from 'axios';

export const FETCH_ANIMALS = 'fetch_animals'; // define type: FETCH_ANIMALS
export const FETCH_ANIMAL = 'fetch_animal';
export const CREATE_ANIMAL = 'create_animal';
export const DELETE_ANIMAL = 'delete_animal';

export const EDIT_ANIMAL = 'edit_animal';

const ROOT_URL = 'http://5b75e683deca780014eca032.mockapi.io/api/v1'


// fetch a list of animals and return to reducer
export function fetchAnimals() {
    //generate a new request using the axios library
    // and pass the particular URL we are trying to make the get request to
   
    const request = axios.get(`${ROOT_URL}/animals`);

    return {
        type: FETCH_ANIMALS,
        payload: request // assign request to the payload property of the action we are returning
    };
}

export function createAnimal(values, callback) {  //Here values contain name, type, etc.

    const request = axios.post(`${ROOT_URL}/animals`, values)
    .then(() => callback()); //promise // After the API req has been successfully completed call the callback function

    return {
        type: CREATE_ANIMAL,
        payload: request
    };
}

export function fetchAnimal(id) {

    const request = axios.get(`${ROOT_URL}/animals/${id}`)

    return {
        type: FETCH_ANIMAL,
        payload: request
    };
}

export function deleteAnimal(id, callback) {

    const request = axios.delete(`${ROOT_URL}/animals/${id}`)
        .then(() => callback());

    return {
        type: DELETE_ANIMAL,
        payload: id
    };
}

//Edit Animal
