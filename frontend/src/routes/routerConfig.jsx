import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageNotFound from '../pages/404';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello</div>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const RouterConfig = () => <RouterProvider router={router} />;

export default RouterConfig;
