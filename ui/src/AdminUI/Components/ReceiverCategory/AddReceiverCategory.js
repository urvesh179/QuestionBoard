import React,{useState,useEffect} from 'react'

import * as actions from '../../../Actions/ReceiverCategoryAction';
import { Redirect, withRouter } from 'react-router-dom';
import {useReceiverCategoryDispatch , useReceiverCategoryState } from '../../../Context/ReceiverCategory';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

function AddReceiverCategory(props) {
    var receivercategoryDispatch = useReceiverCategoryDispatch();
    var { error, receivercategory } = useReceiverCategoryState();
    var [name, setName] = useState("");
    var [validation, setValidation] = useState({});

    useEffect(() => {
        if (receivercategory) {
             props.history.push("/admin/receivercategorylist");
        }
    }, [error, receivercategory])


    const addReceiverCategory= async (event) => {
        event.preventDefault();
        if (await validate()) {
            let cat = {
                name: name
            }
            await actions.addReceiverCateogry(receivercategoryDispatch, cat);
        }
    }

    const resetReceiverCategory= async() =>{
        setName("");
        setValidation({});
    }

    function validate() {
        let err = {};
        let isValid = true;

        if (!name) {
            isValid = false;
            err["name"] = "Please enter receiver category name.";
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
                                <h4><span class="font-weight-semibold">Add Receiver Category </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="/admin/addreceivercategory" class="breadcrumb-item">Add Receiver Category</a>

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

                                        <form onSubmit={addReceiverCategory} onReset={resetReceiverCategory} >
                                            

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Name <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input type="text" name="name" className="form-control" placeholder="Enter Receiver Category Name"
                                                        value={name} onChange={(e) => { setName(e.target.value) }}
                                                    />
                                                    <div className="validation-invalid-label">{validation["name"]}</div>
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
export default withRouter(AddReceiverCategory);