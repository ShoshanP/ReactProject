import { useContext } from "react";

import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

import servicesStore from "../../Store/servicesStore";
import { UserContext } from "./servicesList";

export default function ServiceItem(props) {

    const { id, name, description, price, duration } = props;
    const isAdmin = useContext(UserContext);


    console.log("hfh");
    return (
        <Card sx={{ minWidth: 275, height: 350 }}>

            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mt: 5 }}>
                    {name}
                </Typography>
                <Typography variant="h5">
                    {description}
                </Typography>
                <Typography varient="p">
                    מחיר: {price} | משך זמן: {duration}
                </Typography>
            </CardContent>
            <CardActions>

            </CardActions>

        </Card>
    )

}