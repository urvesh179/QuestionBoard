import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/PortfolioAction';

import {usePortfolioDispatch,usePortfolioState} from '../../../Context/PortfolioContext';



function AddPortfolio(props) {

    var {error,portfolio}=usePortfolioState();
    var portfolioDispatch=usePortfolioDispatch();
    var[description,setDescription]=useState("");
    var[image,setImage]=useState("");
    var[validation,setValidation]=useState("");

    useEffect(()=>
    {
        if(portfolio!=null)
        {
            props.history.push("/admin/portfoliolist")
        }
    },[error,portfolio])

    const reset=()=>
    {
        setImage("");
        setDescription("");
        setValidation("");
        error="";
        portfolio="";
    }

    const onFileChange = (e) =>{
        const imageFile = e.target.files[0];
       
        if(imageFile)
        {
         setImage(imageFile)   
        }
    }

    const addportfolio= async (event) => {
        event.preventDefault();
        if(await validate())
        {
         
            const data = new FormData()
            data.append('image', image)
            data.append('description', description)

       
           await actions.addPortfolio(data,portfolioDispatch);
         
           
        }
    }

    const validate=()=> {
        let err = {};
        let isValid = true;
       
        if (!description) {
            isValid = false;
            err["description"] = "Please enter description.";
        }

        if (!image) {
            isValid = false;
            err["image"] = "Please uplaod image.";
        }
        else if (typeof image !== "undefined") {
            if (!image.name.match(/\.(jpg|jpeg|png)$/))
           {
               isValid=false;
               err["image"]="Must be an image format."
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
                                <h4><span class="font-weight-semibold">Add Portfolio </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="/admin/addportfolio" class="breadcrumb-item">Add Portfolio</a>

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
                                        <form onSubmit={addportfolio} onReset={reset}>
                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Image<span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                <input type="file" class="form-control h-auto" name="image"
                                                 onChange={onFileChange}/>
                                                <div className="validation-invalid-label">{validation["image"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Description <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <textarea rows="3" name="description" cols="3" class="form-control" placeholder="Enter Description" aria-invalid="true"
                                                    value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                                                    <div className="validation-invalid-label">{validation["description"]}</div>
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
    )
}

export default withRouter(AddPortfolio);