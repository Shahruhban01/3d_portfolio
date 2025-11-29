import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0e27',
          color: '#fff',
          fontFamily: 'monospace',
          padding: '20px'
        }}>
          <h1 style={{ color: '#ff006e', marginBottom: '20px' }}>⚠️ 3D Scene Error</h1>
          <p style={{ marginBottom: '10px' }}>Something went wrong loading the 3D experience.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#00ffcc',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Reload Page
          </button>
          <details style={{ marginTop: '30px', maxWidth: '600px' }}>
            <summary style={{ cursor: 'pointer', color: '#00ffcc' }}>Error Details</summary>
            <pre style={{ 
              marginTop: '10px', 
              padding: '10px', 
              background: '#000', 
              borderRadius: '5px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
