import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import { Redirect } from 'react-router';

import * as ractions from '../../../Actions/ReceiverAction'
import * as uactions from '../../../Actions/UserAction'
import * as vactions from '../../../Actions/VolunteerAction'
import * as factions from '../../../Actions/FoodRequestAction'

import {useReceiverDispatch,useReceiverState} from '../../../Context/ReceiverContext';
import {useUserDispatch,useUserState} from '../../../Context/UserContext';
import {useVolunteerDispatch,useVolunteerState} from '../../../Context/VolunteerContext';
import {useFoodRequestDispatch,useFoodRequestState} from '../../../Context/FoodRequestContext';

function Dashboard(props) {

    var loggedin=JSON.parse(localStorage.getItem('user'));
    var userdispatch=useUserDispatch();
    var{user}=useUserState();
   
    var receiverDispatch=useReceiverDispatch();
    var{totalAreawiseReceiver}=useReceiverState();

    var volunteerDispatch=useVolunteerDispatch();
    var{totalAreaWiseVolunteer}=useVolunteerState();

    var foodRequestDispatch=useFoodRequestDispatch();
    var{totalAreaWiseFoodRequest}=useFoodRequestState();

    var[u,setU]=useState(null)
    var[receiver,setReceiver]=useState(null);
    var[volunteer,setVolunteer]=useState(null);
    var[foodRequest,setFoodRequest]=useState(null);

    useEffect(async()=>
    {
       if(loggedin!=null)
       {
        await uactions.getUserById(userdispatch,loggedin._id)
       }
       
        
        
    },[user])

    useEffect(async()=>
    {
        if(user!=null)
        {
            await ractions.totalAreawiseReceiver(receiverDispatch,user.landmark_id._id);
        
            await vactions.totalAreawiseVolunteer(volunteerDispatch,user.landmark_id._id);
    
            await factions.totalAreawiseFoodRequest(foodRequestDispatch,user.landmark_id._id)
    
    
            setReceiver(totalAreawiseReceiver);
            setVolunteer(totalAreaWiseVolunteer);
            setFoodRequest(totalAreaWiseFoodRequest)
        }
        

    },[totalAreawiseReceiver,totalAreaWiseVolunteer,totalAreaWiseFoodRequest])

  

    
    
    var style = {
        height : "150px"
    }

    var path="../assets/images/bottom-bg.png";
    var bgImageStyle ={
      backgroundImage: "url(" + path + ")",
      height:"100%",
      backgroundPosition: 'bottom',
      //backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }

    return (
        <>
       
        <Header />
            <div className="page-content" style={{ height: "100%" }} >
                <Sidebar />
       
        <div class="content-wrapper" style={bgImageStyle}>
            <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
                    <div class="breadcrumb">
                        <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                        <span class="breadcrumb-item active">Dashboard</span>
                    </div>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>


            <div class="content">
                <div class="row">
                    

                    <div class="col-lg-4" >
                        <div class="card bg-indigo-400" style={style}>
                            <div class="card-body">
                                <div class="d-flex">
                                    <h3 class="font-weight-semibold mb-0">{receiver}</h3>
                                    <div class="list-icons ml-auto"><i class="icon-collaboration mr-3 icon-2x"></i>
                                    </div>
                                </div>
                                <div>
                                    Total Receivers
								 </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="card bg-pink-400" style={style}>
                            <div class="card-body">
                                <div class="d-flex">
                                    <h3 class="font-weight-semibold mb-0">{volunteer}</h3>
                                    <div class="list-icons ml-auto"><i class="icon-users mr-3 icon-2x"></i>
                                    </div>
                                </div>

                                <div>
                                    Total Volunteers
								 </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-4" >
                        <div class="card bg-green-600" style={style}>
                            <div class="card-body">
                                <div class="d-flex">
                                    <h3 class="font-weight-semibold mb-0">{foodRequest} </h3>
                                    <div class="list-icons ml-auto"><i class="icon-store mr-3 icon-2x"></i>
                                    </div>
                                </div>

                                <div>
                                    Total Food Request
								 </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default Dashboard;