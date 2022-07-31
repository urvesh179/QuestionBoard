import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import {useReceiverDispatch,useReceiverState} from '../../../Context/ReceiverContext'
import {useReceiverCategoryDispatch,useReceiverCategoryState} from '../../../Context/ReceiverCategory';
import {useLandmarkDispatch,useLandmarkState} from '../../../Context/LandmarkContext';

import * as actions from '../../../Actions/ReceiverAction';
import * as cactions from '../../../Actions/ReceiverCategoryAction';
import * as lactions from '../../../Actions/LandmarkAction';
import { withRouter } from 'react-router';

function AddReceiver(props) {

    var receiverDispatch=useReceiverDispatch();
    var{error,receiver}=useReceiverState();
    var [name,setName]=useState("");
    var [phone,setPhone]=useState("");
    var [address,setAddress]=useState("");
    var [landmark,setLandmark]=useState("");
    var [category,setCategory]=useState("");
    var [population,setPopulation]=useState("");
    var [validation, setValidation] = useState({});

    var receiverCatDispatch=useReceiverCategoryDispatch();
    var{receivercategories}=useReceiverCategoryState();

    var landmarkdispatch=useLandmarkDispatch();
    var{landmarks}=useLandmarkState();

    useEffect(async()=>
    {
        await cactions.getAllReceiverCategory(receiverCatDispatch);
    },[])

    useEffect(async()=>
    {
        await lactions.getAllLandmark(landmarkdispatch);
    },[])

    useEffect(() => {
        if (receiver) {
             props.history.push("/volunteer/receiverlist");
        }
    }, [error, receiver])

    const reset=()=>
    {
        setName("");
        setPhone("");
        setAddress("");
        setLandmark("");
        setCategory("");
        setPopulation("");
        setValidation({});
    }

    const add = async (event) => {
        event.preventDefault();
        if (await validate()) {
            let receiver = {
                name,
                phone_number:phone,
                address,
                landmark_id:landmark,
                category_id:category,
                population,
                role:"Receiver"
            }
            await actions.addReceiver(receiverDispatch,receiver)
           
        }
    }


    function validate() {
        let err = {};
        let isValid = true;

        if (!name) {
            isValid = false;
            err["name"] = "Please enter receiver name.";
        }

        if (!phone) {
            isValid = false;
            err["phone"] = "Please enter phone number";
        }
        else if (typeof phone !== "undefined") {
            var pattern = new RegExp(/^[7-9][0-9]{9}$/);
            if (!pattern.test(phone)) {
                isValid = false;
                err["phone"] = "Please enter valid phone number.";
            }
        }

        if (!address) {
            isValid = false;
            err["address"] = "Please enter receiver address.";
        }

        if (!landmark) {
            isValid = false;
            err["landmark"] = "Please enter receiver landmark.";
        }

        if (!category) {
            isValid = false;
            err["category"] = "Please enter receiver category.";
        }
        setValidation(err)
        return isValid;
    }

    var cats=receivercategories.map(c=>
        {
            cats=(<option value={c._id}>{c.name}</option>)
            return cats;
        })

    var lands=landmarks.map(l=>
        {
            lands=(<option value={l._id}>{l.name}</option>)
            return lands;
        })

    return (
        <>
        <Header/>
            <div className="page-content" style={{ height: "100%" }} >
                <Sidebar/>
           
        <div class="content-wrapper">

        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline" style={{height:"55px"}}>
                <div class="page-title d-flex">
                    <h4><span class="font-weight-semibold">Add Receiver</span></h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
        
                
            </div>
        
            <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
                    <div class="breadcrumb">
                        <a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> dashboard</a>
                        <a href="/volunteer/addreceiver" class="breadcrumb-item">Add Receiver</a>
                        
                    </div>
        
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
        
                
            </div>
        </div>
        
        <div class="content">
        
            <div class="row" style={{marginBottom:"50px"}}>
                <div class="col-md-12">
                  
                    <div class="card">
                        <div class="card-header header-elements-inline">
                          
                        </div>
        
                        <div class="card-body">
                            <form onSubmit={add} onReset={reset}>
                            <div class="form-group row">
									<label class="col-form-label col-lg-2">Name <span class="text-danger">*</span></label>
									<div class="col-lg-9">
										<input type="text" name="name" class="form-control" 
                                        value={name} onChange={(e)=>{setName(e.target.value)}}
                                         required="" placeholder="enter your name" aria-invalid="true"/>
                                        <div className="validation-invalid-label">{validation["name"]}</div></div>
								</div>
                                 <div class="form-group row">
									<label class="col-form-label col-lg-2">Phone number <span class="text-danger">*</span></label>
									<div class="col-lg-9">
										<input type="text" name="phone number" class="form-control"
                                        value={phone} onChange={(e)=>{setPhone(e.target.value)}}
                                         required="" placeholder="enter your phone number" aria-invalid="true"/>
                                        <div className="validation-invalid-label">{validation["phone"]}</div></div>
								</div>
        
                                <div class="form-group row">
									<label class="col-form-label col-lg-2">Address <span class="text-danger">*</span></label>
									<div class="col-lg-9">
										<textarea rows="5" cols="5" name="address" class="form-control"
                                        value={address} onChange={(e)=>{setAddress(e.target.value)}}
                                         required="" placeholder="enter your address"></textarea>
                                        <div className="validation-invalid-label">{validation["address"]}</div>
                                    </div>
								</div>

                                <div class="form-group row">
									<label class="col-form-label col-lg-2">Landmark <span class="text-danger">*</span></label>
									<div class="col-lg-9">
										<select name="landmark" class="form-control" required=""
                                        value={landmark} onChange={(e)=>{setLandmark(e.target.value)}}>
											<option value="">Choose area....</option> 
											<optgroup label="Landmarks">
												{lands}
											</optgroup>
											
										</select>
                                        <div className="validation-invalid-label">{validation["landmark"]}</div>
									</div>
								</div>

                                <div class="form-group row">
									<label class="col-form-label col-lg-2">Category <span class="text-danger">*</span></label>
									<div class="col-lg-9">
										<select name="category" class="form-control" required=""
                                        value={category} onChange={(e)=>{setCategory(e.target.value)}}>
											<option value="">Choose category....</option> 
											<optgroup label="Categories">
												{cats}
											</optgroup>
											
										</select>
                                        <div className="validation-invalid-label">{validation["category"]}</div>
									</div>
								</div>

                                <div class="form-group row">
									<label class="col-form-label col-lg-2">Population <span class="text-danger">*</span></label>
									<div class="col-lg-9">
										<input type="number" name="population" class="form-control" 
                                        value={population} onChange={(e)=>{setPopulation(e.target.value)}}
                                         placeholder="enter population" aria-invalid="true"/>
                                        </div>
								</div>
                           

                                <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" style={{borderColor:"#26a69a"}} class="btn btn-light"
                                                   >Reset<i class="icon-reset ml-2"></i></button>
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
    );
}

export default   withRouter(AddReceiver);