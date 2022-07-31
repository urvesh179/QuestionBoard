import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const totalDonor = async (donorDispatch,id) => {
    await axios.get('/donor/totalDonor')
        .then(async (response) => {
            donorDispatch({
                type: ActionNames.TOTAL_DONOR,
                data: {
                    total: response.data.total
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};