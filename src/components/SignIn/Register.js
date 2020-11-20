import React, {Component} from 'react';

class Register extends Component {
	constructor(props){
	super(props);
	this.state = {
		registerName: '',
		registerEmail: '',
		registerPassword: '',
		isRegisterValid: true,
		passErrorMessage:'',
		isEmailValid:true,
		emailStatus:''
	}
}
	onNameChange = (event)=>{
	this.setState({ registerName:event.target.value })
	}
	onEmailChange = (event)=>{
	this.setState({ registerEmail:event.target.value })
		
	}
	onPasswordChange = (event)=>{
	this.setState({ registerPassword:event.target.value })
	if (this.state.registerPassword.length < 6){
		this.setState({isRegisterValid:false})
		this.setState({passErrorMessage:'password has to be greater than 6 characters'})
	}else{
		this.setState({isRegisterValid:true})
		this.setState({passErrorMessage:''})
	}
	}
	onsubmitRegister = () => {
		fetch('http://localhost:3001/emailverify',{
			method: 'post',
			headers:{'Content-type':'application/json'},
			body:JSON.stringify({
				email: this.state.registerEmail,
			})
		})
		.then(res=>res.json())
		.then(res=>{ 
			if (res!== true)
				return(
					this.setState({isEmailValid:false}),
					this.setState(Object.assign(this.state,{isEmailStatus:'👎, enter valid email'}))
					);
		})

		if (!this.state.isRegisterValid || !this.state.isEmailValid)
			return alert('Email or Password invalid');
		
	
		fetch('http://localhost:3001/register',{
			method: 'post',
			headers:{'Content-type':'application/json'},
			body:JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword,
				isEmailValid:this.state.isEmailValid
			})
		})
		.then(response => response.json())
		.then(data=>{
			if(data.id){
				this.props.LoadUser(data);
				this.props.onRouteChange('signin');
			}
			else{
				this.setState({passErrorMessage:'Email or password invalid'})
			}			
		})
	}
	render(){
		return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
			        type="text"
			        name="name"
			        id="name"
			        onChange={this.onNameChange}
			        />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
			        type="email"
			        name="email-address"
			        id="email-address"
			        onChange={this.onEmailChange}
			        />
			      </div>
			      <div>{this.state.isEmailStatus}</div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
			        type="password"
			        name="password"
			        id="password"
			        onChange={this.onPasswordChange}
			        />
			      </div>
			      <p style={{color:"red"}}>{this.state.passErrorMessage}</p>
			    </fieldset>
			    <div className="">
			    </div>
			    <div className="">
			      <input 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      type="submit"
				      onClick = { () => { this.onsubmitRegister() }} value="Register"
			      />
			    </div>
			  </div>
			</main>
		</article>
		);
	}
}
export default Register;