import axios from 'axios';
import {
    ANALYSE_BY_CATEGORY,
    ANALYSE_BY_SOURCE,
} from './CONSTANTS'

export const analyseBySource = async (timeFrame=0) => {
    try {
        let res = axios.get(ANALYSE_BY_SOURCE(timeFrame));
        return res;
    }
    catch (err) {
        console.log('Error', err)
    }
}

export const analyseByCategory = async (timeFrame=0) => {
    try {
        let res = axios.get(ANALYSE_BY_CATEGORY(timeFrame));
        return res;
    }
    catch (err) {
        console.log('Error', err)
    }
}