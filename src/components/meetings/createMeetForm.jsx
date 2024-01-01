import { useState ,useContext} from 'react';
import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card, Dialog, Alert, MenuItem, Select, InputLabel, Input } from '@mui/material';

import servicesStore from '../../Store/servicesStore';
import meetingsStore from '../../Store/meetingsStore';
import { AlertContext } from '../services/servicesList';

function CreateMeetForm(props) {
    const { handleClose, open } = props;
    const { bool, setBool } = useContext(AlertContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState(false);
    const [type, setType] = useState('');
    const [isDateValid,setIsDateValid]=useState(true);
    const handleChange = (event) => {
        setType(event.target.value);
    }

    const onSubmit = async (data) => {
        const chooseService = servicesStore.data.find(s => s.name = data.type);
        const newMeet = {
            serviceName: chooseService.name,
            serviceDescription: chooseService.description,
            servicePrice: chooseService.price,
            dateTime: data.date,
            clientName: data.name,
            clientPhone: data.phone,
            clientEmail: data.mail
        }
        console.log(newMeet);
        try {
            const response = await meetingsStore.addMeeting(newMeet);
            console.log("res",response);
            if (response === 200) {
                setBool(true);
                setError(false);
                
                handleClose();
                
            }
        } catch (error) {
            setError(true);
           setIsDateValid(false);
        }
    };
    return (
        <Dialog
            onClose={handleClose} open={open}>
            <Card
                component="form"
                sx={{
                    width: '35ch',
                    p: 3,
                    direction: 'rtl',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'right'

                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                {error && <Alert severity="error">תאריך זה תפוס, בחר תאריך אחר!</Alert>}
                <InputLabel id="demo-select-small-label" required>סוג פגישה</InputLabel>
                <Select
                    {...register('type', { required: true })}
                    error={errors.type ? true : false}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={type}
                    label="בחר סוג פגישה"
                    onChange={handleChange}
                    sx={{
                        mb: 1,
                        textAlign: 'right',
                        direction: 'rtl'
                    }}
                >
                    {servicesStore.data.map(
                        meet =>
                            <MenuItem value={meet.name}>
                                {meet.name}
                            </MenuItem>)}

                </Select>
                <TextField
                    placeholder="שם לקוח"

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
                    placeholder="טלפון"
                    {...register('phone', {
                        required: true,
                        pattern: /^\d+$/,
                    })}
                    error={errors.phone}
                    helperText={errors.phone ? 'Please enter a valid phone number' : ''}
                    type="phone"
                    sx={{
                        mb: 1.5,
                    }}
                />

                <TextField
                    placeholder="מייל"
                    {...register('mail', {
                        required: false,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    error={errors.mail}
                    helperText={errors.mail ? 'Please enter a valid email address' : ''}
                    type='email'
                    sx={{
                        mb: 1.5,
                    }}
                />
                <TextField
                    placeholder="תאריך ושעה"
                    {...register("date", { required: true })}
                    error={errors.date}
                    helperText={errors.date ? 'Please enter a valid date and time' : ''}
                    type="datetime-local"
                    sx={{
                        mb: 1,
                    }}
                />
                {!isDateValid && <Alert severity="warning">תאריך זה תפוס</Alert>}
                <Button type="submit" variant="contained" color="primary">
                    קבע פגישה
                </Button>
            </Card>
        </Dialog>
    );
}
export default CreateMeetForm;