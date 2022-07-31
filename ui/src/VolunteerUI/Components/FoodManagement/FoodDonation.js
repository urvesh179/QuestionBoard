import React, { useEffect } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/DonationAction';
import * as uactions from '../../../Actions/UserAction'

import { useDonationDispatch,useDonationState} from '../../../Context/DonationContext';
import {useUserDispatch,useUserState} from '../../../Context/UserContext';


function FoodDonation(props) {

    var loggedin=JSON.parse(localStorage.getItem('user'));
    var userdispatch=useUserDispatch();
    var{user}=useUserState();

    var foodDonationDispatch=useDonationDispatch();
    var{areaWiseFoodDonation}=useDonationState();

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
            await actions.areaWiseFoodDonation(foodDonationDispatch,user.landmark_id._id);
		}
		console.log(areaWiseFoodDonation);
	}, [areaWiseFoodDonation])




	var data = null;
	data = areaWiseFoodDonation.map(v => {
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
				{v.receiver_id==null?<td>-</td>:<td>{v.receiver_id.name}</td>}
				{v.receiver_id==null?<td>-</td>:<td>{v.receiver_id.category_id.name}</td>}				
				{v.receiver_id==null?<td>-</td>:<td>{v.receiver_id.population}</td>}
				{v.receiver_id==null?<td>-</td>:<td>{v.receiver_id.phone_number}</td> }
                <td>{v.donor_id.user_id.name}</td>
                <td>{v.donor_id.donor_category_id.category}</td>
                <td>{v.donor_id.user_id.phone_number}</td>
				
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
								<h4> <span class="font-weight-semibold">Food Donation</span></h4>
								<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
							</div>


						</div>

						<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
							<div class="d-flex">
								<div class="breadcrumb">
									<a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
									<a href="/volunteer/fooddonationlist" class="breadcrumb-item">Food Donation</a>

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
                                                <th>Receiver Population</th>
                                                <th>Receiver Phone Number</th>
                                                <th>donor Name</th>
                                                <th>donor Category</th>
                                                <th>donor Phone Number</th>
												
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
export default FoodDonation;