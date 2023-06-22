import React from 'react'
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';

const Auth = () => {
  // Retorna a referencia para o dispatch da redux store
  const dispatch = useDispatch()
  /*Recupera dos dados preenchidos no AuthForm para esse componente */
  /* Valida usuário com o backend */
  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
      .then((res) => console.log(res))
      .then(() => dispatch(userActions.login()))
      .catch(err=>console.log);

  };
  return (
    <div>     
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  );
};

export default Auth;