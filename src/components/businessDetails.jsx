import { useContext, useState } from "react";

import { observer } from "mobx-react-lite";
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, Typography, Box, IconButton, CardMedia, Divider } from "@mui/material";

import { UserContext } from "./services/servicesList";

import businessDataStore from "../Store/businessDataStore";
import BuisnessDetailsForm from "./buisnessDetailsForm";


const BusinessDetails = observer(() => {

    const isAdmin = useContext(UserContext);
    const businessDetails = businessDataStore.data;
    const [enableEditDetails, setEnableEditDetails] = useState(false);

    function handleClickDetailsForm() {
        setEnableEditDetails(true);
    }

    const handleClose = () => {
        setEnableEditDetails(false);
    }

    return (
        <Card sx={{ width: 600, margin: 'auto', overflow: 'hidden', fontFamily: 'Rubik, sans-serif' }}>
            <CardMedia
                component="img"
                sx={{ width: '100%', objectFit: 'cover', maxHeight: 200 }}
                src={businessDetails.logo}
                alt="Business Logo"

            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent sx={{ flex: '1 0 auto', width: '100%', textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {businessDetails.name}
                    </Typography>
                    <Typography variant="h6" sx={{}}>
                        {businessDetails.description}
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                    <Typography variant="p" sx={{}}>
                        בעלים: {businessDetails.owner} | {businessDetails.address} |  טלפון: {businessDetails.phone}
                    </Typography>


                </CardContent>
                {isAdmin.isAdmin && (
                    <Box sx={{ alignSelf: 'flex-start' }}>
                        <IconButton color="primary" onClick={handleClickDetailsForm}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>
            {enableEditDetails && <BuisnessDetailsForm details={businessDetails} handleClose={handleClose} open={enableEditDetails} />}
        </Card>
    );
});

export default BusinessDetails;
