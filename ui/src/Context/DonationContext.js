import React from 'react'
import * as ActionNames from '../ActionNames';

var DonationStateContext = React.createContext()
var DonationDispatchContext = React.createContext()

function DonationReducer(state, action) {

    switch (action.type) {
        case ActionNames.TOTAL_MONEY_DONATION:
            return { ...state, totalMoney: action.data.total }
        case ActionNames.TOTAL_FOOD_DONATION:
            return { ...state, totalFood: action.data.total }
        case ActionNames.MONEY_DONATION_LIST:
            return { ...state, moneydonation: action.data.moneydonation }
        case ActionNames.FOOD_DONATION_LIST:
            return { ...state, fooddonation: action.data.fooddonation }
        case ActionNames.FOOD_DELIVERY_LIST:
            return { ...state, fooddelivery: action.data.fooddelivery }
        case ActionNames.AREAWSIE_FOODDONATION:
            return{...state,areaWiseFoodDonation:action.data.areaWiseFoodDonation}
        case ActionNames.UNCHECKED_QUALITY:
            return{...state,uncheckedQuality:action.data.uncheckedQuality}
        case ActionNames.UPDATE_QUALITY:
            return{...state}
        case ActionNames.GOOD_QUALITY:
            return{...state,goodQuality:action.data.goodQuality}
        case ActionNames.ADD_FOOD_DELIVERY:
            return{...state}
        case ActionNames.UPDATE_DELIVERY_STATUS:
            return{...state}
        case ActionNames.REDIRECT_FOOD:
            return{...state}
        case ActionNames.PENDING_DELIVERY:
            return{...state,pendingDelivery :action.data.pendingDelivery}
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function DonationProvider({ children }) {
    var [state, dispatch] = React.useReducer(DonationReducer, {
        totalMoney: 0,
        totalFood: 0,
        moneydonation: [],
        fooddonation: [],
        fooddelivery: [],
        areaWiseFoodDonation:[],
        uncheckedQuality:[],
        goodQuality:[],
        pendingDelivery:[]

    })

    return (
        <DonationStateContext.Provider value={state}>
            <DonationDispatchContext.Provider value={dispatch}>
                {children}
            </DonationDispatchContext.Provider>
        </DonationStateContext.Provider>
    )
}

function useDonationState() {
    var context = React.useContext(DonationStateContext)
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider')
    }
    return context
}

function useDonationDispatch() {
    var context = React.useContext(DonationDispatchContext)
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider')
    }
    return context
}

export { DonationProvider, useDonationDispatch, useDonationState }

