import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/EventAction';

import { useEventDispatch, useEventState } from '../../../Context/EventContext';



function AddEvent(props) {

    var { error, event } = useEventState();
    var eventDispatch = useEventDispatch();
    var [title, setTitle] = useState("");
    var [date, setDate] = useState("");
    var [time, setTime] = useState("");
    var [location, setLocation] = useState("");
    var [purpose, setPurpose] = useState("");
    var [description, setDescription] = useState("");
    var [image, setImage] = useState("");
    var [validation, setValidation] = useState("");

    useEffect(() => {
        if (event != null) {
            props.history.push("/admin/eventlist")
        }
    }, [error, event])

    const reset = () => {
        setImage("");
        setTitle("");
        setDate("");
        setTime("");
        setLocation("");
        setPurpose("");
        setDescription("");
        setValidation("");
        error = "";
        event = "";
    }

    const onFileChange = (e) => {
        const imageFile = e.target.files[0];

        if (imageFile) {
            setImage(imageFile)
        }
    }

    const addevent = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = new FormData()
            data.append('banner', image)
            data.append('title', title)
            data.append('date', date)
            data.append('time', time)
            data.append('location', location)
            data.append('purpose', purpose)
            data.append('description', description)

            await actions.addEvent(data, eventDispatch);
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (!title) {
            isValid = false;
            err["title"] = "Please enter title.";
        }

        if (!date) {
            isValid = false;
            err["date"] = "Please enter date.";
        }

        if (!time) {
            isValid = false;
            err["time"] = "Please enter time.";
        }
        else if (typeof time !== "undefined") {

            var pattern = new RegExp(/^[0-9]{2}:[0-9]{2} (AM|PM)$/);
            if (!pattern.test(time)) {
                isValid = false;
                err["time"] = "Please enter valid time.(sample : 08:00 AM)";
            }
        }

        if (!location) {
            isValid = false;
            err["location"] = "Please enter location.";
        }

        if (!purpose) {
            isValid = false;
            err["purpose"] = "Please enter purpose.";
        }

        if (!description) {
            isValid = false;
            err["description"] = "Please enter description.";
        }

        if (!image) {
            isValid = false;
            err["image"] = "Please uplaod image.";
        }
        else if (typeof image !== "undefined") {
            if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
                isValid = false;
                err["image"] = "Must be an image format."
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
                                <h4><span class="font-weight-semibold">Add Event </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="/admin/addevent" class="breadcrumb-item">Add Event</a>
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
                                        <form onSubmit={addevent} onReset={reset}>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Title <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="title" name="title"
                                                        value={title} onChange={(e) => setTitle(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["title"]}</div>
                                                </div>
                                            </div>

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
                                                    <input class="form-control" type="text" name="time"
                                                        value={time} onChange={(e) => setTime(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["time"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Location <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="location"
                                                        value={location} onChange={(e) => setLocation(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["location"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Purpose <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="purpose"
                                                        value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["purpose"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Description <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <textarea rows="3" name="description" cols="3" class="form-control" placeholder="Enter Description" aria-invalid="true"
                                                        value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                                    <div className="validation-invalid-label">{validation["description"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Image<span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input type="file" class="form-control h-auto" name="image"
                                                        onChange={onFileChange} />
                                                    <div className="validation-invalid-label">{validation["image"]}</div>
                                                </div>
                                            </div>




                                            <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" style={{ borderColor: "#26a69a" }} class="btn btn-light"
                                                    >Reset<i class="icon-reset ml-2"></i></button>
                                                    <button type="submit" class="btn bg-teal-400 ml-3">Add <i class="icon-paperplane ml-2"></i></button>
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

export default withRouter(AddEvent);
