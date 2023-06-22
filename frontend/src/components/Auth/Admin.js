import React from 'react'
import AuthForm from './AuthForm';
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';

const Admin = () => {
  // Retorna a referencia para o dispatch da redux store
  const dispatch = useDispatch()
  /*Recupera dos dados preenchidos no AuthForm para esse componente */
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
    .then((res)=> console.log(res))
    .then(()=>dispatch(adminActions.login()))
    .catch(err => console.log(err));

  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  );
};

export default Admin;