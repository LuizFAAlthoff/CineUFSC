import React from 'react'
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';

const Auth = () => {
  //Gerencia persistencia da sessão do usuário
  const onResReceived = (data) => {
    console.log(data);
    dispatch(userActions.login())
    localStorage.setItem("userID",data.id);

  }
  // Retorna a referencia para o dispatch da redux store
  const dispatch = useDispatch()
  /*Recupera dos dados preenchidos no AuthForm para esse componente */
  /* Valida usuário com o backend */
  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch(err=>console.log);

  };
  return (
    <div>     
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  );
};

export default Auth;