import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const getAllFoodRequest = async(foodrequestDispatch) => {
    
        await axios.get('/donation/getAllFoodRequest')
        .then(async (response) => {
            foodrequestDispatch({
                type: ActionNames.FOOD_REQUEST_LIST,
                data:{
                    foodrequests: response.data
                }
                
            });
        }).catch(error => {
           throw new Error(error);
        })
    
};

export const addFoodRequest=async(foodrequest,foodrequestDispatch)=>
{
    const token = localStorage.getItem("token");
    await axios.post('/donation/addFoodRequest', foodrequest, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            foodrequestDispatch({
                type: ActionNames.ADD_FOOD_REQUEST,
                data: {
                    foodrequest: response.data
                }
            });
        }).catch(error => {
            foodrequestDispatch({
                type: ActionNames.ADD_FOOD_REQUEST_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
}


export const getFoodRequestById = async (foodrequestDispatch,id) => {
    await axios.get('/donation/getFoodRequestById/'+ id)
        .then(async (response) => {
            foodrequestDispatch({
                type: ActionNames.GET_FOOD_REQUEST,
                data: {
                    foodrequest: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateFoodRequest = async (foodrequestDispatch, id ,foodrequest) => {
    const token = localStorage.getItem("token");
    await axios.put('/donation/editFoodRequest/' + id, foodrequest,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            foodrequestDispatch({
                type: ActionNames.UPDATE_FOOD_REQUEST,
                data: {
                    foodrequest: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const removeFoodRequest = async (foodrequestDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/donation/deleteFoodRequest/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            foodrequestDispatch({
                type: ActionNames.REMOVE_FOOD_REQUEST,
                data: {
                    foodrequest: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};


export const totalAreawiseFoodRequest = async (foodrequestDispatch,id) => {
    await axios.get('/donation/areaWiseTotalRequest/'+id)
        .then(async (response) => {
            
            foodrequestDispatch({
                type: ActionNames.TOTAL_AREAWSIE_FOODREQUEST,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const areaWiseFoodRequest = async (foodrequestDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.get('/donation/areaWiseRequest/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            foodrequestDispatch({
                type: ActionNames.AREAWSIE_FOODREQUEST,
                data: {
                    areaWiseFoodRequest: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

