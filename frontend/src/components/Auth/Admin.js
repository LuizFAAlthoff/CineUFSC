import React from 'react'
import AuthForm from './AuthForm';
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Admin = () => {
  const navigate = useNavigate()
  // Gerencia persistencia da sessão do admin
  const dispatch = useDispatch()
  const onResReceived = (data) =>{
    dispatch(adminActions.login())
    localStorage.setItem("adminID", data.id)
    localStorage.setItem("token", data.token)
    navigate("/");
  }

  // Retorna a referencia para o dispatch da redux store
  /*Recupera dos dados preenchidos no AuthForm para esse componente */
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
    .then(onResReceived)
    .catch(err => console.log(err));

  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  );
};

export default Admin;