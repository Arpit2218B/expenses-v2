import axios from 'axios';
import {
    CREATE_SNAPSHOT,
    GET_ALL_SNAPSHOTS,
} from './CONSTANTS'

export const getAllSnapshots = async () => {
    try {
        let res = axios.get(GET_ALL_SNAPSHOTS());
        return res;
    }
    catch (err) {
        console.log('Error', err)
    }
}

export const createSnapshot = async () => {
    try {
        let res = axios.post(CREATE_SNAPSHOT());
        return res;
    }
    catch (err) {
        console.log('Error creating new snapshot');
    }
}