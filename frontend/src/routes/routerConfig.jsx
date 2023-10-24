import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageNotFound from "../pages/404";

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello</div>,
  },
  {
    path: '/login',
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const RouterConfig = () => <RouterProvider router={router} />;

export default RouterConfig;