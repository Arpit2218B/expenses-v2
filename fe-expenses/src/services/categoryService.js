import axios from 'axios';
import {
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    GET_ALL_CATEGORIES
} from './CONSTANTS'

export const getAllCategories = async () => {
    try {
        let res = axios.get(GET_ALL_CATEGORIES());
        return res;
    }
    catch (err) {
        console.log('Error', err)
    }
}

export const createCategory = async (payload) => {
    try {
        let res = axios.post(CREATE_CATEGORY(), payload);
        return res;
    }
    catch (err) {
        console.log('Error creating new category');
    }
}

export const deleteCategory = async (id) => {
    try {
        let res = axios.delete(DELETE_CATEGORY(id));
        return res;
    }
    catch (err) {
        console.log('Error deleting the category');
    }
}