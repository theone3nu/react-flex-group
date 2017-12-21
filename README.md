# React absolute layout container that aligns the child elements using top left bottom right values.

## Install

`npm install react-flex-group --save`

## Usage
```
import React from 'react';
import Group from '../lib';
const App = () => {
  const style1 = { background: 'red', width: '100%' };
  const style2 = { background: 'blue', width: '100%', height: '100%' };
  return (
    <Group>
      <div data-left="0px" style={style1}>
        1
      </div>
      <div data-left="250px" data-top="100px" style={style2}>
        2
      </div>
    </Group>
  );
};
export default App;




```

