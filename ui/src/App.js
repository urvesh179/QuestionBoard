import './App.css';
import {Route,Switch} from 'react-router-dom';
import Admin from './AdminUI/App'
import Volunteer from './VolunteerUI/App';
import Error from './Error';
import Login from './AdminUI/Components/Login/Login';
import Dashboard from './AdminUI/Components/Dashboard/Dashboard';
import UpdatePassword from './UpdatePassword';

function App() {

  return (
   <>
  
   <Switch>
     <Route path ="/admin" component = {Admin}/>
     <Route path="/volunteer" component={Volunteer}/>
     <Route path="/updatepassword/:id" exact component={UpdatePassword} />
     <Route path="/*" component={Error}/>
   </Switch>
   </>
  );
}

export default App;
