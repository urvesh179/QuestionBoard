import React from 'react'
import * as ActionNames from '../ActionNames';

var UserStateContext = React.createContext()
var UserDispatchContext = React.createContext()

function userReducer(state, action) {

	switch (action.type) {
		case ActionNames.LOGIN:
			return { ...state, user: action.data.user, token: action.data.token, error: null }
		case ActionNames.LOGIN_FAILED:
			return { ...state, error: action.data.error }
		case ActionNames.LOGOUT:
			return { ...state, user: null, token: null, error: null }
		case ActionNames.GET_USER:
			return { ...state, user: action.data.user }
		case ActionNames.EDIT_PROFILE_ADMIN:
			return { ...state, user: null }
		case ActionNames.CHANGE_PASSWORD:
			return { ...state, message: action.data.message, error: null }
		case ActionNames.CHANGE_PASSWORD_FAILED:
			return { ...state, error: action.data.error, message: null }
		case ActionNames.FORGET_PASSWORD:
			return { ...state, message: action.data.message, error: null }
		case ActionNames.FORGET_PASSWORD_FAILED:
			return { ...state, error: action.data.error, message: null }
		case ActionNames.UPDATE_PASSWORD:
			return { ...state, message: action.data.message, error: null }
		case ActionNames.UPDATE_PASSWORD_FAILED:
			return { ...state, error: action.data.error, message: null }
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function UserProvider({ children }) {
	var [state, dispatch] = React.useReducer(userReducer, {
		token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
		user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,
		error: null,
		message: null
	})

	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>
				{children}
			</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	)
}

function useUserState() {
	var context = React.useContext(UserStateContext)
	if (context === undefined) {
		throw new Error('useUserState must be used within a UserProvider')
	}
	return context
}

function useUserDispatch() {
	var context = React.useContext(UserDispatchContext)
	if (context === undefined) {
		throw new Error('useUserDispatch must be used within a UserProvider')
	}
	return context
}

export { UserProvider, useUserState, useUserDispatch }

