import axios from "axios";
import * as actionTypes from "./actionTypes";

export const saveUser = (first_name, last_name) => {
    return {
        type: actionTypes.SAVE_USER,
        first_name: first_name,
        last_name: last_name
    };
};
export const getUserData = (first_name, last_name) => {
    return {
        type: actionTypes.GET_USER,
        first_name: first_name,
        last_name: last_name
    };
};

export const saveData = user => {
    return dispatch => {
        const token = localStorage.getItem("token");
        const header = {
            Accept: "aplication/json",
            Authorization: `Bearer ${token}`
        };
        const data = {
            first_name: user.first_name,
            last_name: user.last_name
        };
        axios
            .put("https://api.tavanito.ir/v2/user", data, {
                headers: header
            })
            .then(response => {
                dispatch(
                    saveUser(
                        response.data.data.first_name,
                        response.data.data.last_name
                    )
                );
                localStorage.setItem(
                    "first_name",
                    response.data.data.first_name
                );
                localStorage.setItem("last_name", response.data.data.last_name);
            });
    };
};

export const getUser = () => {
    return (dispatch, getState) => {
        const token = localStorage.getItem("token");
        const mobileNo = getState().auth.mobile;

        const header = {
            Accept: "aplication/json",
            Authorization: `Bearer ${token}`
        };
        axios
            .post(
                "https://api.tavanito.ir/v2/user",
                { mobile: mobileNo },
                { headers: header }
            )
            .then(response => {
                dispatch(
                    getUserData(
                        response.data.data.first_name,
                        response.data.data.last_name
                    )
                );
                localStorage.setItem(
                    "first_name",
                    response.data.data.first_name
                );
                localStorage.setItem("last_name", response.data.data.last_name);
            });
    };
};
