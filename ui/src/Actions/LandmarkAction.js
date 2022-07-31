import * as ActionNames from '../ActionNames';
import axios from '../axios';



export const addLandmark = async (landmarkDispatch, landmark) => {
    const token = localStorage.getItem("token");
    await axios.post('/landmark/add', landmark, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            landmarkDispatch({
                type: ActionNames.ADD_LANDMARK,
                data: {
                    landmark: JSON.stringify(response.data)
                }
            });
        }).catch(error => {
            landmarkDispatch({
                type: ActionNames.ADD_LANDMARK_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
};


export const getAllLandmark = async (landmarkDispatch) => {
    await axios.get('/landmark/getAll')
        .then(async (response) => {
            landmarkDispatch({
                type: ActionNames.LANDMARK_LIST,
                data: {
                    landmarks: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getLandmarkById = async (landmarkDispatch,id) => {
    await axios.get('/landmark/getById/'+id)
        .then(async (response) => {
            landmarkDispatch({
                type: ActionNames.GET_LANDMARK,
                data: {
                    landmark: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const removeLandmark = async (landmarkDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/landmark/delete/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            landmarkDispatch({
                type: ActionNames.REMOVE_LANDMARK,
                data: {
                    landmark: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateLandmark = async (landmarkDispatch, id ,landmark) => {
    const token = localStorage.getItem("token");
    await axios.put('/landmark/edit/' + id, landmark,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            landmarkDispatch({
                type: ActionNames.UPDATE_LANDMARK,
                data: {
                    landmark: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};