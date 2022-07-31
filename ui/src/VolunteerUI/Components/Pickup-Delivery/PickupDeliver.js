import React, { useEffect } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/DonationAction';
import * as uactions from '../../../Actions/UserAction'
import * as vactions from '../../../Actions/VolunteerAction'

import { useDonationDispatch,useDonationState} from '../../../Context/DonationContext';
import {useUserDispatch,useUserState} from '../../../Context/UserContext';
import { useVolunteerDispatch,useVolunteerState} from '../../../Context/VolunteerContext';


function PickupDeliver(props) {

    var loggedin=JSON.parse(localStorage.getItem('user'));
    var userdispatch=useUserDispatch();
    var{user}=useUserState();

    var foodDonationDispatch=useDonationDispatch();
	var{goodQuality}=useDonationState();
	
	var volunteerDispatch=useVolunteerDispatch();
    var{areaWiseVolunteers}=useVolunteerState();

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
			await actions.goodQuality(foodDonationDispatch,user.landmark_id._id);
			await vactions.areaWise(volunteerDispatch,user.landmark_id._id);
        }
	}, [goodQuality,areaWiseVolunteers])

	const addFoodDelivery=async(fid,vid)=>
	{
		let data={
			food_listing_id:fid,
			volunteer_id:vid,
			landmark_id:user.landmark_id._id
		}
		await actions.addFoodDelivery(foodDonationDispatch,data);
		await actions.goodQuality(foodDonationDispatch,user.landmark_id._id);
		window.location.reload();		
	}

	


	var data = null;
	data = goodQuality.map(v => {
		const date = new Date(v.date);
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yyyy = date.getFullYear();
		var d = yyyy + "-" + mm + "-" + dd

		
		data = (

			<tr>
				<td>{d}</td>
				<td>{v.time}</td>
				<td>{v.plates}</td>
				<td>{v.receiver_id.name}</td>
				<td>{v.receiver_id.category_id.name}</td>				
				<td>{v.receiver_id.address}</td>
                <td>{v.receiver_id.phone_number}</td>
                
				<td>
						<div class="dropdown"  >
							<a href="#" class="badge badge-flat border-indigo text-indigo-600 dropdown-toggle" data-toggle="dropdown"
							 style={{fontSize:"93%"}}>Unassigned</a>

							<div class="dropdown-menu dropdown-menu-right">
							{
								areaWiseVolunteers.map(x=>
								{
									let volunteers=(
										<a onClick={()=>addFoodDelivery(v._id,x._id)} class="dropdown-item">
											<span class="badge badge-mark mr-2 border-danger"></span>
											{x.user_id.name}
										</a>
									)
									return volunteers;
								})
							}
							</div>
						</div>
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
								<h4> <span class="font-weight-semibold">Pickup and Deliver</span></h4>
								<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
							</div>


						</div>

						<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
							<div class="d-flex">
								<div class="breadcrumb">
									<a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
									<a href="/volunteer/pickupdeliver" class="breadcrumb-item">Pickup and Deliver</a>

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
												<th>Receiver Categoory</th>
                                                <th>Receiver Address</th>
                                                <th>Receiver Phone Number</th>
                                                <th>Assign Volunteer?</th>
												
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
export default PickupDeliver;