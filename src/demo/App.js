import React from 'react';
import Group from '../lib';
import '../lib/components/Group.css';
const App = () => {
  const style1 = { width: '100%' };
  const style2 = { width: '100%', height: '100%' };
  return (
    <Group>
      <div className="box1" data-left="0px" style={style1}>
        1
      </div>
      <div className="box2" data-left="250px" data-bottom="100px">
        2
      </div>
    </Group>
  );
};
export default App;
