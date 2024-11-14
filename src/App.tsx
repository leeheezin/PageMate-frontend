import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import AppLayout from './Layout/AppLayout';

const App: React.FC = () => {
  return (
    <AppLayout>
      <AppRoutes/>
    </AppLayout>
  );
};

export default App;
