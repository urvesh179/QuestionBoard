import React, { useEffect } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as actions from '../../../Actions/DonationAction';
import * as factions from '../../../Actions/FoodRequestAction';
import * as uactions from '../../../Actions/UserAction'

import { useDonationDispatch,useDonationState} from '../../../Context/DonationContext';
import {useFoodRequestDispatch,useFoodRequestState} from '../../../Context/FoodRequestContext';
import {useUserDispatch,useUserState} from '../../../Context/UserContext';


function FoodDonation(props) {

    var loggedin=JSON.parse(localStorage.getItem('user'));
    var userdispatch=useUserDispatch();
    var{user}=useUserState();

    var foodDonationDispatch=useDonationDispatch();
    var{areaWiseFoodDonation}=useDonationState();
    var{areaWiseFoodRequest}=useFoodRequestState();
    var foodRequestDispatch=useFoodRequestDispatch();

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
            await factions.areaWiseFoodRequest(foodRequestDispatch,user.landmark_id._id);
		}
	}, [areaWiseFoodDonation,areaWiseFoodRequest])

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
    const update=async(lid,rid)=>
    {
        let data={
            receiver_id:rid
        }
        await actions.redirectFood(foodDonationDispatch,lid,data);
        await actions.areaWiseFoodDonation(foodDonationDispatch,user.landmark_id._id);
        window.location.reload();           
        
    }  
      

    var receivers=null;
    var temp=[];
    var temp1=[];
    receivers=areaWiseFoodRequest.map(r=>
        {
            temp.push(r.receiver_id.name);
            temp1.push(r);
            return temp;
        })
    receivers=temp.filter(onlyUnique);
    
    
    var data = null;
    
	data = areaWiseFoodDonation.map(v => {

        if(v.receiver_id==null)
        {
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
							 style={{fontSize:"93%"}}>not selected</a>

							<div class="dropdown-menu dropdown-menu-right">

                               {/* {receivers} */}
                               {receivers=receivers.map(r=>
                                {
                                        var rid=null;
                                        temp1.forEach(element => {
                                            if(element.receiver_id.name==r)
                                            {
                                                rid=element.receiver_id._id;
                                            }
                                            
                                        });
                                        receivers=(
                                            <a onClick={()=>update(v._id,rid)} class="dropdown-item">
                                            <span class="badge badge-mark mr-2 border-success"></span>
                                            {r}
                                            </a>
                                        )
                                        return receivers;
                                    })}

                              
							</div>
						</div>
					</td>
                    
                </tr>
    
            )
        }
		
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
								<h4> <span class="font-weight-semibold">Redirect Food</span></h4>
								<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
							</div>


						</div>

						<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
							<div class="d-flex">
								<div class="breadcrumb">
									<a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
									<a href="/volunteer/redirectfood" class="breadcrumb-item">Redirect Food</a>

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
                                                <th>Choose Receiver?</th>
												
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