import * as ActionNames from '../ActionNames';
import axios from '../axios';



export const addLandmarkManager = async (landmarkmanagerDispatch, landmarkmanager) => {
    const token = localStorage.getItem("token");
    await axios.post('/volunteer/addLandmarkManager', landmarkmanager, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            landmarkmanagerDispatch({
                type: ActionNames.ADD_LANDMARK_MANAGER,
                data: {
                    landmarkmanager: JSON.stringify(response.data)
                }
            });
        }).catch(error => {
            landmarkmanagerDispatch({
                type: ActionNames.ADD_LANDMARK_MANAGER_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
};


export const getLandmarkManagerByVolunteer = async (landmarkmanagerDispatch, id) => {
    await axios.get('volunteer/getLandmarkManagerByVolunteer/' + id)
        .then(async (response) => {
            landmarkmanagerDispatch({
                type: ActionNames.GET_LANDMARK_MANAGER_BY_VOLUNTEER,
                data: {
                    lanadmarkmanager: response.data
                }
            });

        }).catch(error => {
            throw new Error(error);
        })
};

export const getAllLandmarkManager = async (landmarkmanagerDispatch) => {
    await axios.get('/volunteer/getAllLandmarkManager')
        .then(async (response) => {
            landmarkmanagerDispatch({
                type: ActionNames.LANDMARK_MANAGER_LIST,
                data: {
                    landmarkmanagers: response.data
                }
            });

        }).catch(error => {
            throw new Error(error);
        })
};

export const removeLandmarkManager = async (landmarkmanagerDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/volunteer/deleteLandmarkManager/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            landmarkmanagerDispatch({
                type: ActionNames.REMOVE_LANDMARK_MANAGER,
                data: {
                    landmarkmanager: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};