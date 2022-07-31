import React from 'react'
import * as ActionNames from '../ActionNames';

var FoodRequestStateContext = React.createContext()
var FoodRequestDispatchContext = React.createContext()

function FoodRequestReducer(state, action) {

	switch (action.type) {
		case ActionNames.FOOD_REQUEST_LIST:
			return { ...state, foodrequests: action.data.foodrequests }
		case ActionNames.ADD_FOOD_REQUEST:
			return { ...state, foodrequest: action.data.foodrequest }
		case ActionNames.ADD_FOOD_REQUEST_FAILED:
			return { ...state, error: action.data.error }
		case ActionNames.GET_FOOD_REQUEST:
			return { ...state, foodrequest: action.data.foodrequest }
		case ActionNames.UPDATE_FOOD_REQUEST:
			return { ...state, foodrequest: null }
		case ActionNames.REMOVE_FOOD_REQUEST:
			return { ...state, foodrequest: null }
		case ActionNames.TOTAL_AREAWSIE_FOODREQUEST:
			return{...state,totalAreaWiseFoodRequest:action.data.total}
		case ActionNames.AREAWSIE_FOODREQUEST:
			return{...state,areaWiseFoodRequest:action.data.areaWiseFoodRequest}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function FoodRequestProvider({ children }) {
	var [state, dispatch] = React.useReducer(FoodRequestReducer, {
		foodrequests: [],
		foodrequest: null,
		error: null,
		totalAreaWiseFoodRequest:0,
		areaWiseFoodRequest:[]
	})

	return (
		<FoodRequestStateContext.Provider value={state}>
			<FoodRequestDispatchContext.Provider value={dispatch}>
				{children}
			</FoodRequestDispatchContext.Provider>
		</FoodRequestStateContext.Provider>
	)
}

function useFoodRequestState() {
	var context = React.useContext(FoodRequestStateContext)
	if (context === undefined) {
		throw new Error('useFoodRequestState must be used within a FoodRequestProvider')
	}
	return context
}

function useFoodRequestDispatch() {
	var context = React.useContext(FoodRequestDispatchContext)
	if (context === undefined) {
		throw new Error('useFoodRequestDispatch must be used within a FoodRequestProvider')
	}
	return context
}

export { FoodRequestProvider, useFoodRequestState, useFoodRequestDispatch }

