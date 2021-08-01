import React, { createContext, useState } from 'react'

export const HomeContext = createContext();

export default function HomeContextProvider(props) {
    const [navigator,setNavigator] = useState(0);
    return (
        <HomeContext.Provider value={{navigator,setNavigator}}>
            {props.children}
        </HomeContext.Provider>
    )
}
