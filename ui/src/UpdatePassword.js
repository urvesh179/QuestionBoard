import React, { useState, useEffect } from 'react'

import * as actions from './Actions/UserAction';

import { useUserState, useUserDispatch } from './Context/UserContext';

function UpdatePassword(props) {
    var { error, message } = useUserState();
    var userDispatch = useUserDispatch();

    var [id, setId] = useState(props.match.params.id);
    var [newpass, setNewpass] = useState("");
    var [conpass, setConpass] = useState("");
    var [validation, setValidation] = useState("");

    const updatepassword = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = {
                newpass
            }
            await actions.updatePassword(userDispatch, id, data);
            reset()
        }
    }

    
    const reset = () => {
        setNewpass("");
        setConpass("");
        setValidation("");
        error = "";
        message = "";
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (!newpass) {
            isValid = false;
            err["newpass"] = "Please enter new password.";
        }

        if (!conpass) {
            isValid = false;
            err["conpass"] = "Please enter confirm password.";
        }

        if (newpass != conpass) {
            isValid = false;
            err["conpass"] = "New Password And Confirm Password Must be Same";
        }

        setValidation(err)
        return isValid;
    }
    var path = "../../assets/images/about_layout.png";
    var style = {
        backgroundImage: "url(" + path + ")",
        height: "100%",
        backgroundPosition: 'center',
        //backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }


    return (
        <div style={style}>
            <div className="content d-flex justify-content-center align-items-center" >
                <form className="login-form" style={{ marginTop: "96px" }}
                    onSubmit={updatepassword}>
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <i className="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
                                <h5 className="mb-0">Update Password</h5>
                            </div>
                            <div style={{ color: "red", fontSize: "14px", paddingTop: "5px", textAlign: "center" }}>{error}</div>
                            <div style={{ color: "green", fontSize: "14px", paddingTop: "5px", textAlign: "center" }}>{message}</div>


                            <div className="form-group form-group-feedback form-group-feedback-left">

                                <input type="password" className="form-control" placeholder="New Password"
                                    value={newpass} onChange={(e) => { setNewpass(e.target.value) }}
                                />

                                <div className="form-control-feedback">
                                    <i className="icon-lock2 text-muted"></i>
                                </div>
                                <div className="validation-invalid-label">{validation["newpass"]}</div>

                            </div>

                            <div className="form-group form-group-feedback form-group-feedback-left">

                                <input type="password" className="form-control" placeholder="Confirm Password"
                                    value={conpass} onChange={(e) => { setConpass(e.target.value) }}
                                />

                                <div className="form-control-feedback">
                                    <i className="icon-lock2 text-muted"></i>
                                </div>
                                <div className="validation-invalid-label">{validation["conpass"]}</div>

                            </div>
                            <div className="text-right">
                                <a href="/">Back to login</a>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Set New Password</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default UpdatePassword;