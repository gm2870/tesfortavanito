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
                console.log(response);
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
export const saveUser = user => {
    return {
        type: actionTypes.SAVE_USER,
        user: user
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
                console.log(response);
                localStorage.setItem("token", response.data.access_token);
                const user = {};
                user.name = response.data.data.first_name;
                user.lastname = response.data.data.lastname;
                user.email = response.data.data.email;
                dispatch(sendToken(response.data.access_token));
            });
    };
};
// export const getUser = () => {
//     return (dispatch, getState) => {
//         const mobileNo = getState().auth.mobile;
//         const header = {
//             Accept: "aplication/json"
//         };
//         axios
//             .get(
//                 "https://api.tavanito.ir/v2/user",
//                 { mobile: mobileNo },
//                 {
//                     headers: header
//                 }
//             )
//             .then(response => {
//                 console.log(response);
//             });
//     };
// };
