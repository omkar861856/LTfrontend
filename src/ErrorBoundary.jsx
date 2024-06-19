import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button type='button' onClick={resetErrorBoundary}>Try again</button>
    </div>
  );

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

const ErrorBoundary = ({ children }) => (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ReactErrorBoundary>
  );

  
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
  

export default ErrorBoundary;