import React, { useState, useEffect } from 'react'

import * as actions from '../../../Actions/UserAction';

import { useUserState, useUserDispatch } from '../../../Context/UserContext';

function ForgetPassword() {

    var { error, message } = useUserState();
    var userDispatch = useUserDispatch();

    var [email, setEmail] = useState("");
    var [validation, setValidation] = useState("");

    const forgetpassword = async (event) => {
        event.preventDefault();
        if (await validate()) {
            var data={
                email
            }
            await actions.forgetpassword(userDispatch, data);
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (!email) {
            isValid = false;
            err["email"] = "Please enter email.";
        }
        else if (typeof email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                isValid = false;
                err["email"] = "Please enter valid email address.";
            }
        }
        setValidation(err)
        return isValid;
    }
    var path = "../assets/images/about_layout.png";
    var style = {
        backgroundImage: "url(" + path + ")",
        height: "100%",
        backgroundPosition: 'center',
        //backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
    return (
        <div style={style}>
            <div className="content d-flex justify-content-center align-items-center">

                <form className="login-form" onSubmit={forgetpassword} style={{ marginTop: "120px" }}>

                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <i className="icon-spinner11 icon-2x text-warning border-warning border-3 rounded-round p-3 mb-3 mt-1"></i>
                                <h5 className="mb-0">Forget Password</h5>
                                <span className="d-block text-muted">We'll send you instructions in email</span>
                            </div>
                            <div style={{ color: "red", fontSize: "14px", paddingTop: "5px", textAlign: "center" }}>{error}</div>
                            <div style={{ color: "green", fontSize: "14px", paddingTop: "5px", textAlign: "center" }}>{message}</div>

                            <div className="form-group form-group-feedback form-group-feedback-right">
                                <input class="form-control" type="text" name="email"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="validation-invalid-label">{validation["email"]}</div>
                                <div className="form-control-feedback">
                                    <i className="icon-mail5 text-muted"></i>
                                </div>
                            </div>

                            <div className="text-right">
                                <a href="/admin/login">Back to login</a>
                            </div>

                            <button type="submit" className="btn bg-blue btn-block"><i className="icon-spinner11 mr-2"></i> Forget password</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default ForgetPassword;