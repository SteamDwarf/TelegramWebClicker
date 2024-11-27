import { lazy } from "react";
import { RouteObject } from "react-router";

const App = lazy(() => import('app/App'))
const GamePage = lazy(() => import('pages/Game'))

const routes:RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <GamePage />,
            }
        ],
    }
];

export default routes;