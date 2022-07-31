import React from 'react'
import * as ActionNames from '../ActionNames';

var ReceiverStateContext = React.createContext()
var ReceiverDispatchContext = React.createContext()

function ReceiverReducer(state, action) {

	switch (action.type) {
		case ActionNames.ADD_RECEIVER:
			return { ...state, receiver: action.data.receiver, error: null }
		case ActionNames.ADD_RECEIVER_FAILED:
			return { ...state, error: action.data.error }
		case ActionNames.RECEIVER_LIST:
			return { ...state, receivers: action.data.receivers }
		case ActionNames.REMOVE_RECEIVER:
			return { ...state, receiver: null }
		case ActionNames.GET_RECEIVER:
			return { ...state, receiver: action.data.receiver }
		case ActionNames.UPDATE_RECEIVER:
			return { ...state, receiver: null }
		case ActionNames.TOTAL_AREAWSIE_RECEIVER:
			return { ...state, totalAreawiseReceiver: action.data.total }
		case ActionNames.TOTAL_RECEIVER:
			return { ...state, totalReceiver: action.data.total }
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function ReceiverProvider({ children }) {
	var [state, dispatch] = React.useReducer(ReceiverReducer, {
		receiver: null,
		receivers: [],
		error: null,
		totalAreawiseReceiver: 0,
		totalReceiver: 0
	})

	return (
		<ReceiverStateContext.Provider value={state}>
			<ReceiverDispatchContext.Provider value={dispatch}>
				{children}
			</ReceiverDispatchContext.Provider>
		</ReceiverStateContext.Provider>
	)
}

function useReceiverState() {
	var context = React.useContext(ReceiverStateContext)
	if (context === undefined) {
		throw new Error('useUserState must be used within a UserProvider')
	}
	return context
}

function useReceiverDispatch() {
	var context = React.useContext(ReceiverDispatchContext)
	if (context === undefined) {
		throw new Error('useUserDispatch must be used within a UserProvider')
	}
	return context
}

export { ReceiverProvider, useReceiverDispatch, useReceiverState }

