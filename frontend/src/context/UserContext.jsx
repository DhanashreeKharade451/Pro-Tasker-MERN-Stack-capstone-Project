import { createContext, useContext, useState, useEffect } from "react";
const UserContext = createContext()

// custom provider to wrap our app
function UserProvider({children}){

    const [user, setUser] = useState(null)

    const value = {
        user,
        setUser
    }

    //restore user on refresh
    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            try{
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser(payload?.data || payload);  //because you user {data: payload}
            }catch(err){
                console.log("Invalid Token");
                 setUser(null);
            }
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return(
        <>
            <UserContext.Provider value={{user, setUser,logout}}>
                {children}
            </UserContext.Provider>
        </>
    );
}

//custom hook to easily access context value

export function useUser(){
    return useContext(UserContext)
}

export default UserProvider;