import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'

export default class LoginForm extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	nickname:"",
		  error:"",
		  currentPos: {}
	  };
	}

	setUser = ({user, isUser})=>{
		if(isUser){
			this.setError("Username already taken")
		}else if(this.state.nickname === ""){
			this.setError("Got a name?")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()

		const { socket } = this.props
		const { nickname } = this.state
		const { currentPos } = this.state

		 

		socket.emit(VERIFY_USER, nickname, currentPos, this.setUser)
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	setUserCoordinates = () => {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				   const coords = pos.coords;
				   this.setState({
					 currentPos: {
					   lat: coords.latitude,
					   lng: coords.longitude
					 }	
				   });
			});
		}
	}

	render() {	
		const { nickname, error } = this.state;
		this.setUserCoordinates()
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >
					<label htmlFor="nickname">
						<h2>Hi! what's your name?</h2>
					</label>
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						id="nickname"
						value={nickname}
						onChange={this.handleChange}
						placeholder={'name goes here'}
						/>
						<div className="error">{error ? error:null}</div>

						<div className="centerit">
							<button className="button">enter</button>
						</div>
				</form>

			</div>
		);
	}
}
