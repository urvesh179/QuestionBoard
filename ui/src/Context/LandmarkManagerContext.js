import React from 'react'
import * as ActionNames from '../ActionNames';

var LandmarkManagerStateContext = React.createContext()
var LandmarkManagerDispatchContext = React.createContext()

function landmarkManagerReducer(state, action) {
	switch (action.type) {
		case ActionNames.ADD_LANDMARK_MANAGER:
			return { ...state, landmarkmanager: action.data.landmarkmanager, error: null }
		case ActionNames.ADD_LANDMARK_MANAGER_FAILED:
			return { ...state, error: action.data.error, landmarkmanager: null }
		case ActionNames.GET_LANDMARK_MANAGER_BY_VOLUNTEER:
			return { ...state, landmarkmanager: action.data.landmarkmanager, error: null }
		case ActionNames.LANDMARK_MANAGER_LIST:
			return { ...state, landmarkmanagers: action.data.landmarkmanagers, error: null }
		case ActionNames.REMOVE_LANDMARK_MANAGER:
			return { ...state, landmarkmanager: null }
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function LandmarkManagerProvider({ children }) {
	var [state, dispatch] = React.useReducer(landmarkManagerReducer, {
		landmarkmanager: null,
		landmarkmanagers: [],
		error: null
	})

	return (
		<LandmarkManagerStateContext.Provider value={state}>
			<LandmarkManagerDispatchContext.Provider value={dispatch}>
				{children}
			</LandmarkManagerDispatchContext.Provider>
		</LandmarkManagerStateContext.Provider>
	)
}

function useLandmarkManagerState() {
	var context = React.useContext(LandmarkManagerStateContext)
	if (context === undefined) {
		throw new Error('useLandmarkManagerState must be used within a LandmarkManagerProvider')
	}
	return context
}

function useLandmarkManagerDispatch() {
	var context = React.useContext(LandmarkManagerDispatchContext)
	if (context === undefined) {
		throw new Error('useLandmarkManagerDispatch must be used within a LandmarkManagerProvider')
	}
	return context
}

export { LandmarkManagerProvider, useLandmarkManagerState, useLandmarkManagerDispatch }

