import React, { useState, useEffect } from 'react'

import * as actions from '../../../Actions/ReceiverCategoryAction';
import { useReceiverCategoryDispatch, useReceiverCategoryState } from '../../../Context/ReceiverCategory';

import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

function ReceiverCategoryList(props) {

    var receivercategoryDispatch = useReceiverCategoryDispatch();
    var { receivercategories } = useReceiverCategoryState();

    useEffect(async () => {
        await actions.getAllReceiverCategory(receivercategoryDispatch);
    }, [])


    const editReceiverCategory = async (id) => {
        props.history.push("/admin/editreceivercategory/" + id);
    }

    const deleteReceiverCategory = async (id) => {
        if (window.confirm('Are you sure to delete this receiver category???')) {
            await actions.removeReceiverCategory(receivercategoryDispatch, id);
            await actions.getAllReceiverCategory(receivercategoryDispatch);
        }
    }


    var data = null;
    data = receivercategories.map(r => {
        data = (
            <tr>
                <td>{r.name}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-center">
                    <div class="list-icons">
                        <div class="dropdown">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <a onClick={() => editReceiverCategory(r._id)} class="dropdown-item"><i class="icon-pencil"></i>Edit</a>
                                <a onClick={() => deleteReceiverCategory(r._id)} class="dropdown-item"> <i class="icon-cross2"></i>Delete</a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

        )
        return data;
    })

    const addreceivercategory = () => {
        props.history.push("/admin/addreceivercategory");
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
                                <h4> <span class="font-weight-semibold">Receiver Category List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="/admin/receivercategorylist" class="breadcrumb-item">Receiver Category List</a>

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
                                                <button onClick={addreceivercategory} class="btn bg-teal-400 ml-3">Add <i class="icon-plus3 ml-2"></i></button>

                                            </div>
                                        </div>
                                    </div>
                                    <table class="table datatable-basic table-hover">
                                        <thead>
                                            <tr>
                                                <th colSpan="5">Name</th>
                                                <th class="text-center">Actions</th>
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
export default withRouter(ReceiverCategoryList);