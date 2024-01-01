import { createContext, useContext, useState, forwardRef } from "react";

import { toJS } from 'mobx';
import { observer } from "mobx-react-lite";

import { Grid, Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import servicesStore from "../../Store/servicesStore";

import ServiceItem from "./serviceItem";
import AddServiceForm from "./addServiceForm";
import CreateMeetForm from "../meetings/createMeetForm";


export const UserContext = createContext(null);
export const AlertContext = createContext(null);

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ServicesList = observer(() => {
    const isAdmin = useContext(UserContext);
    const services = toJS(servicesStore.data);
    const [addService, setAddService] = useState(false);
    const [createMeet, setCreateMeet] = useState(false);
    const [bool, setBool] = useState(false);


    function handleClickAddService() {
        setAddService(true);
    }

    function handleClickCreateMeet() {
        setCreateMeet(true);
    }

    const handleServiceClose = () => {
        setAddService(false);

    }

    const handleMeetClose = () => {
        setCreateMeet(false);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setBool(false);

    };

    return (
        <>
            {isAdmin.isAdmin && <Button sx={{ m: 1 }} onClick={handleClickAddService} variant="contained" size="medium">הוסף שירות לעסק</Button>}
            {!isAdmin.isAdmin && <Button sx={{ m: 1 }} onClick={handleClickCreateMeet} variant="contained" size="medium">לקביעת פגישה</Button>}
            <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
                {services.map((item) => (
                    <Grid item key={item.id} sx={{ direction: 'rtl' }} xs={12} md={4}>
                        <ServiceItem {...item} />
                    </Grid>
                ))}
            </Grid>
            {addService && <AlertContext.Provider value={{ bool, setBool }}><AddServiceForm handleClose={handleServiceClose} open={addService} /></AlertContext.Provider>}
            {createMeet && <AlertContext.Provider value={{ bool, setBool }}><CreateMeetForm handleClose={handleMeetClose} open={createMeet} /></AlertContext.Provider>}

            <Snackbar open={bool} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    הפעולה בוצעה בהצלחה                </Alert>
            </Snackbar>
        </>
    );
});

export default ServicesList;
