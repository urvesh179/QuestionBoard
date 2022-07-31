import React from 'react'
import  * as ActionNames from '../ActionNames';

var DonorStateContext = React.createContext()
var DonorDispatchContext = React.createContext()

function DonorReducer(state, action) {
   
	switch (action.type) {
		case ActionNames.TOTAL_DONOR:
			return{...state,totalDonor:action.data.total}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function DonorProvider({ children }) {
	var [state, dispatch] = React.useReducer(DonorReducer, {
        donor:null,
        donors:[],
		error:null,
		totalDonor:0
	})

	return (
		<DonorStateContext.Provider value={state}>
			<DonorDispatchContext.Provider value={dispatch}>
				{children}
			</DonorDispatchContext.Provider>
		</DonorStateContext.Provider>
	)
}

function useDonorState() {
	var context = React.useContext(DonorStateContext)
	if (context === undefined) {
		throw new Error('useUserState must be used within a UserProvider')
	}
	return context
}

function useDonorDispatch() {
	var context = React.useContext(DonorDispatchContext)
	if (context === undefined) {
		throw new Error('useUserDispatch must be used within a UserProvider')
	}
	return context
}

export { DonorProvider,useDonorDispatch,useDonorState }

