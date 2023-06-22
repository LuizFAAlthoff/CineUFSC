import React from 'react'
import AuthForm from './AuthForm';
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';

const Admin = () => {
  // Gerencia persistencia da sessão do admin
  const dispatch = useDispatch()
  const onResReceived = (data) =>{
    console.log(data);
    dispatch(adminActions.login())
    localStorage.setItem("adminID", data.id)
    localStorage.setItem("token", data.token)
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