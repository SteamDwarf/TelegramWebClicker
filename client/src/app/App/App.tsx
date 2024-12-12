import './App.scss'
import { TonContextProvider } from 'shared/context/TonContext/TonContext';
import Layout from 'pages/Layout';
import { CloudStorage } from 'features/CloudStorage';

export function App() {
    

    return (
        <TonContextProvider>
            <CloudStorage />
            <Layout />
        </TonContextProvider>
    )
}

