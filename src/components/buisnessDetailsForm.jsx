import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card, Dialog } from '@mui/material';

import businessDataStore from '../Store/businessDataStore';

export default function BuisnessDetailsForm(props) {

    const { details, handleClose, open } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        businessDataStore.changeDetails(data);
        handleClose();
    }

    return (
        <Dialog
            onClose={handleClose} open={open}>
            <Card
                component="form"
                sx={{
                    width: '25ch',
                    p: 3,
                    direction: 'rtl',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}

            >
                <TextField
                    label="שם החברה"
                    defaultValue={details.name}
                    {...register('name', { required: true })}
                    error={errors.name ? true : false}
                    helperText={errors.name ? 'This field is required' : ''}
                    type="text"
                    sx={{
                        mb: 1.5,
                        direction: 'rtl'
                    }}
                />

                <TextField
                    label="כתובת"
                    {...register('address', { required: true })}
                    error={errors.password ? true : false}
                    helperText={errors.address ? 'This field is required' : ''}
                    defaultValue={details.address}
                    sx={{
                        mb: 1.5,
                    }}
                />
                <TextField
                    label="טלפון"
                    {...register('phone', { required: true })}
                    error={errors.password ? true : false}
                    helperText={errors.phone ? 'This field is required' : ''}
                    defaultValue={details.phone}
                    sx={{
                        mb: 1.5,
                    }}
                />
                <TextField
                    label="בעלים"
                    {...register('owner', { required: true })}
                    error={errors.owner ? true : false}
                    helperText={errors.owner ? 'This field is required' : ''}
                    defaultValue={details.owner}
                    sx={{
                        mb: 1.5,
                    }}
                />
                <TextField
                    label="לוגו (url)"
                    {...register('logo', { required: true })}
                    error={errors.logo ? true : false}
                    helperText={errors.logo ? 'This field is required' : ''}
                    defaultValue={details.logo}
                    sx={{
                        mb: 1.5,
                    }}
                />
                <TextField
                    label="תיאור"
                    {...register('description', { required: true })}
                    error={errors.description ? true : false}
                    helperText={errors.description ? 'This field is required' : ''}
                    defaultValue={details.description}
                    sx={{
                        mb: 1.5,
                    }}
                />

                <Button type="submit" variant="contained" color="primary">
                    שמור שינויים
                </Button>
            </Card>
        </Dialog>
    );
}