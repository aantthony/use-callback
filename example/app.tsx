import React from 'react';
import ReactDOM from 'react-dom';
import useCallback from '../lib/index';

const Child = React.memo(function Child(props: {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}) {
  return (
    <div>
      <div>ID: {(Math.random() * 10000).toFixed(0)}</div>
      <button type="button" onClick={props.onClick}>Button</button>
    </div>
  );
});

function App() {
  const [count, setCount] = React.useState(0);
  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setCount(count + 1);
  });
  return (
    <div>
      <div>{count}</div>
      <Child onClick={onClick} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
