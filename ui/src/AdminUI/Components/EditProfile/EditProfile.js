import React, { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/UserAction';
import * as lactions from '../../../Actions/LandmarkAction';

import { useLandmarkDispatch, useLandmarkState } from '../../../Context/LandmarkContext';
import { useUserState, useUserDispatch } from '../../../Context/UserContext';

function EditProfile(props) {
    var { error, user } = useUserState();
    var userDispatch = useUserDispatch();

	var u = JSON.parse(localStorage.getItem('user'));
    var [id, setId] = useState(u._id);
    var [username, setUsername] = useState("");
    var [email, setEmail] = useState("");
    var [phone, setPhone] = useState("");
    var [address, setAddress] = useState("");
    var [landmark, setLandmark] = useState("");
    var [name, setName] = useState("");
    var [validation, setValidation] = useState("");

    var landmarkdispatch = useLandmarkDispatch();
    var { landmarks } = useLandmarkState();


    useEffect(async () => {
        await actions.getUserById(userDispatch, id);
    }, [])

    useEffect(async () => {
        if (user != null) {
            setUsername(user.username);
            setName(user.name);
            setEmail(user.email);
            setAddress(user.address);
            setLandmark(user.landmark_id._id);
            setPhone(user.phone_number);
        }
    }, [user])

    useEffect(async () => {
        await lactions.getAllLandmark(landmarkdispatch);
    }, [])

    var lands = landmarks.map(l => {
        lands = (<option value={l._id}>{l.name}</option>)
        return lands;
    })

    const reset = () => {
        setUsername("");
        setName("");
        setEmail("");
        setAddress("");
        setLandmark("");
        setPhone("");
        setValidation("");
        error = "";
        user = "";
    }

    const edituser = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = {
                name,
                username,
                email,
                landmark_id: landmark,
                phone_number: phone,
                address
            }
            await actions.updateProfileAdmin(userDispatch, id, data);
            props.history.push('/admin/')
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (!username) {
            isValid = false;
            err["username"] = "Please enter username.";
        }
        if (!name) {
            isValid = false;
            err["name"] = "Please enter name.";
        }
        if (!phone) {
            isValid = false;
            err["phone"] = "Please enter phone number.";
        }
        if (!address) {
            isValid = false;
            err["address"] = "Please enter address.";
        }
        if (!landmark) {
            isValid = false;
            err["landmark"] = "Select any landmark.";
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
                                <h4><span class="font-weight-semibold">Edit Profile </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="/admin/editprofile" class="breadcrumb-item">Edit Profile</a>

                                </div>

                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>
                    </div>

                    <div class="content">

                        <div class="row" style={{ marginBottom: "50px" }}>
                            <div class="col-md-12">

                                <div class="card">
                                    <div class="card-header header-elements-inline">

                                    </div>

                                    <div class="card-body">
                                        <form onSubmit={edituser} onReset={reset}>
                                            <input type="hidden" name="id" value={id} />

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Name <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="name"
                                                        value={name} onChange={(e) => setName(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["name"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Username <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="username"
                                                        value={username} onChange={(e) => setUsername(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["username"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Email <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="email"
                                                        readOnly value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["email"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Phone Number <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="phone"
                                                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["phone"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Address <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <textarea rows="3" name="address" cols="3" class="form-control" placeholder="Enter Address" aria-invalid="true"
                                                        value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                                    <div className="validation-invalid-label">{validation["address"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Landmark <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <select name="landmark" class="form-control" required=""
                                                        value={landmark} onChange={(e) => { setLandmark(e.target.value) }}>
                                                        <option value="">Choose area....</option>
                                                        <optgroup label="Landmarks">
                                                            {lands}
                                                        </optgroup>
                                                    </select>
                                                    <div className="validation-invalid-label">{validation["landmark"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" class="btn btn-light">Reset</button>
                                                    <button type="submit" class="btn bg-teal-400 ml-3">Edit <i class="icon-paperplane ml-2"></i></button>
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
    );
}

export default EditProfile;