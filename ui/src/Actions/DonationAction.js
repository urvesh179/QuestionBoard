import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const totalMoneyDonation = async (donationDispatch) => {
    await axios.get('/donation/totalMoney')
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.TOTAL_MONEY_DONATION,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const totalFoodDonation = async (donationDispatch) => {
    await axios.get('/donation/totalFood')
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.TOTAL_FOOD_DONATION,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};


export const getAllMoneyDonation = async (donationDispatch) => {
    await axios.get('/donation/getAllMoneyDonation')
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.MONEY_DONATION_LIST,
                data: {
                    moneydonation: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};


export const getAllFoodDonation = async (donationDispatch) => {
    await axios.get('/donation/getAllFoodDonation')
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.FOOD_DONATION_LIST,
                data: {
                    fooddonation: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getAllFoodDelivered = async (donationDispatch) => {
    await axios.get('/donation/getAllDeliveredFood')
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.FOOD_DELIVERY_LIST,
                data: {
                    fooddelivery: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const areaWiseFoodDonation = async (donationDispatch,id) => {
    const token = localStorage.getItem("token");
    await axios.get('/donation/areaWiseFoodDonation/' + id,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            //console.log(response)
            donationDispatch({
                type: ActionNames.AREAWSIE_FOODDONATION,
                data: {
                    areaWiseFoodDonation: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const uncheckedQuality = async (donationDispatch,id) => {
    const token = localStorage.getItem("token");
    await axios.get('/donation/uncheckedquality/' + id,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            console.log(response)
            donationDispatch({
                type: ActionNames.UNCHECKED_QUALITY,
                data: {
                    uncheckedQuality: response.data?response.data:[]
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateQuality = async (donationDispatch,id,status) => {
    const token = localStorage.getItem("token");
    await axios.put('/donation/updatequality/' + id,status,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.UPDATE_QUALITY
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const redirectFood = async (donationDispatch,id,data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    await axios.put('/donation/redirectfood/' + id,data,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            console.log(response);
            donationDispatch({
                type: ActionNames.REDIRECT_FOOD
            });
        }).catch(error => {
            throw new Error(error);
        })
};


export const goodQuality = async (donationDispatch,id) => {
    const token = localStorage.getItem("token");
    await axios.get('/donation/pickupdeliver/' + id,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            console.log(response)
            donationDispatch({
                type: ActionNames.GOOD_QUALITY,
                data: {
                    goodQuality: response.data?response.data:[]
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const addFoodDelivery = async (donationDispatch,food) => {
    const token = localStorage.getItem("token");
    await axios.post('/donation/addFoodDelivery',food,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.ADD_FOOD_DELIVERY
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getAllPendingFood = async (donationDispatch,id) => {
    await axios.get('/donation/getAllPendingFood/'+id)
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.PENDING_DELIVERY,
                data: {
                    pendingDelivery: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updatedeliverystatus = async (donationDispatch,id,status) => {
    const token = localStorage.getItem("token");
    await axios.put('/donation/updatedeliverystatus/' + id,status,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            donationDispatch({
                type: ActionNames.UPDATE_DELIVERY_STATUS
            });
        }).catch(error => {
            throw new Error(error);
        })
};