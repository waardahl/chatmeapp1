import React, { Component } from 'react';
import { SideBarOption } from './SideBarOption'
import { get, last, differenceBy } from 'lodash'
import { createChatNameFromUsers } from '../../Factories'


export default class SideBar extends Component {
	static type = {
		CHATS: "chats",
		USERS: "users"
	}
	constructor(props) {
		super(props)
		this.state = {
			reciever: "",
			activeSideBar: SideBar.type.CHATS,
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { reciever } = this.state
		const { onSendPrivateMessage } = this.props

		onSendPrivateMessage(reciever)
		this.setState({ reciever: "" })

	}
	addChatForUser = (username) => {
		this.props.onSendPrivateMessage(username)
		this.setActiveSideBar(SideBar.type.CHATS)
		
	}
	setActiveSideBar = (newSideBar) => {
		this.setState({ activeSideBar: newSideBar })
		this.props.triggerShowMap()
	}

	render() {
		const { chats, user, setActiveChat, logout, users } = this.props
		const { reciever, activeSideBar } = this.state
		return (
			<div id="side-bar" className="noscroll">
				<div className="heading">
					<div className="app-name">chatMe</div>
					<div className="menu"></div>
				</div>
				<form onSubmit={this.handleSubmit} className="search">
					<input
						placeholder="Search"
						type="text"
						value={reciever}
						onChange={(e) => { this.setState({ reciever: e.target.value }) }} />
					<input type="submit" className="plus" value="+" ></input>
				</form>
				<div className="side-bar-select">
					<div
						onClick={() => { this.setActiveSideBar(SideBar.type.CHATS) }}
						className={`side-bar-select__option ${(activeSideBar === SideBar.type.CHATS) ? 'active' : ''}`}>
						<span>Chats</span>
					</div>
					<div
						onClick={() => { this.setActiveSideBar(SideBar.type.USERS) }}
						className={`side-bar-select__option ${(activeSideBar === SideBar.type.USERS) ? 'active' : ''}`}>
						<span >Users</span>

					</div>
				</div>
				<div
					className="users"
					ref='users'
					onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null) }}>
					{
						activeSideBar === SideBar.type.CHATS ?
							chats.map((chat) => {
								if (chat.name) {
									return (
										<SideBarOption
											key={chat.id}
											users={users}
											chats={chats}
											name={chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}
											lastMessage={get(last(chat.messages), 'message', '')}
											//active={activeChat.id === chat.id}
											onClick={() => { this.props.setActiveChat(chat) }}
										/>
									)
								}

								return null
							})
							:
							differenceBy(users, [user], 'name').map((otherUser) => {
								return (
									<SideBarOption
										key={otherUser.id}
										name={otherUser.name}
										onClick={() => { this.addChatForUser(otherUser.name) }}
									/>
								)
							})
					}

				</div>
				<div className="current-user">
					<span>{user.name}</span>
					<div onClick={() => { logout() }} title="Logout" className="logout">
						<p>log out</p>
					</div>
				</div>
			</div>
		);
	}
}
