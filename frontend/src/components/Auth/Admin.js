import React from 'react'
import AuthForm from './AuthForm';
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';

const Admin = () => {
  /*Recupera dos dados preenchidos no AuthForm para esse componente */
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
    .then((res)=> console.log(res))
    .catch(err => console.log(err));

  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  );
};

export default Admin;