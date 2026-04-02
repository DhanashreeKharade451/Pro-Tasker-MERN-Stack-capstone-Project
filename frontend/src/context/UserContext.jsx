import { createContext, useContext, useState } from "react";
const UserContext = createContext(null)

// custom provider to wrap our app
function UserProvider({children}){

    const [user, setUser] = useState(null)

    const value = {
        user,
        setUser
    }

    return(
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}

//custom hook to easily access context value

export function useUser(){
    return useContext(UserContext)
}

export default UserProvider;