import React from 'react';
import { FaHome, FaUserAlt, FaCircle } from 'react-icons/fa';
import { TbLogout, TbLogin } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from './styled';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  function handleLogOut(e) {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  }

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link to="/logout" onClick={(e) => handleLogOut(e)}>
          <TbLogout size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <TbLogin size={24} />
        </Link>
      )}

      <FaCircle size={24} color={isLoggedIn ? 'green' : 'red'} />
    </Nav>
  );
}
