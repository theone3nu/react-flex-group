import React from 'react';
import Group from '../lib';
const App = () => {
  const style1 = { width: '50%', background: 'red' };
  const style2 = { background: 'blue', width: '100%', height: '100%' };
  return (
    <Group>
      <div data-x="0px" style={style1}>
        1
      </div>
     <div data-x="100px" style={style2}>
        2
      </div>
    </Group>
  );
};
export default App;
