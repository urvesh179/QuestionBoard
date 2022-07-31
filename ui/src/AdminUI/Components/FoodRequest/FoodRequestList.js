import React, { useEffect } from 'react'
import config from '../../../config';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/FoodRequestAction';

import { useFoodRequestDispatch, useFoodRequestState } from '../../../Context/FoodRequestContext';
import { Redirect, withRouter } from 'react-router';


function FoodRequestList(props) {

    var { foodrequests } = useFoodRequestState();
    var foodrequestDispatch = useFoodRequestDispatch();

    useEffect(async () => {
        await actions.getAllFoodRequest(foodrequestDispatch);
    }, [])

    const edit = (id) => {
        props.history.push("/admin/editfoodrequest/" + id)
    }

    const remove = async (id) => {
        if (window.confirm('Are you sure to delete this food request ?')) {
            await actions.removeFoodRequest(foodrequestDispatch, id);
            await actions.getAllFoodRequest(foodrequestDispatch);
        }
    }

    var data = null;
    data = foodrequests.map(r => {
        const date = new Date(r.date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        
        data = (
            <tr>
                <td>{dd}-{mm}-{yyyy}</td>
                <td>{r.time}</td>
                <td>{r.plates}</td>
                <td>{r.receiver_id.name}</td>
                <td></td>
                <td class="text-center">
                    <div class="list-icons">
                        <div class="dropdown">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <a onClick={() => edit(r._id)} class="dropdown-item"><i class="icon-pencil"></i>Edit</a>
                                <a onClick={() => remove(r._id)} class="dropdown-item"><i class="icon-cross2"></i>Delete</a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

        )
        return data;
    })

    const addfoodrequest = () => {
        props.history.push("/admin/addfoodrequest");
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
                                <h4> <span class="font-weight-semibold">Food Request List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="/admin/foodrequestlist" class="breadcrumb-item">Food Request List</a>

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
                                        <h5 class="card-title"></h5>
                                        <div class="header-elements">
                                            <div class="list-icons">
                                                <button onClick={addfoodrequest} class="btn bg-teal-400 ml-3">Add <i class="icon-plus3 ml-2"></i></button>

                                            </div>
                                        </div>
                                    </div>

                                    <table class="table datatable-basic table-hover">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Date</th>
                                                <th>Plates</th>
                                                <th>Receiver</th>
                                                <th colSpan="2" class="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {data}

                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(FoodRequestList);