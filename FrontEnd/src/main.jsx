import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from '../src/QueryClient';
import { Provider } from 'react-redux';
import { persistor, store } from '../src/components/redux/store.js';
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    {/* <StrictMode> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    {/* </StrictMode> */}
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>

)
