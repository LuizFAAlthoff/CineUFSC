import React from 'react'
import AuthForm from './AuthForm';

const Auth = () => {
  /*Recupera dos dados preenchidos no AuthForm para esse componente */
  const getData = (data) => {
    console.log("Auth", data);

  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  );
};

export default Auth;