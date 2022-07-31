import React, { useEffect } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/FoodRequestAction';
import * as uactions from '../../../Actions/UserAction'

import { useFoodRequestDispatch,useFoodRequestState } from '../../../Context/FoodRequestContext';
import {useUserDispatch,useUserState} from '../../../Context/UserContext';


function FoodRequest(props) {

    var loggedin=JSON.parse(localStorage.getItem('user'));
    var userdispatch=useUserDispatch();
    var{user}=useUserState();

    var foodrequestDispatch=useFoodRequestDispatch();
    var{areaWiseFoodRequest}=useFoodRequestState();

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
            console.log(user.landmark_id._id)
            await actions.areaWiseFoodRequest(foodrequestDispatch,user.landmark_id._id);
        }
	}, [areaWiseFoodRequest])




	var data = null;
	data = areaWiseFoodRequest.map(v => {
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
				<td>{v.receiver_id.phone_number}</td>
				<td>{v.receiver_id.address}</td>
				<td>{v.receiver_id.population}</td>
				
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
								<h4> <span class="font-weight-semibold">Volunteer List</span></h4>
								<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
							</div>


						</div>

						<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
							<div class="d-flex">
								<div class="breadcrumb">
									<a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
									<a href="/volunteer/foodrequestlist" class="breadcrumb-item">Volunteer List</a>

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
												<th>Receiver Phone Number</th>
												<th>Receiver Address</th>
                                                <th>Receiver Population</th>
												
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
export default FoodRequest;