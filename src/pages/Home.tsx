import React from 'react';
import { Counter } from '../components/Counter';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to CalCommander</p>
      <div>
        <h2>Redux Counter Example</h2>
        <Counter />
      </div>
    </div>
  );
};

export default Home; 