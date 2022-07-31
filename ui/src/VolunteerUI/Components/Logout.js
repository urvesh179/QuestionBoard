import React from 'react';
import { Redirect } from 'react-router';

import * as action from '../../ActionNames';
import {useUserDispatch} from '../../Context/UserContext';

function Logout(props) {
    var userDispatch=useUserDispatch();
    localStorage.removeItem("user")
    localStorage.removeItem("token");
    userDispatch({type:action.LOGOUT});
    var redirect=( <Redirect to="/volunteer/login"/>)

    return (
        <div>
        {redirect}
        </div>
    );
}

export default Logout;