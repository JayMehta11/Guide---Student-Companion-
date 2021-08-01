import React, { createContext, useState } from 'react'

export const GlobalLoadingContext = createContext();

export default function GlobalLoadingContextProvider(props) {
    const [globalLoading,setGlobalLoading] = useState(false);
    return (
        <GlobalLoadingContext.Provider value={{globalLoading,setGlobalLoading}}>
            {props.children}
        </GlobalLoadingContext.Provider>
    )
}
