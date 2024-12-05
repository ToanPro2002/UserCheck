// redux/reducers/userReducer.js
import { FETCH_USERS, SEARCH_USERS, CREATE_USER, UPDATE_USER, DELETE_USER, SET_SEARCH_FILTER } from './actionTypes';
// import { FETCH_USERS,SEARCH_USERS,CREATE_USER ,SET_SEARCH_FILTER, UPDATE_USER} from './actionTypes.js';
const initialState = {
    users: [],
    searchFilter: '',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, users: action.payload };
        case SEARCH_USERS:
            return { ...state, users: action.payload };
        case SET_SEARCH_FILTER:
            return { ...state, searchFilter: action.payload };
        case CREATE_USER:
            return { ...state, users: [...state.users, action.payload] };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) => (user.id === action.payload.id ? action.payload : user)),
            };
        case DELETE_USER:
            return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
        default:
            return state;
    }
};
