import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const addReceiver = async (receiverDispatch, receiver) => {
    const token = localStorage.getItem("token");
    await axios.post('/receiver/add', receiver, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            receiverDispatch({
                type: ActionNames.ADD_RECEIVER,
                data: {
                    receiver: JSON.stringify(response.data)
                }
            });
        }).catch(error => {
            receiverDispatch({
                type: ActionNames.ADD_RECEIVER_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
};


export const getAllReceivers = async (receiverDispatch) => {
    await axios.get('/receiver/getAll')
        .then(async (response) => {
            receiverDispatch({
                type: ActionNames.RECEIVER_LIST,
                data: {
                    receivers: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const removeReceiver = async (receiverDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/receiver/delete/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            receiverDispatch({
                type: ActionNames.REMOVE_RECEIVER,
                data: {
                    receiver: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getReceiverById = async (receiverDispatch,id) => {
    await axios.get('/receiver/getById/'+id)
        .then(async (response) => {
            receiverDispatch({
                type: ActionNames.GET_RECEIVER,
                data: {
                    receiver: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateReceiver = async (receiverDispatch, id ,receiver) => {
    const token = localStorage.getItem("token");
    await axios.put('/receiver/edit/' + id, receiver,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            receiverDispatch({
                type: ActionNames.UPDATE_RECEIVER,
                data: {
                    receiver: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const totalAreawiseReceiver = async (receiverDispatch,id) => {
    await axios.get('/receiver/areaWiseTotal/'+id)
        .then(async (response) => {
            receiverDispatch({
                type: ActionNames.TOTAL_AREAWSIE_RECEIVER,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const totalReceiver = async (receiverDispatch) => {
    await axios.get('/receiver/total/')
        .then(async (response) => {
            receiverDispatch({
                type: ActionNames.TOTAL_RECEIVER,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};
