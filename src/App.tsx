import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Button from './components/Button/Button';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <div className="logo-container">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>React + TypeScript + SCSS</h1>
      
      <div className="button-showcase">
        <h2>Button Variants</h2>
        <div className="button-group">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>

        <h2>Button Sizes</h2>
        <div className="button-group">
          <Button size="small" variant="primary">Small</Button>
          <Button size="medium" variant="primary">Medium</Button>
          <Button size="large" variant="primary">Large</Button>
        </div>

        <h2>With Counter</h2>
        <div className="button-group">
          <Button 
            variant="primary" 
            onClick={() => setCount(c => c + 1)}
          >
            Count: {count}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCount(0)}
            disabled={count === 0}
          >
            Reset
          </Button>
        </div>

        <h2>Full Width</h2>
        <Button fullWidth variant="primary">Full Width Button</Button>
      </div>
      
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
