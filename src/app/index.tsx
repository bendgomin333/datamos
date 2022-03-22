import React from 'react';
import { Layout } from '../features/layout';
import { withProviders } from './providers';
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default withProviders(App)
