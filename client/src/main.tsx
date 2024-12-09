import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router'
import { router } from 'app/routing'
import { ShopContextProvider } from 'shared/context/ShopContext/ShopContext'
import { Provider } from 'react-redux'
import { store } from 'shared/state'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Buffer } from 'buffer'

const manifestUrl = 'https://steamdwarf.github.io/TonVillageClickerAssets/tonconnect-manifest.json';
window.Buffer = window.Buffer || Buffer;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <Provider store={store}>
                <ShopContextProvider>
                    <RouterProvider router={router}/>
                </ShopContextProvider>
            </Provider>
        </TonConnectUIProvider>
    </StrictMode>,
)
