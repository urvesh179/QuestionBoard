import React, { useEffect } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/DonationAction';
import * as uactions from '../../../Actions/UserAction'


import { useDonationDispatch,useDonationState} from '../../../Context/DonationContext';
import {useUserDispatch,useUserState} from '../../../Context/UserContext';



function DeliveryStatus(props) {

    var loggedin=JSON.parse(localStorage.getItem('user'));
    var userdispatch=useUserDispatch();
    var{user}=useUserState();

    var foodDonationDispatch=useDonationDispatch();
	var{pendingDelivery}=useDonationState();
	

    useEffect(async()=>
    {
       if(loggedin!=null)
       {
        await uactions.getUserById(userdispatch,loggedin._id)
       }
        
    },[user])

	useEffect(async () => {
        if(user!=null)
        {
            //console.log(user.landmark_id._id)
			await actions.getAllPendingFood(foodDonationDispatch,user.landmark_id._id);
        }
	}, [pendingDelivery])

	const update=async(id)=>
	{
		let data={
			status:"Delivered"
		}
		await actions.updatedeliverystatus(foodDonationDispatch,id,data);
		await actions.getAllPendingFood(foodDonationDispatch,user.landmark_id._id);
		window.location.reload();		
	}

	


	var data = null;
	data = pendingDelivery.map(v => {
		const date = new Date(v.food_listing_id.date);
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yyyy = date.getFullYear();
		var d = yyyy + "-" + mm + "-" + dd
        
        
		data = (

			<tr>
				<td>{d}</td>
				<td>{v.food_listing_id.time}</td>
				<td>{v.food_listing_id.plates}</td>
				<td>{v.food_listing_id.receiver_id.name}</td>	
                <td>{v.food_listing_id.donor_id.user_id.name}</td>			
				<td>{v.volunteer_id.user_id.name}</td>
                <td><span class="badge bg-danger-400">{v.status}</span></td>
                <td>
                <button type="button" onClick={()=>update(v._id)} class="btn bg-teal-400 btn-labeled btn-labeled-left rounded-round">
                    <b><i class="icon-truck"></i></b> Delivered</button>
                </td>
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
								<h4> <span class="font-weight-semibold">Delivery status</span></h4>
								<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
							</div>


						</div>

						<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
							<div class="d-flex">
								<div class="breadcrumb">
									<a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
									<a href="/volunteer/deliverystatus" class="breadcrumb-item">Delivery status</a>

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
												<th>Date</th>
												<th>Time</th>
                                                <th>Plates</th>
                                                <th>Receiver Name</th>
												<th>Donor Name</th>
                                                <th>volunteer Name</th>
                                                <th>Current Status</th>
                                                <th>Delivered ?</th>
												
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
export default DeliveryStatus;