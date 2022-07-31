import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/UserAction';

import { useUserState, useUserDispatch } from '../../../Context/UserContext';

function ChangePassword(props) {
    var { error, message } = useUserState();
    var userDispatch = useUserDispatch();

    var [oldpass, setOldpass] = useState("");
    var [newpass, setNewpass] = useState("");
    var [conpass, setConpass] = useState("");
    var [validation, setValidation] = useState("");

    const reset = () => {
        setOldpass("");
        setNewpass("");
        setConpass("");
        setValidation("");
        error = "";
        message = "";
    }

    useEffect(async () => {
        if(message == "Successfully Changed")
        {
            props.history.push('/admin/')
        }
    },[message]) 
    

    const changepassword = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = {
                oldpass,
                newpass
            }
            await actions.changePassword(userDispatch, data);
            reset()
           
            
            
           
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (!oldpass) {
            isValid = false;
            err["oldpass"] = "Please enter old password.";
        }

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



    return (
        <>
            <Header />
            <div className="page-content" style={{ height: "100%" }} >
                <Sidebar />
                <div class="content-wrapper">

                    <div class="page-header page-header-light">
                        <div class="page-header-content header-elements-md-inline" style={{ height: "55px" }}>
                            <div class="page-title d-flex">
                                <h4> <span class="font-weight-semibold">Change Password </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="/admin/changepassword" class="breadcrumb-item">Change Password</a>

                                </div>

                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>
                    </div>

                    <div class="content">

                        <div class="row">
                            <div class="col-md-12">

                                <div class="card">
                                    <div class="card-header header-elements-inline">

                                    </div>

                                    <div class="card-body">
                                        <div style={{ color: "red", fontSize: "18px", paddingTop: "5px" , textAlign: "center" }}>{error}</div>
                                        <div style={{ color: "green", fontSize: "18px", paddingTop: "5px" , textAlign: "center" }}>{message}</div>

                                        <form onSubmit={changepassword} onReset={reset}>
                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Old password <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="password" name="oldpass"
                                                        value={oldpass} onChange={(e) => setOldpass(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["oldpass"]}</div>
                                                </div>
                                            </div>


                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">New Password <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="password" name="newpass"
                                                        value={newpass} onChange={(e) => setNewpass(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["newpass"]}</div> </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Repeat password <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="password" name="conpass"
                                                        value={conpass} onChange={(e) => setConpass(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["conpass"]}</div> </div>
                                            </div>


                                            <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" class="btn btn-light">Reset</button>
                                                    <button type="submit" class="btn bg-teal-400 ml-3">Change <i class="icon-paperplane ml-2"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ChangePassword;