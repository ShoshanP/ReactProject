import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';

import { baseURL } from '../../main';

export default function LoginPage({ onLoginSuccess, onLoginError }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/login`, data);
      const status = response.status;

      if (status === 200) {
        console.log('Login Success');
        onLoginSuccess();

      } else {
        console.log('Login Failed');
        onLoginError('שם משתמש וסיסמה אינם תקינים');
      }
    } catch (error) {
      console.log('Login Failed', error);
      onLoginError('שם משתמש וסיסמה אינם תקינים');
      reset();
    }
  };

  return (
    <Card
      component="form"
      sx={{
        width: '25ch',
        p: 3,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="User Name"
        {...register('name', { required: true })}
        error={errors.name ? true : false}
        helperText={errors.name ? 'שדה חובה' : ''}
        type="text"
        sx={{
          mb: 1.5,
        }}
      />

      <TextField
        label="Password"
        {...register('password', { required: true })}
        error={errors.password ? true : false}
        helperText={errors.password ? 'שדה חובה' : ''}
        type="password"
        sx={{
          mb: 1.5,
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Card>
  );
}
