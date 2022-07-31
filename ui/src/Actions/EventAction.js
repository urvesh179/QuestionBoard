import * as ActionNames from '../ActionNames';
import axios from '../axios';


export const getAllEvent = async(eventDispatch) => {
    
        await axios.get('/event/getAllEvent')
        .then(async (response) => {
            eventDispatch({
                type: ActionNames.EVENT_LIST,
                data:{
                    events: response.data
                }
                
            });
        }).catch(error => {
           throw new Error(error);
        })
    
};

export const addEvent=async(event,eventDispatch)=>
{
    const token = localStorage.getItem("token");
    await axios.post('/event/addEvent', event, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            eventDispatch({
                type: ActionNames.ADD_EVENT,
                data: {
                    event: JSON.stringify(response.data)
                }
            });
        }).catch(error => {
            eventDispatch({
                type: ActionNames.ADD_EVENT_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
}


export const getEventById = async (eventDispatch,id) => {
    await axios.get('/event/getEventById/'+ id)
        .then(async (response) => {
            eventDispatch({
                type: ActionNames.GET_EVENT,
                data: {
                    event: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateEvent = async (eventDispatch, id ,event) => {
    const token = localStorage.getItem("token");
    await axios.put('/event/editEvent/' + id, event,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            eventDispatch({
                type: ActionNames.UPDATE_EVENT,
                data: {
                    event: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const removeEvent = async (eventDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/event/deleteEvent/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            eventDispatch({
                type: ActionNames.REMOVE_EVENT,
                data: {
                    event: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const totalEvent = async (eventDispatch) => {
    await axios.get('/event/total')
        .then(async (response) => {
            eventDispatch({
                type: ActionNames.TOTAL_EVENT,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};