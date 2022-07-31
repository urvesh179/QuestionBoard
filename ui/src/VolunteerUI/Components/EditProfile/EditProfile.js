import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/UserAction';
import * as lactions from '../../../Actions/LandmarkAction';
import * as vactions from '../../../Actions/VolunteerAction';

import { useLandmarkDispatch, useLandmarkState } from '../../../Context/LandmarkContext';
//import { useUserState, useUserDispatch } from '../../../Context/UserContext';
import { useVolunteerDispatch, useVolunteerState } from '../../../Context/VolunteerContext';


function EditProfile(props) {

    // var { error, user } = useUserState();
    // var userDispatch = useUserDispatch();

    var { error, volunteer } = useVolunteerState();
    var volunteerDispatch = useVolunteerDispatch();

    var u = JSON.parse(localStorage.getItem('user'));
    var [id, setId] = useState(u._id);
    var [username, setUsername] = useState("");
    var [email, setEmail] = useState("");
    var [phone, setPhone] = useState("");
    var [address, setAddress] = useState("");
    var [landmark, setLandmark] = useState("");
    var [name, setName] = useState("");
    var [gender, setGender] = useState("");
    var [dob, setDob] = useState("");
    var [profession, setProfession] = useState("");
    var [skillset, setSkillset] = useState("");
    var [weekdays, setWeekdays] = useState([]);
    var [weekends, setWeekends] = useState([]);
    var [vehicle, setVehicle] = useState([]);
    var [vid, setVid] = useState(null);
    var checked = null;

    var [validation, setValidation] = useState("");

    var landmarkdispatch = useLandmarkDispatch();
    var { landmarks } = useLandmarkState();


    useEffect(async () => {
        if (u != null) {
            await vactions.getVolunteerById(volunteerDispatch, id)
        }

    }, [])

    useEffect(async () => {
        if (volunteer != null) {
            const date = new Date(volunteer.DOB);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            var d = yyyy + "-" + mm + "-" + dd

            setVid(volunteer._id);
            setUsername(volunteer.user_id.username);
            setName(volunteer.user_id.name);
            setEmail(volunteer.user_id.email);
            setAddress(volunteer.user_id.address);
            setLandmark(volunteer.user_id.landmark_id);
            setPhone(volunteer.user_id.phone_number);
            setDob(d);
            setGender(volunteer.gender);
            setProfession(volunteer.profession)
            setSkillset(volunteer.skillset);
            setWeekdays(volunteer.weekdays);
            setWeekends(volunteer.weekends);
            setVehicle(volunteer.vehicle_mode);



        }
    }, [volunteer])

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
        setVehicle([]);
        setWeekdays([]);
        setWeekends([]);
        setDob("");
        setGender("");
        setProfession("");
        setSkillset("")
        error = "";
        volunteer = "";
    }

    const vehicleChange = (e) => {

        if (e.target.checked) {
            e.target.setAttribute("checked","true");
            var arr = vehicle.concat(e.target.value);
            setVehicle(arr);
        }
        else 
        {
            e.target.removeAttribute("checked");
            var i = vehicle.indexOf(e.target.value);
            vehicle.splice(i, 1);
            setVehicle(vehicle)
        }



    }

    const weekdaysChange = (e) => {
        if (e.target.checked) {
            e.target.setAttribute("checked","true");
            var arr = weekdays.concat(e.target.value);
            setWeekdays(arr);
        }
        else 
        {
            e.target.removeAttribute("checked");
            var i = weekdays.indexOf(e.target.value);
            weekdays.splice(i, 1);
            setWeekdays(weekdays)
        }
    }

    const weekendsChange = (e) => {
        if (e.target.checked) {
            e.target.setAttribute("checked","true");
            var arr = weekends.concat(e.target.value);
            setWeekends(arr);
        }
        else 
        {
            e.target.removeAttribute("checked");
            var i = weekends.indexOf(e.target.value);
            weekends.splice(i, 1);
            setWeekends(weekends)
        }
    }

    const edit = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = {
                name,
                username,
                email,
                landmark_id: landmark,
                phone_number: phone,
                address,
                gender,
                DOB: dob,
                skillset,
                profession,
                weekdays,
                weekends,
                vehicle_mode: vehicle
            }
            // console.log(data)
            await vactions.editVolunteer(volunteerDispatch, vid, data);
            props.history.push('/volunteer/')
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
        if (!gender) {
            isValid = false;
            err["gender"] = "Select gender";
        }

        if (!dob) {
            isValid = false;
            err["dob"] = "Select DOB";
        }

        setValidation(err)
        return isValid;
    }

    return (
        <>
            {console.log(vehicle)}

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
                                    <a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> dashboard</a>
                                    <a href="/volunteer/editprofile" class="breadcrumb-item">Edit Profile</a>

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
                                        <form onReset={reset} onSubmit={edit}>

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
                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Date of Birth <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="date" name="date"
                                                        value={dob} onChange={(e) => setDob(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["dob"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-md-2">Gender</label>
                                                <div class="col-md-9">


                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-choice">

                                                            {gender == "female" ? checked = true : checked = false}
                                                            <input type="radio" checked={checked} value="female" onChange={(e) => setGender(e.target.value)}
                                                                class="form-check-input-styled" name="gender" />
                                                            <div className="validation-invalid-label">{validation["gender"]}</div>

                                                        </div>
											Female
									</div>

                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-choice">
                                                            {gender == "male" ? checked = true : checked = false}
                                                            <input type="radio" checked={checked} value="male" onChange={(e) => setGender(e.target.value)}
                                                                class="form-check-input-styled" name="gender" />
                                                        </div>
											Male
                                        	</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Profession </label>
                                                <div class="col-lg-9">
                                                    <input type="text" name="profession" value={profession} onChange={(e) => setProfession(e.target.value)}
                                                        class="form-control" placeholder="enter your Profession" aria-invalid="true" />
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Skillset </label>
                                                <div class="col-lg-9">
                                                    <input type="text" name="skillset" value={skillset} onChange={(e) => setSkillset(e.target.value)}
                                                        class="form-control" placeholder="enter your skills" aria-invalid="true" />
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-md-2">Weekdays</label>
                                                <div class="col-md-9">


                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-checker">
                                                        {weekdays.includes("morning") ? document.getElementById("weekday1").setAttribute("checked","true"):null}
                                                      <input type="checkbox" value="morning" id="weekday1" onChange={weekdaysChange}
                                                                class="form-check-input-styled" name="morning" />
                                                        </div>
											Morning
									</div>

                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-checker">
                                                        {weekdays.includes("noon") ? document.getElementById("weekday2").setAttribute("checked","true"):null}
                                                       <input type="checkbox" value="noon" id="weekday2" onChange={weekdaysChange}
                                                                class="form-check-input-styled" name="noon" />
                                                        </div>
											Noon
                                        	</div>
                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-checker">
                                                        {weekdays.includes("night") ? document.getElementById("weekday3").setAttribute("checked","true"):null}
                                                       <input type="checkbox" value="night" id="weekday3" onChange={weekdaysChange}
                                                                class="form-check-input-styled" name="night" />
                                                        </div>
                                   Night
                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-md-2">Weekends</label>
                                                <div class="col-md-9">


                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-checker">
                                                        {weekends.includes("morning") ? document.getElementById("weekend1").setAttribute("checked","true"):null}
                                                       <input type="checkbox" value="morning" id="weekend1" onChange={weekendsChange}
                                                                class="form-check-input-styled" name="morning" />
                                                        </div>
                                            Morning
                                    </div>

                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-checker">
                                                        {weekends.includes("noon") ? document.getElementById("weekend2").setAttribute("checked","true"):null}
                                                        <input type="checkbox" value="noon" id="weekend2" onChange={weekendsChange}
                                                                class="form-check-input-styled" name="noon" />
                                                        </div>
                                            Noon
                                            </div>
                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-checker">
                                                        {weekends.includes("night") ? document.getElementById("weekend3").setAttribute("checked","true"):null}
                                                           <input type="checkbox" value="night" id="weekend3" onChange={weekendsChange}
                                                                class="form-check-input-styled" name="night" />
                                                        </div>
                                    Night
                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-md-2">Vehicle mode</label>
                                                <div class="col-md-9">


                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-checker">
                                                            {vehicle.includes("two wheeler") ? document.getElementById("v1").setAttribute("checked","true"):null}
                                                            <input type="checkbox" value="two wheeler" id="v1" onChange={vehicleChange}
                                                                class="form-check-input-styled" name="two whheeler" />
                                                        </div>
											Two wheeler
									</div>

                                                    <div class="form-check form-check-inline">
                                                        <div class="uniform-checker">
                                                        {vehicle.includes("four wheeler") ? document.getElementById("v2").setAttribute("checked","true"):null}
                                                                <input type="checkbox" value="four wheeler" id="v2" onChange={vehicleChange}
                                                                class="form-check-input-styled" name="four wheeler" />
                                                        </div>
											Four wheeler
                                     </div>
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