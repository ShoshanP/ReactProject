import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { toJS } from 'mobx';
import { observer } from "mobx-react-lite";

import Button from '@mui/material/Button';
import { AppBar, Container, Stack, Toolbar } from '@mui/material';

import servicesStore from "../Store/servicesStore";



const NavBar = observer(() => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [listToShow, setListToShow] = useState("");
    const services = toJS(servicesStore.data);
    const handleClickServices = () => {
        setAnchorElNav(null);
        setListToShow("services");
    }
    const handleClickMeetings = () => {
        setAnchorElNav(null);
        setListToShow("meetings");
    }
    return (
        <>
            <AppBar position='static' sx={{ width: '100%' }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Link to="/admin/services">
                                <Button
                                    size='large'
                                    key="SERVICES"
                                    onClick={handleClickServices}
                                    sx={{ color: 'white' }}
                                >
                                    שירותי העסק
                                </Button>

                            </Link>
                            <Link to="/admin/meetings">
                                <Button
                                    size='large'
                                    key="MEETINGS"
                                    onClick={handleClickMeetings}
                                    sx={{ color: 'white' }}
                                >
                                    פגישות
                                </Button>
                            </Link>

                        </Stack>
                    </Toolbar>
                </Container>

            </AppBar>
            <Outlet />
        </>
    );
});

export default NavBar;
