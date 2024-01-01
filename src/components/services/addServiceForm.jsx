import { useState, useContext } from 'react';

import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card, Dialog,Alert } from '@mui/material';


import servicesStore from '../../Store/servicesStore';
import { AlertContext } from './servicesList';

export default function AddServiceForm({ handleClose, open }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(false);
    const { bool, setBool } = useContext(AlertContext);

    const onSubmit = async (data) => {
        try {
            const status = await servicesStore.addService(data);
            if (status === 200) {
                setError(false);
                setBool(true);

                handleClose();
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Card
                    component="form"
                    sx={{
                        width: '25ch',
                        p: 3,
                        direction: 'rtl',
                    }}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {error && <Alert severity="error">פגישה זו כבר קיימת!</Alert>}
                    <TextField
                        label="סוג פגישה"
                        {...register('name', { required: true })}
                        error={errors.name ? true : false}
                        helperText={errors.name ? 'שדה חובה' : ''}
                        type="text"
                        sx={{
                            mb: 1.5,
                            direction: 'rtl'
                        }}
                    />

                    <TextField
                        label="תיאור"
                        {...register('description', { required: true })}
                        error={errors.description ? true : false}
                        helperText={errors.description ? 'שדה חובה' : ''}
                        type="text"
                        sx={{
                            mb: 1.5,
                        }}
                    />

                    <TextField
                        label="משך זמן"
                        {...register('duration', { required: true, type: Number })}
                        error={errors.duration ? true : false}
                        helperText={errors.duration ? 'שדה חובה' : ''}
                        sx={{
                            mb: 1.5,
                        }}
                    />

                    <TextField
                        label="מחיר"
                        {...register('price', { required: true, type: Number })}
                        error={errors.price ? true : false}
                        helperText={errors.price ? 'שדה חובה' : ''}
                        type="text"
                        sx={{
                            mb: 1.5,
                        }}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        שמור שינויים
                    </Button>
                </Card>
            </Dialog>


        </>
    );
}
