import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import ChatPage from '../pages/ChatPage';
import SignupPage from '../pages/SignupPage';
import PrivateOutlet from '../components/PrivateOutlet';

const router = createBrowserRouter([
  {
    path: routes.chatPagePath(),
    element: <PrivateOutlet />,
    children: [
      {
        path: '',
        element: <ChatPage />,
      },
    ],
  },
  {
    path: routes.loginPagePath(),
    element: <LoginPage />,
  },
  {
    path: routes.signupPagePath(),
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const RouterConfig = () => <RouterProvider router={router} />;

export default RouterConfig;
