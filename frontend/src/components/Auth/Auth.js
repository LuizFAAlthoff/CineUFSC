import React from 'react'
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';

const Auth = () => {
  /*Recupera dos dados preenchidos no AuthForm para esse componente */
  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
      .then((res) => console.log(res))
      .catch(err=>console.log);

  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  );
};

export default Auth;