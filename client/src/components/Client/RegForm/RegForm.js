import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sagaRegAC } from '../../../redux/actionCreators/regFormAC';
import styles from './RegForm.module.scss';

// const checkEmptyFields = (fields) => {
//   fields.every(field => field.value.length);
// };

function RegForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const regSubmit = (e) => {
    e.preventDefault();
    // dispatch(sagaRegAC());
    const { action, method, email, name, phone, password } = e.target;
    // const fields = [email, password];
    // const Empty = checkEmptyFields(fields);
    // if(Empty) {
    const user = {
      action,
      method,
      email: email.value,
      name: name.value,
      phone: phone.value,
      password: password.value,
    };
    const payload = user;
    dispatch(sagaRegAC(payload));
    history.push('/menu');
    // }
    // else {
    // alert('Заполните все поля')
    // пока заглушка
    // }
  };

  return (
    <form
      className={styles.center}
      action='http://localhost:1234/api/clients/new'
      method='POST'
      name='regForm'
      onSubmit={regSubmit}
    >
      <input type='text' name='name' placeholder='Name' />
      <input type='text' name='email' placeholder='Email' />
      <input type='phone' name='phone' placeholder='Enter your phone' />
      <input type='password' name='password' placeholder='Enter your password' />
      <button type='submit'>Зарегистрироваться</button>
    </form>
  );
}

export default RegForm;
