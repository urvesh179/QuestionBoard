import React from 'react'
import * as ActionNames from '../ActionNames';

var ReceiverCategoryStateContext = React.createContext()
var ReceiverCategoryDispatchContext = React.createContext()

function ReceiverCategoryReducer(state, action) {
	console.log(action.type);
	switch (action.type) {
		case ActionNames.ADD_RECEIVER_CATEGORY:
			return { ...state, receivercategory: action.data.receivercategory, error: null }
		case ActionNames.ADD_RECEIVER_CATEGORY_FAILED:
			return { ...state, error: action.data.error, receivercategory: null }
		case ActionNames.RECEIVER_CATEGORY_LIST:
			return { ...state, receivercategories: action.data.receivercategories }
		case ActionNames.REMOVE_RECEIVER_CATEGORY:
			return { ...state, receivercategory:null}
		case ActionNames.GET_RECEIVER_CATEGORY:
			return { ...state, receivercategory:action.data.receivercategory}
		case ActionNames.UPDATE_RECEIVER_CATEGORY:
			return {...state,receivercategory:null}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function ReceiverCategoryProvider({ children }) {
	var [state, dispatch] = React.useReducer(ReceiverCategoryReducer, {
		receivercategory: null,
		receivercategories: [],
		error: null,
	})

	return (
		<ReceiverCategoryStateContext.Provider value={state}>
			<ReceiverCategoryDispatchContext.Provider value={dispatch}>
				{children}
			</ReceiverCategoryDispatchContext.Provider>
		</ReceiverCategoryStateContext.Provider>
	)
}

function useReceiverCategoryState() {
	var context = React.useContext(ReceiverCategoryStateContext)
	if (context === undefined) {
		throw new Error('useReceiverCategoryState must be used within a ReceiverCategoryProvider')
	}
	return context
}

function useReceiverCategoryDispatch() {
	var context = React.useContext(ReceiverCategoryDispatchContext)
	if (context === undefined) {
		throw new Error('useReceiverCategoryDispatch must be used within a ReceiverCategoryProvider')
	}
	return context
}

export { ReceiverCategoryProvider, useReceiverCategoryState, useReceiverCategoryDispatch }

