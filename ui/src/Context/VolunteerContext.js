import React from 'react'
import * as ActionNames from '../ActionNames';

var VolunteerStateContext = React.createContext()
var VolunteerDispatchContext = React.createContext()

function VolunteerReducer(state, action) {
	switch (action.type) {
		case ActionNames.TOTAL_AREAWSIE_VOLUNTEER:
			return { ...state, totalAreaWiseVolunteer: action.data.total }
		case ActionNames.TOTAL_VOLUNTEER:
			return { ...state, totalVolunteer: action.data.total }
		case ActionNames.GET_VOLUNTEER:
			return { ...state, volunteer: action.data.volunteer }
		case ActionNames.UPDATE_VOLUNTEER:
			return { ...state, volunteer: null }
		case ActionNames.VOLUNTEER_LIST:
			return { ...state, volunteers: action.data.volunteers }
		case ActionNames.AREAWSIE_VOLUNTEER:
			return { ...state, areaWiseVolunteers: action.data.volunteers }
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function VolunteerProvider({ children }) {
	var [state, dispatch] = React.useReducer(VolunteerReducer, {
		totalAreaWiseVolunteer: 0,
		totalVolunteer: 0,
		volunteer: null,
		volunteers: [],
		areaWiseVolunteers:[]
	})

	return (
		<VolunteerStateContext.Provider value={state}>
			<VolunteerDispatchContext.Provider value={dispatch}>
				{children}
			</VolunteerDispatchContext.Provider>
		</VolunteerStateContext.Provider>
	)
}

function useVolunteerState() {
	var context = React.useContext(VolunteerStateContext)
	if (context === undefined) {
		throw new Error('useVolunteerState must be used within a VolunteerProvider')
	}
	return context
}

function useVolunteerDispatch() {
	var context = React.useContext(VolunteerDispatchContext)
	if (context === undefined) {
		throw new Error('useVolunteerDispatch must be used within a VolunteerProvider')
	}
	return context
}

export { VolunteerProvider, useVolunteerState, useVolunteerDispatch }

