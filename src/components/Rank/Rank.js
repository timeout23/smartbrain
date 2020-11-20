import React from 'react';

const Rank = ({ userName, rank})=>{
	return(
		<div>
		<div className='white f3'>
		{`${userName},Your Rank is.....`}
		</div>
		<div className='white f1'>
		{rank}
		</div>
		</div>
	);
} 
export default Rank;