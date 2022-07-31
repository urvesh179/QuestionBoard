import React from 'react'
import { NavLink } from 'react-router-dom';

function Sidebar(proprs) {

	return (

		<div>

			<div class="sidebar sidebar-dark sidebar-main sidebar-expand-md" style={{height:"100%"}}>

				<div class="sidebar-content">
					<div class="card card-sidebar-mobile">
						<ul class="nav nav-sidebar" data-nav-type="accordion">

							
							<li class="nav-item">
								<a href="/volunteer" class="nav-link active">
									<i class="icon-home4"></i>
									<span>
										Dashboard
								</span>
								</a>
							</li>
							<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link"><i class="icon-people"></i> <span>Receiver Management</span></a>

								<ul class="nav nav-group-sub" data-submenu-title="Receiver Management">
									<li class="nav-item"><a href="/volunteer/receiverlist" class="nav-link">Receiver List</a></li>
									<li class="nav-item"><a href="/volunteer/addreceiver" class="nav-link">Add new Receiver</a></li>
									
								</ul>
							</li>
							<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link"><i class="icon-coffee"></i><span>Food Management</span></a>

								<ul class="nav nav-group-sub" data-submenu-title="Food Management">
									<li class="nav-item"><a href="/volunteer/foodrequestlist" class="nav-link">List of Request</a></li>
									<li class="nav-item"><a href="/volunteer/fooddonationlist" class="nav-link">List of Donated Food</a></li>
									<li class="nav-item"><a href="/volunteer/qualitychecking" class="nav-link">Quality checking</a></li>
									<li class="nav-item"><a href="/volunteer/redirectfood" class="nav-link">Redirect Food</a></li>
								</ul>
							</li>
							
							<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link"><i class="icon-truck"></i><span>Pickup and Delivery</span></a>	
								<ul class="nav nav-group-sub" data-submenu-title="Pickup and Delivery">
									<li class="nav-item"><a href="/volunteer/pickupdeliver" class="nav-link">Pickup-Deliver Food</a></li>
									<li class="nav-item"><a href="/volunteer/deliverystatus" class="nav-link">Manage delivery status</a></li>
								</ul>						
							</li>
		
							
							<li class="nav-item nav-item-submenu">
								<a  href="#" class="nav-link"><i class="icon-camera"></i> <span>Portfolio</span></a>
								<ul class="nav nav-group-sub" data-submenu-title="Portfolio">
									<li class="nav-item"><a href="/volunteer/addportfolio" class="nav-link">Add Portfolio</a></li>
									<li class="nav-item"><a href="/volunteer/portfoliolist" class="nav-link">List of Portfolio</a></li>
								</ul>
							</li>

							<li class="nav-item">
								<a href="#" class="nav-link"><i class="icon-graph"></i> <span>Graphs</span></a>
							</li>
							
						</ul>
					</div>

				</div></div>
		</div>

	)
}
export default Sidebar;