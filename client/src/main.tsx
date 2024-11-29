import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { AppContextProvider } from 'shared/context'
import { RouterProvider } from 'react-router'
import { router } from 'app/routing'
import { ShopContextProvider } from 'shared/context/ShopContext/ShopContext'
import { Provider } from 'react-redux'
import { store } from 'shared/state'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <AppContextProvider>
                <ShopContextProvider>
                    <RouterProvider router={router}/>
                </ShopContextProvider>
            </AppContextProvider>
        </Provider>
        
    </StrictMode>,
)
