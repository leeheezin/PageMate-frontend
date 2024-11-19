import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import AppLayout from './Layout/AppLayout';
import { Provider } from 'react-redux';
import store from './features/store';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <AppLayout>
        <AppRoutes/>
      </AppLayout>
    </Provider>
  );
};

export default App;
