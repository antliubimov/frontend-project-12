import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import PageNotFound from '../pages/404';
import Login from '../pages/Login';
import Chat from '../pages/Chat';

const router = createBrowserRouter([
  {
    path: routes.rootPagePath(),
    element: <Chat />,
  },
  {
    path: routes.loginPagePath(),
    element: <Login />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const RouterConfig = () => <RouterProvider router={router} />;

export default RouterConfig;
