import axios from 'axios';
import {
    GET_ALL_TRANSACTIONS,
    CREATE_TRANSACTION, 
} from './CONSTANTS'

export const getAllTransactions = async (startDate, endDate, source, category) => {
    let filterArray = [];
    if(startDate) filterArray.push(`startDate=${startDate}`)
    if(endDate) filterArray.push(`endDate=${endDate}`)
    if(source) filterArray.push(`source=${source}`)
    if(category) filterArray.push(`category=${category}`)
    let filterString = filterArray.join('&');
    try {
        let res = axios.get(GET_ALL_TRANSACTIONS(filterString));
        return res;
    }
    catch (err) {
        console.log('Error', err)
    }
}

export const createTransaction = async (payload) => {
    try {
        let res = axios.post(CREATE_TRANSACTION(), payload);
        return res;
    }
    catch (err) {
        console.log('Error creating new transaction');
    }
}

// export const deleteCategory = async (id) => {
//     try {
//         let res = axios.delete(DELETE_CATEGORY(id));
//         return res;
//     }
//     catch (err) {
//         console.log('Error deleting the category');
//     }
// }