import { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';

import App from './app';
import ErrorBoundary from './ErrorBoundary';
import { store, persistor } from './redux/store';
import CircularIndeterminate from './utils/loading-spinner';

// delay the rendering of our app’s UI until the persisted data is available in the Redux store.
// persistGate

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<CircularIndeterminate />}>
          {/* loading={<CircularIndeterminate />} in persist gate  */}
          <PersistGate persistor={persistor}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          </PersistGate>
        </Suspense>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
);
