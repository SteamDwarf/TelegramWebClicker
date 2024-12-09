import { lazy } from "react";
import { RouteObject } from "react-router";
import { Loader } from "shared/UI/Loader/Loader";

const App = lazy(() => import('app/App'));
const GamePage = lazy(() => import('pages/Game'));
const Shop = lazy(() => import('pages/Shop'));
const Profile = lazy(() => import('pages/Profile'));

const routes:RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <GamePage />,
            },
            {
                path: 'shop',
                element: <Shop />,
            },
            {
                path: 'profile',
                element: <Profile />
            }
        ],
    }
];

export default routes;