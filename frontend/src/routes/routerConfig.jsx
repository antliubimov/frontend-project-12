import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import PageNotFound from '../pages/404';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: routes.rootPagePath(),
    element: <div>Hello</div>,
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
