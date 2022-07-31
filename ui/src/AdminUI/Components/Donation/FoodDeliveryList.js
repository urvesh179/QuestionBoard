import React, { useState, useEffect } from 'react'

import * as actions from '../../../Actions/DonationAction';
import { useDonationDispatch, useDonationState } from '../../../Context/DonationContext';

import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

function FoodDeliveryList(props) {

    var donationDispatch = useDonationDispatch();
    var { fooddelivery } = useDonationState();

    useEffect(async () => {
        await actions.getAllFoodDelivered(donationDispatch);
    }, [])

    var data = null;
    data = fooddelivery.map(f => {
        const date = new Date(f.food_listing_id.date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        data = (
            <tr>
                <td>{dd}-{mm}-{yyyy}</td>
                <td>{f.food_listing_id.time}</td>
                <td>{f.food_listing_id.donor_id.user_id.name}</td>
                <td>{f.food_listing_id.receiver_id.name}</td>
                <td>{f.food_listing_id.plates}</td>
                <td>{f.volunteer_id.user_id.name}</td>
                <td>{f.status}</td>
            </tr>

        )
        return data;
    })
    return (
        <>
            <Header />
            <div className="page-content" style={{ height: "100%" }} >
                <Sidebar />
                <div class="content-wrapper">

                    <div class="page-header page-header-light">
                        <div class="page-header-content header-elements-md-inline" style={{ height: "55px" }}>
                            <div class="page-title d-flex">
                                <h4> <span class="font-weight-semibold">Food Delivered List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="/admin/fooddeliverlist" class="breadcrumb-item">Food Delivered List</a>

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

                                        </div>
                                    </div>
                                    <table class="table datatable-basic table-hover">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Donor</th>
                                                <th>Receiver</th>
                                                <th>Plates</th>
                                                <th>Volunteer</th>
                                                <th>Status</th>
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
export default withRouter(FoodDeliveryList);