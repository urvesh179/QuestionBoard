import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const totalAreawiseVolunteer = async (volunteerDispatch,id) => {
    await axios.get('/volunteer/areaWiseTotal/'+id)
        .then(async (response) => {
            //console.log(response)
            volunteerDispatch({
                type: ActionNames.TOTAL_AREAWSIE_VOLUNTEER,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const totalVolunteer = async (volunteerDispatch) => {
    await axios.get('/volunteer/total/')
        .then(async (response) => {
            volunteerDispatch({
                type: ActionNames.TOTAL_VOLUNTEER,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getVolunteerById = async (volunteerDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.get('/volunteer/getVolunteerById/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            volunteerDispatch({
                type: ActionNames.GET_VOLUNTEER,
                data: {
                    volunteer: response.data.volunteer
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};


export const editVolunteer = async (volunteerDispatch, id ,volunteer) => {
    const token = localStorage.getItem("token");
    await axios.put('/volunteer/edit/' + id, volunteer,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            volunteerDispatch({
                type: ActionNames.UPDATE_VOLUNTEER,
                data: {
                    volunteer: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};


export const getAllVolunteer = async (volunteerDispatch) => {
    const token = localStorage.getItem("token");
    await axios.get('/volunteer/getAll/', {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            volunteerDispatch({
                type: ActionNames.VOLUNTEER_LIST,
                data: {
                    volunteers: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const areaWise = async (volunteerDispatch,id) => {

    await axios.get('/volunteer/areaWise/'+id)
        .then(async (response) => {
            volunteerDispatch({
                type: ActionNames.AREAWSIE_VOLUNTEER,
                data: {
                    volunteers: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};