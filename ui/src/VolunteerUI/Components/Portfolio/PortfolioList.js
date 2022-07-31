import React, { useEffect } from 'react'
import config from '../../../config';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/PortfolioAction';

import {usePortfolioDispatch,usePortfolioState} from '../../../Context/PortfolioContext';
import { Redirect, withRouter } from 'react-router';


function PortfolioList(props) {

    var portfolioDispatch=usePortfolioDispatch();
    var {portfolios}=usePortfolioState();

    useEffect(async()=>
    {
         await actions.getAllPortfolio(portfolioDispatch);
    },[])

    const edit=(id)=>
    {
        props.history.push("/volunteer/editportfolio/"+id)
    }

    const remove=async(id)=>
    {
        if (window.confirm('Are you sure to delete this portfolio ?')) {
            await actions.removePortfolio(portfolioDispatch, id);
            await actions.getAllPortfolio(portfolioDispatch);
        }
    }

    var data=null;
    data=portfolios.map(p=>
        {
            
            var image=config.portfolio_image_path +p.image;
            data=(
                <tr>
                <td><img src={image} height="50px" width="50px" /></td>
                <td>{p.description}</td>

                <td colSpan="4" class="text-center">
                    <div class="list-icons">
                        <div class="dropdown">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <a onClick={() => edit(p._id)} class="dropdown-item"><i class="icon-pencil"></i>Edit</a>
                                <a onClick={() => remove(p._id)} class="dropdown-item"><i class="icon-cross2"></i>Delete</a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

            )
            return data;
        })

    const addportfolio=()=>
    {
      props.history.push("/volunteer/addportfolio");
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
                                <h4> <span class="font-weight-semibold">Portfolio List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/volunteer" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="/volunteer/portfoliolist" class="breadcrumb-item">Portfolio List</a>

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
                            <button  onClick={addportfolio} class="btn bg-teal-400 ml-3">Add <i class="icon-plus3 ml-2"></i></button>

		                	</div>
	                	</div>
					</div>
                                
                                    <table class="table datatable-basic table-hover">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Description</th>
                                                <th colSpan="4" class="text-center">Actions</th>
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

export default withRouter(PortfolioList);