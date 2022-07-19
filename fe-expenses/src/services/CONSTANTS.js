const BASE_URL = 'http://localhost:3000';

const createEndpoint = (url) => `${BASE_URL}/${url}`;

export const GET_ALL_CATEGORIES = () => createEndpoint('categories');
export const CREATE_CATEGORY = () => createEndpoint('categories');
export const DELETE_CATEGORY = (id) => createEndpoint(`categories/${id}`);

export const GET_ALL_SOURCES = () => createEndpoint('sources');
export const CREATE_SOURCE = () => createEndpoint('sources');
export const DELETE_SOURCE = (id) => createEndpoint(`sources/${id}`);

export const GET_ALL_TRANSACTIONS = (filterString) => createEndpoint(`expenses?${filterString}`);
export const CREATE_TRANSACTION = () => createEndpoint('expenses');

export const GET_ALL_SNAPSHOTS = (filterString) => createEndpoint(`snapshots`);
export const CREATE_SNAPSHOT = () => createEndpoint('snapshots');

export const ANALYSE_BY_SOURCE = (timeFrame) => createEndpoint(`analyse/source?timeFrame=${timeFrame}`);
export const ANALYSE_BY_CATEGORY = (timeFrame) => createEndpoint(`analyse/category?timeFrame=${timeFrame}`);