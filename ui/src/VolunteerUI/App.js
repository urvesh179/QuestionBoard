import { Switch, Route, withRouter, Redirect } from 'react-router'
import { useEffect } from 'react';

import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import EditProfile from './Components/EditProfile/EditProfile';
import Logout from './Components/Logout';
import PortfolioList from './Components/Portfolio/PortfolioList';
import AddPortfolio from './Components/Portfolio/AddPortfolio';
import EditPortfolio from './Components/Portfolio/EditPortfolio';
import AddReceiver from './Components/Receiver/AddReceiver'
import EditReceiver from './Components/Receiver/EditReceiver'

import {useUserState} from '../Context/UserContext';
import ReceiverList from './Components/Receiver/ReceiverList';
import FoodRequest from './Components/FoodManagement/FoodRequest';
import FoodDonation from './Components/FoodManagement/FoodDonation';
import RedirectFood from './Components/FoodManagement/RedirectFood';
import QualityChecking from './Components/FoodManagement/QualityChecking';
import PickupDeliver from './Components/Pickup-Delivery/PickupDeliver';
import DeliveryStatus from './Components/Pickup-Delivery/DeliveryStatus';



function App(props) {

  var {token}=useUserState();
  var content = null;
  if (props.location.pathname.startsWith("/volunteer/forgetpassword")) {
    content = (<Redirect to="/volunteer/forgetpassword" />
    )
  }
 

  return (
    <>
     {token == null && content==null ? <Redirect to="/volunteer/login" /> : null}
      <Switch>
        <Route path="/volunteer/" exact component={Dashboard} />
        <Route path="/volunteer/login" exact component={Login} />
        <Route path="/volunteer/logout" exact component={Logout} />
        <Route path="/volunteer/forgetpassword" exact component={ForgetPassword} />
        <Route path="/volunteer/changepassword" exact component={ChangePassword} />
        <Route path="/volunteer/editprofile" exact component={EditProfile} />
        <Route path="/volunteer/portfoliolist" exact component={PortfolioList}/>
        <Route path="/volunteer/addportfolio" exact component={AddPortfolio} /> 
        <Route path="/volunteer/editportfolio/:id" exact component={EditPortfolio} /> 

        <Route path="/volunteer/addreceiver" exact component={AddReceiver} /> 
        <Route path="/volunteer/receiverlist" exact component={ReceiverList} /> 
        <Route path="/volunteer/editreceiver/:id" exact component={EditReceiver} /> 

        <Route path="/volunteer/foodrequestlist" exact component={FoodRequest} /> 
        <Route path="/volunteer/fooddonationlist" exact component={FoodDonation} /> 
        <Route path="/volunteer/qualitychecking" exact component={QualityChecking} /> 
        <Route path="/volunteer/redirectfood" exact component={RedirectFood} /> 

        <Route path="/volunteer/pickupdeliver" exact component={PickupDeliver} /> 
        <Route path="/volunteer/deliverystatus" exact component={DeliveryStatus} /> 
      </Switch>
     
    </>
  );
}


export default withRouter(App);