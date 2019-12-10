import * as actionTypes from "../actions/actionTypes";
const initialState = {
    user: {},
    authRedirectPath: null
};
const saveUser = (state, action) => {
    const newState = {
        ...state,
        authRedirectPath: "/dashboard",
        user: {
            ...state.user,
            first_name: action.first_name,
            last_name: action.last_name
        }
    };
    return newState;
};
const getUser = (state, action) => {
    const newState = {
        ...state,
        authRedirectPath: null,
        user: {
            ...state.user,
            first_name: action.first_name,
            last_name: action.last_name
        }
    };
    return newState;
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_USER:
            return saveUser(state, action);
        case actionTypes.GET_USER:
            return getUser(state, action);
        default:
            return state;
    }
};

export default reducer;
