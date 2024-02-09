import React from 'react';
// import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
} from 'react-bootstrap';
import routes from '../routes/routes';
import { useAuth } from '../hooks';

const Navbar = () => {
  const { logOut, user } = useAuth();
  const { t } = useTranslation();
  return (
    <BootstrapNavbar className="bg-body-tertiary">
      <Container>
        <BootstrapNavbar.Brand href={routes.chatPagePath()}>{t('simpleChat')}</BootstrapNavbar.Brand>
        {!user && (
          <Nav.Link href={routes.signupPagePath()}>
            <Button variant="outline-primary">{t('loginup')}</Button>
          </Nav.Link>
        )}
        {!!user && <Button onClick={logOut}>{t('logout')}</Button>}
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
