import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain2 from './brain2.png';

const Logo =()=>{
	return(
		<div>
			<Tilt className="Tilt br2 shadow-2 bg-blue { background-color: #357EDD }"
			 options={{ max : 55 }} style={{ height: 120, width: 110 }} >
	 		<div className="Tilt-inner"> <img style={{paddingTop:'10px', maxWidth:90}}alt= 'logo' src={brain2}/> </div>
			</Tilt>
		</div>
		);
}
export default Logo;