import React from 'react'
import * as ActionNames from '../ActionNames';

var LandmarkStateContext = React.createContext()
var LandmarkDispatchContext = React.createContext()

function landmarkReducer(state, action) {
	
	switch (action.type) {
		case ActionNames.ADD_LANDMARK:
			return { ...state, landmark: action.data.landmark, error: null }
		case ActionNames.ADD_LANDMARK_FAILED:
			return { ...state, error: action.data.error, landmark: null }
		case ActionNames.LANDMARK_LIST:
			return { ...state, landmarks: action.data.landmarks }
		case ActionNames.REMOVE_LANDMARK:
			return { ...state, landmark:null}
		case ActionNames.GET_LANDMARK:
			return { ...state, landmark:action.data.landmark}
		case ActionNames.UPDATE_LANDMARK:
			return {...state,landmark:null}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function LandmarkProvider({ children }) {
	var [state, dispatch] = React.useReducer(landmarkReducer, {
		landmark: null,
		landmarks: [],
		error: null,
	})

	return (
		<LandmarkStateContext.Provider value={state}>
			<LandmarkDispatchContext.Provider value={dispatch}>
				{children}
			</LandmarkDispatchContext.Provider>
		</LandmarkStateContext.Provider>
	)
}

function useLandmarkState() {
	var context = React.useContext(LandmarkStateContext)
	if (context === undefined) {
		throw new Error('useLandmarkState must be used within a LandmarkProvider')
	}
	return context
}

function useLandmarkDispatch() {
	var context = React.useContext(LandmarkDispatchContext)
	if (context === undefined) {
		throw new Error('useLandmarkDispatch must be used within a LandmarkProvider')
	}
	return context
}

export { LandmarkProvider, useLandmarkState, useLandmarkDispatch }

