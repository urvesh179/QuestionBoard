import React from 'react'
import { withRouter } from 'react-router-dom';

function Sidebar(proprs) {
	var style={
		height: "100%"	  
	}
	return (

		<>

			<div className="sidebar sidebar-dark sidebar-main sidebar-expand-md" style={style} >

				<div className="sidebar-content">
					<div className="card card-sidebar-mobile">
						<ul className="nav nav-sidebar" data-nav-type="accordion">

							
							<li className="nav-item">
								<a href="/admin" className="nav-link active">
									<i className="icon-home4"></i>
									<span>
										Dashboard
								</span>
								</a>
							</li>
							<li className="nav-item nav-item-submenu">
								<a  className="nav-link"><i className="icon-users"></i> <span>Volunteer</span></a>

								<ul className="nav nav-group-sub" data-submenu-title="Volunteer">
									<li className="nav-item"><a href="/admin/volunteerlist" className="nav-link">Volunteer List</a></li>
									<li className="nav-item"><a href="/admin/landmarkmanagerlist" className="nav-link">Landmark Manager List</a></li>

								</ul>
							</li>
							<li className="nav-item nav-item-submenu">
								<a  className="nav-link"><i className="icon-list-unordered"></i> <span>Receiver Category</span></a>

								<ul className="nav nav-group-sub" data-submenu-title="Receiver Category">
									<li className="nav-item"><a href="/admin/addreceivercategory" className="nav-link">Add Receiver Category</a></li>
									<li className="nav-item"><a href="/admin/receivercategorylist" className="nav-link">List of Receiver Category</a></li>
								</ul>
							</li>
							<li className="nav-item nav-item-submenu">
								<a  className="nav-link"><i className="icon-color-sampler"></i> <span>Food Request</span></a>

								<ul className="nav nav-group-sub" data-submenu-title="Food Request">
									<li className="nav-item"><a href="/admin/addfoodrequest" className="nav-link">Add Food Request</a></li>
									<li className="nav-item"><a href="/admin/foodrequestlist" className="nav-link">List of Food Request</a></li>
								</ul>
							</li>
			
							<li className="nav-item nav-item-submenu">
								<a  className="nav-link"><i className="icon-coins"></i> <span>Donation</span></a>

								<ul className="nav nav-group-sub" data-submenu-title="Donation">
									<li className="nav-item"><a href="/admin/moneydonationlist" className="nav-link">List of Money Donation</a></li>
									<li className="nav-item"><a href="/admin/fooddonationlist" className="nav-link">List of Food Donation</a></li>
								</ul>
							</li>

							<li className="nav-item">
								<a className="nav-link" href="/admin/fooddeliverylist"><i className="icon-list"></i> <span>List of Food Delivered</span></a>
							</li>

							<li className="nav-item nav-item-submenu">
								<a className="nav-link"><i className="icon-calendar3"></i> <span>Event</span></a>
								<ul className="nav nav-group-sub" data-submenu-title="Event">
									<li className="nav-item"><a href="/admin/addevent" className="nav-link">Add Events</a></li>
									<li className="nav-item"><a href="/admin/eventlist" className="nav-link">List of Events</a></li>
								</ul>
							</li>

							
							<li className="nav-item nav-item-submenu">
								<a  className="nav-link"><i className="icon-camera"></i> <span>Portfolio</span></a>
								<ul className="nav nav-group-sub" data-submenu-title="Portfolio">
									<li className="nav-item"><a href="/admin/addportfolio" className="nav-link">Add Portfolio</a></li>
									<li className="nav-item"><a href="/admin/portfoliolist" className="nav-link">List of Portfolio</a></li>
								</ul>
							</li>

							<li className="nav-item nav-item-submenu">
								<a  className="nav-link"><i className="icon-location4"></i> <span>Landmark</span></a>
								<ul className="nav nav-group-sub" data-submenu-title="Landmark">
									<li className="nav-item"><a href="/admin/addlandmark" className="nav-link">Add Landmark</a></li>
									<li className="nav-item"><a href="/admin/landmarklist" className="nav-link">List of Landmark</a></li>
								</ul>
							</li>

							<li className="nav-item">
								<a  className="nav-link"><i className="icon-graph"></i> <span>Graphs</span></a>
							</li>
							
						</ul>
					</div>

				</div></div>
		</>

	)
}
export default withRouter(Sidebar);