import React from 'react';
import Avatar from 'react-avatar';

function Header(props) {

	var user=JSON.parse(localStorage.getItem('user'));
	
    var style={
        height:70
    }
    return (
        <>
		<div className="navbar navbar-expand-md navbar-dark" style={style}>
		<div className="navbar-brand">
			<a href="#" className="d-inline-block">
				<img src="../assets/images/logo_light.png" alt=""/>
			</a>
		</div>


		<div className="collapse navbar-collapse" id="navbar-mobile">
			<ul className="navbar-nav">
				<li className="nav-item">
					<a href="#" className="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
						<i className="icon-paragraph-justify3"></i>
					</a>
				</li>

				
			</ul>

			<span class="badge bg-success ml-md-3 mr-md-auto">Online</span>

			<ul className="navbar-nav">

				<li className="nav-item dropdown dropdown-user">
					<a href="#" className="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
						{/* <img src="../assets/images/demo/users/face13.jpg" className="rounded-circle mr-2" height="34" alt=""/> */}
						<Avatar name={user==null?null:user.name} round={true} size="50" color="#26a69a" style={{margin:"5px 10px 10px auto"}}/>
						<span>{user==null?null:user.name}</span>
					</a>

					<div className="dropdown-menu dropdown-menu-right">
						<a href="/volunteer/editprofile" className="dropdown-item"><i className="icon-user-plus"></i> My profile</a>
						<a href="/volunteer/changepassword" className="dropdown-item"><i className="icon-cog5"></i>Change Password</a>
						<a href="/volunteer/logout" className="dropdown-item"><i className="icon-switch2"></i> Logout</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
	</>
    );
}

export default Header;