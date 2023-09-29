import React, { createContext } from 'react'
export interface UserContextFields {
    user: {}
    setUser: React.Dispatch<React.SetStateAction<{}>>
}

export const userContext = createContext<UserContextFields>({} as UserContextFields)

export const useUserContext = (): UserContextFields => {
    const context = React.useContext(userContext)
    if (!context) throw new Error('userContextFields must be used inside userContext.Provider')

    return context
}