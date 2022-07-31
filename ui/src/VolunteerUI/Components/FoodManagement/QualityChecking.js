import React, { useEffect } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/DonationAction';
import * as uactions from '../../../Actions/UserAction'

import { useDonationDispatch,useDonationState} from '../../../Context/DonationContext';
import {useUserDispatch,useUserState} from '../../../Context/UserContext';


function QualityChecking(props) {

    var loggedin=JSON.parse(localStorage.getItem('user'));
    var userdispatch=useUserDispatch();
    var{user}=useUserState();

    var foodDonationDispatch=useDonationDispatch();
    var{uncheckedQuality}=useDonationState();

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
            await actions.uncheckedQuality(foodDonationDispatch,user.landmark_id._id);
        }
	}, [])

	const updateQuality=async(id,status)=>
	{
		//event.preventDefault();
		let data={
			quality_status:status
		}
		await actions.updateQuality(foodDonationDispatch,id,data);
		await actions.uncheckedQuality(foodDonationDispatch,user.landmark_id._id);
		window.location.reload();
	}



	var data = null;
	if(uncheckedQuality.length!=0)
	{
		
		data = uncheckedQuality.map(v => {
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
					
					<td>{v.donor_id.user_id.name}</td>
					<td>{v.donor_id.donor_category_id.category}</td>
					<td>{v.donor_id.user_id.phone_number}</td>
					<td>
						<div class="dropdown"  >
							<a href="#" class="badge badge-flat border-indigo text-indigo-600 dropdown-toggle" data-toggle="dropdown"
							 style={{fontSize:"93%"}}>Unchecked</a>

							<div class="dropdown-menu dropdown-menu-right">
								<a onClick={()=>updateQuality(v._id,"bad")} class="dropdown-item">
									<span class="badge badge-mark mr-2 border-danger"></span>
									Bad
								</a>
							
								<a onClick={()=>updateQuality(v._id,"good")} class="dropdown-item">
									<span class="badge badge-mark mr-2 border-success"></span>
									Good
								</a>
							</div>
						</div>
					</td>
				</tr>

			)
			return data;
		})
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
								<h4> <span class="font-weight-semibold">Quality Checking</span></h4>
								<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
							</div>


						</div>

						<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
							<div class="d-flex">
								<div class="breadcrumb">
									<a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
									<a href="/volunteer/qualitychecking" class="breadcrumb-item">Quality Checking</a>

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
                                                <th>donor Name</th>
                                                <th>donor Category</th>
                                                <th>donor Phone Number</th>
                                                <th>Quality ?</th>
												
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
export default QualityChecking ;