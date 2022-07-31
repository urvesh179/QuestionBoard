import React, { useState, useEffect } from 'react'

import * as actions from '../../../Actions/LandmarkAction';
import { Redirect, withRouter } from 'react-router-dom';
import { useLandmarkDispatch, useLandmarkState } from '../../../Context/LandmarkContext';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

function AddLandmark(props) {

    var landmarkDispatch = useLandmarkDispatch();
    var { error, landmark } = useLandmarkState();
    var [name, setName] = useState("");
    var [pincode, setPincode] = useState("");
    var [latitude, setLatitude] = useState("");
    var [longitude, setLongitude] = useState("");
    var [validation, setValidation] = useState({});

    useEffect(() => {
        if (landmark) {
             props.history.push("/admin/landmarklist");
        }
    }, [error, landmark])


    const addLandmark = async (event) => {
        event.preventDefault();
        if (await validate()) {
            let landmark = {
                name: name,
                pincode: pincode,
                latitude: latitude,
                longitude: longitude
            }
            await actions.addLandmark(landmarkDispatch, landmark);
           // resetLandmark();
        }
    }

    const resetLandmark= async() =>{
        setName("");
        setPincode("");
        setLatitude("");
        setLongitude("");
        setValidation({});
    }

    function validate() {
        let err = {};
        let isValid = true;

        if (!name) {
            isValid = false;
            err["name"] = "Please enter landmark name.";
        }

        if (!pincode) {
            isValid = false;
            err["pincode"] = "Please enter landmark pincode.";
        }
        else if (typeof pincode !== "undefined") {
            var pattern = new RegExp(/^[0-9]{6}$/);
            if (!pattern.test(pincode)) {
                isValid = false;
                err["pincode"] = "Please enter valid pincode.";
            }
        }

        if (!latitude) {
            isValid = false;
            err["latitude"] = "Please enter landmark latitude.";
        }
        else if (typeof latitude !== "undefined") {
            var pattern = new RegExp(/^[0-9.]*$/);
            if (!pattern.test(latitude)) {
                isValid = false;
                err["latitude"] = "Please enter valid latitude.";
            }
        }

        if (!longitude) {
            isValid = false;
            err["longitude"] = "Please enter landmark longitude.";
        }
        else if (typeof longitude !== "undefined") {
            var pattern = new RegExp(/^[0-9.]*$/);
            if (!pattern.test(longitude)) {
                isValid = false;
                err["longitude"] = "Please enter valid longitude.";
            }
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
                                <h4><span class="font-weight-semibold">Add Landmark </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="/admin/addlandmark" class="breadcrumb-item">Add Landmark</a>

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

                                        <form onSubmit={addLandmark} onReset={resetLandmark} >
                                            

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Name <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input type="text" name="name" className="form-control" placeholder="Enter Landmark Name"
                                                        value={name} onChange={(e) => { setName(e.target.value) }}
                                                    />
                                                    <div className="validation-invalid-label">{validation["name"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Pincode <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input type="text" name="pincode" className="form-control" placeholder="Enter Landmark Pincode"
                                                        value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
                                                    <div className="validation-invalid-label">{validation["pincode"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Latitude <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input type="text" name="latitude" className="form-control" placeholder="Enter Landmark Latitude"
                                                        value={latitude} onChange={(e) => { setLatitude(e.target.value) }} />
                                                    <div className="validation-invalid-label">{validation["latitude"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Longitude <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input type="text" name="longitude" className="form-control" placeholder="Enter Landmark Longitude"
                                                        value={longitude} onChange={(e) => { setLongitude(e.target.value) }} />
                                                    <div className="validation-invalid-label">{validation["longitude"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" style={{borderColor:"#26a69a"}} class="btn btn-light">Reset<i class="icon-reset ml-2"></i></button>
                                                    <button type="submit" class="btn bg-teal-400 ml-3">Add <i class="icon-paperplane ml-2"></i></button>
                                                    <div style={{ color: "red", fontSize: "18px",paddingTop:"5px" }}>{error}</div>
                                                    
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

export default withRouter(AddLandmark);