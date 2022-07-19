import axios from 'axios';
import {
    CREATE_SOURCE,
    DELETE_SOURCE,
    GET_ALL_SOURCES
} from './CONSTANTS'

export const getAllSources = async () => {
    try {
        let res = axios.get(GET_ALL_SOURCES());
        return res;
    }
    catch (err) {
        console.log('Error', err)
    }
}

export const createSource = async (payload) => {
    try {
        let res = axios.post(CREATE_SOURCE(), payload);
        return res;
    }
    catch (err) {
        console.log('Error creating new category');
    }
}

export const deleteSource = async (id) => {
    try {
        let res = axios.delete(DELETE_SOURCE(id));
        return res;
    }
    catch (err) {
        console.log('Error deleting the category');
    }
}