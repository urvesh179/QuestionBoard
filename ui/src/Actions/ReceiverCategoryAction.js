import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const addReceiverCateogry = async (receivercategoryDispatch, receivercategory) => {
    const token = localStorage.getItem("token");
    await axios.post('/receiverCategory/add', receivercategory, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            receivercategoryDispatch({
                type: ActionNames.ADD_RECEIVER_CATEGORY,
                data: {
                    receivercategory: JSON.stringify(response.data)
                }
            });
        }).catch(error => {
            receivercategoryDispatch({
                type: ActionNames.ADD_RECEIVER_CATEGORY_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
};


export const getAllReceiverCategory = async (receivercategoryDispatch) => {
    await axios.get('/receiverCategory/getAll')
        .then(async (response) => {
            receivercategoryDispatch({
                type: ActionNames.RECEIVER_CATEGORY_LIST,
                data: {
                    receivercategories: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getReceiverCategoryById = async (receivercategoryDispatch,id) => {
    await axios.get('/receivercategory/getById/'+id)
        .then(async (response) => {
            receivercategoryDispatch({
                type: ActionNames.GET_RECEIVER_CATEGORY,
                data: {
                    receivercategory: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const removeReceiverCategory = async (receivercategoryDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/receivercategory/delete/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            receivercategoryDispatch({
                type: ActionNames.REMOVE_RECEIVER_CATEGORY,
                data: {
                    receivercategory: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateReceiverCategory = async (receivercategoryDispatch, id ,receivercategory) => {
    const token = localStorage.getItem("token");
    await axios.put('/receivercategory/edit/' + id, receivercategory,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            receivercategoryDispatch({
                type: ActionNames.UPDATE_RECEIVER_CATEGORY,
                data: {
                    receivercategory: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};