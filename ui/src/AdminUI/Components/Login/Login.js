import {useEffect,useState} from 'react'
import * as actions from '../../../Actions/UserAction';
import {Redirect, withRouter} from 'react-router-dom';
import { useUserDispatch,useUserState } from '../../../Context/UserContext';

function Login(props) {

    var userDispatch=useUserDispatch();
    var {error,token}=useUserState();
    var[username,setUsername]=useState("");
    var[password,setPassword]=useState("");
    

    var path = "../assets/images/about_layout.png";
    var style = {
        backgroundImage: "url(" + path + ")",
        height: "100%",
        backgroundPosition: 'center',
        //backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }

    const login=async(event)=>
    {
        
        event.preventDefault();
        let user={
            username:username,
            password:password,
            role:"Admin"
        }
        
        await actions.loginAction(userDispatch,user);
       
    }


    return (
        <div style={style}>
            {token!=null?<Redirect to="/admin"/>:null}
            <div className="content d-flex justify-content-center align-items-center" >
                <form className="login-form" style={{ marginTop: "96px" }}
                onSubmit={login} >
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <i className="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
                                <h5 className="mb-0">Login to your account</h5>
                                <span className="d-block text-muted">Enter your credentials below</span>
                                

                                
                                <div style={{color:"red",fontSize:"18px"}}>{error}</div>

                            </div>

                            <div className="form-group form-group-feedback form-group-feedback-left">

                                <input type="text" className="form-control" placeholder="Username"
                                value={username} onChange={(e)=>{setUsername(e.target.value)}} 
                               />

                                <div className="form-control-feedback">
                                    <i className="icon-user text-muted"></i>
                                </div>
                            </div>

                            <div className="form-group form-group-feedback form-group-feedback-left">

                                <input type="password" className="form-control" placeholder="Password" 
                                value={password} onChange={(e)=>{setPassword(e.target.value)}}
                                />

                                <div className="form-control-feedback">
                                    <i className="icon-lock2 text-muted"></i>
                                </div>
                            </div>

                            <div className="text-right">
                                <a href="/admin/forgetpassword">Forgot password?</a>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </div>




                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default withRouter(Login);