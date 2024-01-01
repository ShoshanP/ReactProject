import { Link } from "react-router-dom";

import BusinessDetails from "./businessDetails";
import ServicesList, { UserContext } from "./services/servicesList";

export default function User() {
    return (
        <UserContext.Provider value={{ isAdmin: false }}>
            <BusinessDetails />
            <ServicesList />
            <Link to={"/admin"}>גלוש כמנהל</Link>

            <footer >Copyright © buildings by Shoshi Paley 2024</footer>

        </UserContext.Provider>
    )
}