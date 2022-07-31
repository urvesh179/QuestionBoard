import React, { useEffect, useState } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/LandmarkManagerAction';
import { useLandmarkManagerDispatch, useLandmarkManagerState } from '../../../Context/LandmarkManagerContext';


function LandmarkManagerList(props) {

    var landmarkmanagerDispatch = useLandmarkManagerDispatch();
    var { landmarkmanagers } = useLandmarkManagerState();

    useEffect(async () => {
        await actions.getAllLandmarkManager(landmarkmanagerDispatch);
    }, [])

    var result;
    result = landmarkmanagers.map((l) => {
        result = (
            <tr>
                <td>{l.volunteer_id.user_id.name}</td>
                <td>{l.landmark_id.name}</td>
                
                <td class="text-center">
                    <div class="list-icons">
                        <div class="dropdown">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <a onClick={() => remove(l._id)} class="dropdown-item"><i class="icon-cross2"></i>Remove</a>
                            </div>
                        </div>
                    </div>
                </td>
                <td></td><td></td><td></td>
            </tr>

        )
        return result;
    })

    const remove = async (id) => {
        if (window.confirm('Are you sure to Remove this Landmark Manager ?')) {
            await actions.removeLandmarkManager(landmarkmanagerDispatch, id);
            await actions.getAllLandmarkManager(landmarkmanagerDispatch);
        }
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
                                <h4> <span class="font-weight-semibold">Landmark Manager List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="/admin/landmarkmanagerlist" class="breadcrumb-item">Landmark Manager List</a>

                                </div>

                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>
                    </div>

                    <div class="content">

                        <div class="row" style={{ marginBottom: "50px" }}>
                            <div class="col-md-12">
                                <div class="card" >

                                    <table class="table datatable-basic table-hover">
                                        <thead>
                                            <tr>
                                                <th>Manager Name</th>
                                                <th>Landmark</th>
                                                <th class="text-center">Actions</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result}
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
export default LandmarkManagerList;