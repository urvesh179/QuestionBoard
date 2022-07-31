import React from 'react'
import  * as ActionNames from '../ActionNames';

var PortfolioStateContext = React.createContext()
var PortfolioDispatchContext = React.createContext()

function PortfolioReducer(state, action) {
   
	switch (action.type) {
		case ActionNames.PORTFOLIO_LIST:
			return{...state,portfolios:action.data.portfolios,portfolio:null}
		case ActionNames.ADD_PORTFOLIO:
			return{...state,portfolio:action.data.portfolio}
		case ActionNames.ADD_PORTFOLIO_FAILED:
			return{...state,error:action.data.error}
		case ActionNames.GET_PORTFOLIO:
			return{...state,portfolio:action.data.portfolio}
		case ActionNames.UPDATE_PORTFOLIO:
			return{...state,portfolio:null}
		case ActionNames.REMOVE_PORTFOLIO:
			return{...state,portfolio:null}						
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function PortfolioProvider({ children }) {
	var [state, dispatch] = React.useReducer(PortfolioReducer, {
		portfolios:[],
		portfolio:null,
		error:null
	})

	return (
		<PortfolioStateContext.Provider value={state}>
			<PortfolioDispatchContext.Provider value={dispatch}>
				{children}
			</PortfolioDispatchContext.Provider>
		</PortfolioStateContext.Provider>
	)
}

function usePortfolioState() {
	var context = React.useContext(PortfolioStateContext)
	if (context === undefined) {
		throw new Error('usePortfolioState must be used within a PortfolioProvider')
	}
	return context
}

function usePortfolioDispatch() {
	var context = React.useContext(PortfolioDispatchContext)
	if (context === undefined) {
		throw new Error('usePortfolioDispatch must be used within a PortfolioProvider')
	}
	return context
}

export { PortfolioProvider, usePortfolioState, usePortfolioDispatch }

