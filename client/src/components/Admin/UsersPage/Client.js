import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {DEL_CLIENTS} from '../../../redux/actionTypes/actionType'

const { REACT_APP_URL } = process.env;

function Client({ client }) {
  const dispatch = useDispatch();

  const deleteClient = () => {    
    dispatch({ type: DEL_CLIENTS, payload: client.id })
    fetch(`${REACT_APP_URL}api/сlients/delete/${client.id}`, {
      method: 'DELETE',
    })
    .then(console.log)
  }

  return (
    <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
      <p>{client.name}</p>
      <p>{client.email}</p>
      <p>{client.phone}</p>
      <Link to={`/clients/${client.id}`} className="uk-button uk-button-default">Редактировать</Link>
      <button onClick={deleteClient}>Удалить</button>
    </div>
  );
}

export default Client;

