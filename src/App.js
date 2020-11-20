import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/SignIn/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';



const particlesProps={
	particles: {
   	number:{
   		value:200,
   		density:{
   			enable:true,
   			value_area:800
   		}
   	}
 	}
}

const intialState = {
	input:'',
	imageUrl:'',
	box:{},
	route:'signin',
	isSignedin: false,
	user:{
		id:'',
		email:'',
		name:'',
		entries:0,
		joined:''
	}
}	

class App extends Component{
	constructor(){
		super();
		this.state = intialState;
		}
	
	LoadUser = (data) => {
		this.setState({ user:{
				id: data.id,
				email: data.email,
				name: data.name,
				entries: data.entries,
				joined: data.joined
		}
		})
	}
	onRouteChange = (route) => {
		if (route==='home'){
			this.setState({isSignedin: true})
		}else if (route==='signin') {
			this.setState(Object.assign(this.state,{imageUrl:''}))
		}	
		this.setState({route:route});
	}
	calculcateFaceLocation = (data) => {
		const clarifaiFace= data['outputs'][0]['data'].regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return{
			topRow: clarifaiFace.top_row * height,
			leftCol: clarifaiFace.left_col * width,
			bottomRow: height - ( clarifaiFace.bottom_row * height ),
			rightCol: width - (clarifaiFace.right_col * width)
		}
	}
	displayFaceBox =(box) => {
		this.setState({ box: box });
	}
	onInputChange = (event) => {
		console.log(event.target.value);
		this.setState({ input: event.target.value });
	}
	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		fetch('http://localhost:3001/imageapi',{
			method: 'post',
			headers:{'Content-type' : 'application/json'},
			body: JSON.stringify({
				input: this.state.input
			})
		})
		.then(response => response.json())
    .then(response => {
      this.displayFaceBox(this.calculcateFaceLocation(response));
    });
    fetch('http://localhost:3001/image',{
			method: 'put',
			headers:{'Content-type':'application/json'},
			body:JSON.stringify({
				id:this.state.user.id
			})
		})
		.then(response => response.json())
		.then(data=>{
			if(data){
				this.setState(Object.assign(this.state.user,{entries:data}));
			}			
		})
		.catch(console.log)
	}
	
	render(){
		const { imageUrl, box, route, isSignedin, user } = this.state;
		const RenderSwitch = () =>{
			switch(route) {
				case 'signin': return <SignIn LoadUser={this.LoadUser} onRouteChange={this.onRouteChange}/>
			  case 'register': return <Register LoadUser={this.LoadUser} onRouteChange={this.onRouteChange}/>	 
			  case 'home' :
			  	return(
			    	<div>
					    <Logo/>
					    <Rank userName={user.name} rank={user.entries}/>
					    <ImageLinkForm
					     onInputChange={this.onInputChange}
					     onButtonSubmit={this.onButtonSubmit}
					     />
					    <FaceRecognition box={box} image={imageUrl}/>
			   		</div>
			   	);
			 	default: return <p>{"loading"}</p>
			}
		}
		return (
	    <div className="App">
	    	<div>
		    	<Particles className='particles'
		      	params={particlesProps}
		      />
		      <Navigation
		      isSignedin={isSignedin}
		      onRouteChange={this.onRouteChange}
		      />
		    </div>
		    {
		    	<div>{ RenderSwitch() }</div>
		    } 
	    </div>
  	);
	}
}

export default App;
