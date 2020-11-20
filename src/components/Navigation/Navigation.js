import React from 'react';

const Navigation = ({ onRouteChange, isSignedin })=>{
	if (isSignedin){
		return(
			<nav style={{display:'flex', justifyContent:'flex-end' }}>
				<p  onClick={()=>onRouteChange('signin')} className="f3 link dim black underline  pointer pa3"> Sign out </p>
			</nav>
		);
	}else{
		return(
			<nav style={{display:'flex', justifyContent:'flex-end' }}>
				<p  onClick={()=>onRouteChange('register')} className="f3 link dim black underline  pointer pa3"> Register </p>
				<p  onClick={()=>onRouteChange('signin')} className="f3 link dim black underline  pointer pa3"> Sign In </p>
			</nav>
		);
	}

} 
export default Navigation;