import { Container } from "@mui/material";

import BusinessDetails from "./businessDetails";
import NavBar from "./navBar";
import { UserContext } from "./services/servicesList";

export default function AdminPage() {
    return (
        <>
        <Container>
            <UserContext.Provider value={{isAdmin: true}}>

            <BusinessDetails />
            <NavBar />
           
            </UserContext.Provider>
             
        </Container>
        
        </>
    )
}