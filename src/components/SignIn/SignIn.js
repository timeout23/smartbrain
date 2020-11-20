import React,{ Component } from 'react';
class SignIn extends Component{
	constructor(props){
		super(props);
		this.state = {
			signinEmail:'',
			signinPassword:'',
			isSigninValid:true,
			signinErrorMessage:''
		}
	}
	
	onEmailChange = (event) => {
		this.setState({ signinEmail: event.target.value });
	}
	onPasswordChange = (event) => {
		this.setState({ signinPassword: event.target.value });
	}
	onsubmitSignin = () => {
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers:{'Content-type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signinEmail,
				password: this.state.signinPassword
			})
		})
		.then(response=>response.json())
		.then(data=>{
			if (data.id){
				this.props.LoadUser(data);
				this.props.onRouteChange('home');
			}
			else{
				this.setState({signinErrorMessage:'Email or password invalid'})
			}
		})
	}
	render(){
		return(
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0" >Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        type="email"
				        name="email-address"
				        id="email-address"
				        onChange={this.onEmailChange}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        type="password"
				        name="password"
				        id="password"
				        onChange={this.onPasswordChange}
				        />
				      </div>
				      <div>{this.state.signinErrorMessage}</div>
				    </fieldset>
				    <div className="">
				      <input 
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					      type="submit"
					      onClick = { ()=>this.onsubmitSignin() } value="Sign in"
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p className="f6 link dim black db pointer"
				      onClick = { () => { this.props.onRouteChange('register') }}
				      >Register</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}
export default SignIn;