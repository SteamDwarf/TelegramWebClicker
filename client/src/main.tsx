import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { AppContextProvider } from 'shared/context'
import { RouterProvider } from 'react-router'
import { router } from 'app/routing'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContextProvider>
            <RouterProvider router={router}/>
        </AppContextProvider>
    </StrictMode>,
)
