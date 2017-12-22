# React absolute layout container that aligns the child elements using x and y coordinates.

## Install

`npm install react-flex-group --save`

## How to use
## Inspired from Apache flex spark group component.
By default width and height of group container is 100% so adjust width and height of child elements with respect to the parent container ##
#Width and height of child elements depends on the width you have given. It doesn't depends on the content.##


## Usage
```
import React from 'react';
import Group from 'react-flex-group';
const App = () => {
  const style1 = { background: 'red', width: '100%' };
  const style2 = { background: 'blue', width: '100%', height: '100%' };
  return (
    <Group>
      <div data-x="0px" style={style1}>
        1
      </div>
      <div data-x="250px" data-y="100px" style={style2}>
        2
      </div>
    </Group>
  );
};
export default App;




```

