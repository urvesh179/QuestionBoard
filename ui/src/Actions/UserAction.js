import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const loginAction = async (userDispatch, user) => {
    await axios.post('/user/login', user)
        .then(async (response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            userDispatch({
                type: ActionNames.LOGIN,
                data: {
                    user: response.data.user,
                    token: response.data.token
                }
            });
        }).catch(error => {
            //console.log(error);
            userDispatch({
                type: ActionNames.LOGIN_FAILED,
                data: {
                    error: "Invalid User"
                }
            });
        })
};

export const getUserById = async (userDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.get('/user/getUserById/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            userDispatch({
                type: ActionNames.GET_USER,
                data: {
                    user: response.data.user
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateProfileAdmin = async (userDispatch, id, user) => {
    const token = localStorage.getItem("token");
    await axios.put('/user/edit/' + id, user, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            userDispatch({
                type: ActionNames.EDIT_PROFILE_ADMIN,
                data: {
                    user: response.data.user
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const changePassword = async (userDispatch, data) => {
    const token = localStorage.getItem("token");
    await axios.put('/user/changePassword', data, {
        headers: {
            authorization: 'Bearer ' + token
        }
    }).then(response => {
        userDispatch({
            type: ActionNames.CHANGE_PASSWORD,
            data: {
                message: "Successfully Changed"
            }

        });
    }).catch(error => {
        let err = "";
        if (error.message === "Request failed with status code 401") {
            err = "Not Valid Old Password"
        }
        userDispatch({
            type: ActionNames.CHANGE_PASSWORD_FAILED,
            data: {
                error: err
            }
        });
    })
};

export const forgetpassword = async (userDispatch, data) => {
    await axios.post('/user/forgetPassword', data).
        then(response => {
            userDispatch({
                type: ActionNames.FORGET_PASSWORD,
                data: {
                    message: response.data
                }

            });
        }).catch(error => {
            let err = "";
            if (error.message === "Request failed with status code 401") {
                err = "User Not Found"
            }
            userDispatch({
                type: ActionNames.FORGET_PASSWORD_FAILED,
                data: {
                    error: err
                }
            });
        });
};

export const updatePassword = async (userDispatch,id,data) => {
    await axios.post('/user/updatePassword/'+id, data).
        then(response => {
            userDispatch({
                type: ActionNames.UPDATE_PASSWORD,
                data: {
                    message: "Successfully Changed"
                }

            });
        }).catch(error => { 
            userDispatch({
                type: ActionNames.UPDATE_PASSWORD_FAILED,
                data: {
                    error: "Not Updated"
                }
            });
        });
};