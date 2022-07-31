import React, { Component, useEffect, useState } from 'react'
import { withRouter } from 'react-router';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import config from '../../../config'
import * as actions from '../../../Actions/FoodRequestAction';
import * as ractions from '../../../Actions/ReceiverAction';

import { useFoodRequestDispatch, useFoodRequestState } from '../../../Context/FoodRequestContext';
import { useReceiverDispatch, useReceiverState } from '../../../Context/ReceiverContext';


function EditFoodRequest(props) {

    var { error, foodrequest } = useFoodRequestState();
    var foodrequestDispatch = useFoodRequestDispatch();
    var [date, setDate] = useState("");
    var [time, setTime] = useState("");
    var [plates, setPlates] = useState(0);
    var [receiver, setReceiver] = useState("");
    var [validation, setValidation] = useState("");
    var [id, setId] = useState(props.match.params.id);

    var receiverDispatch=useReceiverDispatch();
    var{receivers}=useReceiverState();

    useEffect(async () => {
        await actions.getFoodRequestById(foodrequestDispatch, id);
    }, [])

    
    useEffect(async()=>
    {
       await ractions.getAllReceivers(receiverDispatch);
    },[])

    useEffect(async () => {
        if (foodrequest != null) {
            const date = new Date(foodrequest.date);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            var d = yyyy + "-" + mm + "-" + dd

            setDate(d)
            setTime(foodrequest.time)
            setPlates(foodrequest.plates)
            setReceiver(foodrequest.receiver_id._id)

        }
    }, [foodrequest])

    var receivers = receivers.map(r => {
        receivers = (<option value={r._id}>{r.name}</option>)
        return receivers;
    })


    const reset = () => {
        setDate("");
        setTime("");
        setPlates(0);
        setReceiver("");
        setValidation("");
        error = "";
        foodrequest = "";
    }

    const editfoodrequest = async (event) => {
        event.preventDefault();
        if (await validate()) {
            let data = {
                date,
                time,
                plates,
                receiver_id:receiver
             }
            await actions.updateFoodRequest(foodrequestDispatch, id, data);
            props.history.push('/admin/foodrequestlist')
        }
    }



    const validate = () => {
        let err = {};
        let isValid = true;

        if (!date) {
            isValid = false;
            err["date"] = "Please enter date.";
        }

        if (!time) {
            isValid = false;
            err["time"] = "Please select time.";
        }

        if (!plates) {
            isValid = false;
            err["plates"] = "Please enter plates.";
        }

        if (!receiver) {
            isValid = false;
            err["receiver"] = "Please select receiver.";
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
                                <h4><span class="font-weight-semibold">Edit Food Request </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="#" class="breadcrumb-item">Edit Food Request</a>

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
                                        <form onSubmit={editfoodrequest} onReset={reset}>
                                            <input type="hidden" name="id" value={id} />


                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Date <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="date" name="date"
                                                        value={date} onChange={(e) => setDate(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["date"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Time <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <select name="time" class="form-control" required=""
                                                        value={time} onChange={(e) => { setTime(e.target.value) }}>
                                                        <option value="">Choose Time....</option>
                                                        <optgroup label="Times">
                                                            <option value="Morning">Morning</option>
                                                            <option value="Noon">Noon</option>
                                                            <option value="Night">Night</option>\
                                                        </optgroup>

                                                    </select>
                                                    <div className="validation-invalid-label">{validation["time"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Plates <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="number" name="plates"
                                                        value={plates} onChange={(e) => setPlates(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["plates"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Receiver <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <select name="receiver" class="form-control" required=""
                                                        value={receiver} onChange={(e) => { setReceiver(e.target.value) }}>
                                                        <option value="">Choose Receiver....</option>
                                                        <optgroup label="Receivers">
                                                            {receivers}
                                                        </optgroup>

                                                    </select>
                                                    <div className="validation-invalid-label">{validation["receiver"]}</div>
                                                </div>
                                            </div>


                                            <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" style={{ borderColor: "#26a69a" }} class="btn btn-light"
                                                    >Reset<i class="icon-reset ml-2"></i></button>
                                                    <button type="submit" class="btn bg-teal-400 ml-3">Edit <i class="icon-paperplane ml-2"></i></button>
                                                    <div style={{ color: "red", fontSize: "18px", paddingTop: "5px" }}>{error}</div>

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

export default withRouter(EditFoodRequest);