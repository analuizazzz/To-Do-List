import React, { useState } from 'react';
import { TodoWrapper } from './components/TodoWrapper';
import './App.css';
import 'moment/locale/pt-br';
import moment from 'moment';
import { ConfigProvider } from 'antd';

const locale = {
  locale: 'pt-br', 
};

const App: React.FC = () => {
  

  return (
    <ConfigProvider locale={locale}>
    <div >
     <TodoWrapper />
    </div>
    </ConfigProvider>
  );

}

export default App;
