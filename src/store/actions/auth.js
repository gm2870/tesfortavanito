import * as actionTypes from "./actionTypes";
import axios from "axios";
export const sendCode = (mobile, message) => {
    return {
        type: actionTypes.SEND_SMS,
        message: message,
        mobile: mobile
    };
};
export const checkCode = message => {
    return {
        type: actionTypes.SEND_SMS,
        message: message
    };
};
export const sendSMS = mobile => {
    return dispatch => {
        const header = {
            Accept: "aplication/json"
        };
        axios
            .post(
                "https://api.tavanito.ir/v2/login/otp",
                { mobile: mobile },
                {
                    headers: header
                }
            )
            .then(response => {
                dispatch(sendCode(mobile, response.data.message));
            });
    };
};
export const sendToken = token => {
    return {
        type: actionTypes.SEND_TOKEN,
        token: token
    };
};

export const postCode = code => {
    return (dispatch, getState) => {
        const header = {
            Accept: "aplication/json"
        };
        const mobileNo = getState().auth.mobile;
        axios
            .post(
                `https://api.tavanito.ir/v2/login?mobile=${mobileNo}&code=${code}`,
                { mobile: mobileNo },
                {
                    headers: header
                }
            )
            .then(response => {
                localStorage.setItem("token", response.data.access_token);
                dispatch(sendToken(response.data.access_token));
            });
    };
};
