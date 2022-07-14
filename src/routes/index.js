import React from 'react';
import { Switch } from 'react-router-dom';

import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import NotLogged from '../pages/NotLogged';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} isClosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute exact path="/aluno/" component={Aluno} isClosed />
      <MyRoute exact path="/fotos/:id" component={Fotos} isClosed />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/notlogged" component={NotLogged} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
