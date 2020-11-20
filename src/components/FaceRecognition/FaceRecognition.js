import React from 'react';
import './FaceRecognition.css'


 const FaceRecognition =({ image, box })=>{
 	return(
 		<div className='center'>
 		<div className='absolute mt2'>
 		<img id ="inputImage" alt='' src={ image } width='500px' height='auto'/>
 		<div className='bounding-box' style={{ top: box.topRow, left: box.leftCol, bottom: box.rightCol, right: box.rightCol}}></div>
 		</div>
 		</div>
 		);
 }
 export default FaceRecognition;
