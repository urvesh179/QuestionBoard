import { Switch, Route, withRouter, Redirect } from 'react-router'

import { useUserState } from '../Context/UserContext';

import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import VolunteerList from "./Components/Volunteer/VolunteerList";
import EditProfile from './Components/EditProfile/EditProfile';
import AddPortfolio from './Components/Portfolio/AddPortfolio';
import PortfolioList from './Components/Portfolio/PortfolioList';
import AddLandmark from './Components/Landmark/AddLandmark';
import LandmarkList from './Components/Landmark/LandmarkList';
import EditLandmark from './Components/Landmark/EditLandmark';
import AddReceiverCategory from './Components/ReceiverCategory/AddReceiverCategory';
import ReceiverCategoryList from './Components/ReceiverCategory/ReceiverCategoryList';
import EditReceiverCategory from './Components/ReceiverCategory/EditReceiverCategory';
import EditPortfolio from './Components/Portfolio/EditPortfolio';
import AddEvent from './Components/Event/AddEvent';
import EventList from './Components/Event/EventList';
import EditEvent from './Components/Event/EditEvent';
import AddFoodRequest from './Components/FoodRequest/AddFoodRequest';
import FoodRequestList from './Components/FoodRequest/FoodRequestList';
import EditFoodRequest from './Components/FoodRequest/EditFoodRequest';
import MoneyDonationList from './Components/Donation/MoneyDonationList';
import FoodDonationList from './Components/Donation/FoodDonationList';
import FoodDeliveryList from './Components/Donation/FoodDeliveryList';
import LandmarkManagerList from './Components/Volunteer/LandmarkManagerList';


function App(props) {

  var { token } = useUserState();

  var content = null;
  console.log(props.location.pathname)
  if (props.location.pathname.startsWith("/admin/forgetpassword")) {
    content = (<Redirect to="/admin/forgetpassword" />
    )
  }

  return (
    <>
      {token == null && content == null ? <Redirect to="/admin/login" /> : null}

      <Switch>
        <Route path="/admin/landmarkmanagerlist" exact component={LandmarkManagerList}/>
        <Route path="/admin/fooddeliverylist" exact component={FoodDeliveryList} />
        <Route path="/admin/fooddonationlist" exact component={FoodDonationList} />
        <Route path="/admin/moneydonationlist" exact component={MoneyDonationList} />
        <Route path="/admin/addfoodrequest" exact component={AddFoodRequest} />
        <Route path="/admin/foodrequestlist" exact component={FoodRequestList} />
        <Route path="/admin/editfoodrequest/:id" exact component={EditFoodRequest} />
        <Route path="/admin/addevent" exact component={AddEvent} />
        <Route path="/admin/eventlist" exact component={EventList} />
        <Route path="/admin/editevent/:id" exact component={EditEvent} />
        <Route path="/admin/addreceivercategory" exact component={AddReceiverCategory} />
        <Route path="/admin/receivercategorylist" exact component={ReceiverCategoryList} />
        <Route path="/admin/editreceivercategory/:id" exact component={EditReceiverCategory} />
        <Route path="/admin/addportfolio" exact component={AddPortfolio} />
        <Route path="/admin/portfoliolist" exact component={PortfolioList} />
        <Route path="/admin/editportfolio/:id" exact component={EditPortfolio} />
        <Route path="/admin/addlandmark" exact component={AddLandmark} />
        <Route path="/admin/landmarklist" exact component={LandmarkList} />
        <Route path="/admin/editlandmark/:id" exact component={EditLandmark} />
        <Route path="/admin/portfoliolist" exact component={PortfolioList} />
        <Route path="/admin/addportfolio" exact component={AddPortfolio} />
        <Route path="/admin/editprofile" exact component={EditProfile} />
        <Route path="/admin/volunteerlist" exact component={VolunteerList} />
        <Route path="/admin/changepassword" exact component={ChangePassword} />
        <Route path="/admin/forgetpassword" exact component={ForgetPassword} />
        <Route path="/admin/login" exact component={Login} />
        <Route path="/admin/logout" exact component={Logout} />
        <Route path="/admin/" exact component={Dashboard} />
      </Switch>
    </>
  );
}


export default withRouter(App);