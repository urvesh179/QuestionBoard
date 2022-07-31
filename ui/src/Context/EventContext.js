import React from 'react'
import * as ActionNames from '../ActionNames';

var EventStateContext = React.createContext()
var EventDispatchContext = React.createContext()

function EventReducer(state, action) {

	switch (action.type) {
		case ActionNames.EVENT_LIST:
			return { ...state, events: action.data.events }
		case ActionNames.ADD_EVENT:
			return { ...state, event: action.data.event }
		case ActionNames.ADD_EVENT_FAILED:
			return { ...state, error: action.data.error }
		case ActionNames.GET_EVENT:
			return { ...state, event: action.data.event }
		case ActionNames.UPDATE_EVENT:
			return { ...state, event: null }
		case ActionNames.REMOVE_EVENT:
			return { ...state, event: null }
		case ActionNames.TOTAL_EVENT:
			return { ...state, totalEvent: action.data.total }
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function EventProvider({ children }) {
	var [state, dispatch] = React.useReducer(EventReducer, {
		events: [],
		event: null,
		error: null,
		totalEvent: 0
	})

	return (
		<EventStateContext.Provider value={state}>
			<EventDispatchContext.Provider value={dispatch}>
				{children}
			</EventDispatchContext.Provider>
		</EventStateContext.Provider>
	)
}

function useEventState() {
	var context = React.useContext(EventStateContext)
	if (context === undefined) {
		throw new Error('useEventState must be used within a EventProvider')
	}
	return context
}

function useEventDispatch() {
	var context = React.useContext(EventDispatchContext)
	if (context === undefined) {
		throw new Error('useEventDispatch must be used within a EventProvider')
	}
	return context
}

export { EventProvider, useEventState, useEventDispatch }

