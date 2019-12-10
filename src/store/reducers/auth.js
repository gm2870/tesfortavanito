import * as actionTypes from "../actions/actionTypes";
const initialState = {
    token: null,
    message: null,
    mobile: null,
    smsSent: false,
    authenticated: false
};

const handleSMS = (state, action) => {
    const newState = {
        ...state,
        message: action.message,
        mobile: action.mobile,
        smsSent: true
    };
    return newState;
};
const handleCode = (state, action) => {
    const newState = {
        ...state,
        message: action.message
    };
    return newState;
};
const saveToken = (state, action) => {
    const newState = {
        ...state,
        token: action.token,
        authenticated: true
    };
    return newState;
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_SMS:
            return handleSMS(state, action);
        case actionTypes.CHECK_CODE:
            return handleCode(state, action);
        case actionTypes.SEND_TOKEN:
            return saveToken(state, action);
        default:
            return state;
    }
};

export default reducer;
