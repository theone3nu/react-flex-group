# React Dropdown with keyboard handlers. Press down and up arrows to select. Manually type to filter the items.

## Install

`npm install react-flex-dropdown --save`

## Usage
```
import React from 'react';
import FlexDropdown from 'react-flex-dropdown';

const onItemSelect = (value) => {
    console.log(value);
}

const data = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
            or
const data = [
              {label: 'Item1', value: 'item1'},
              {label: 'Item2', value:'item2'},
              {label:'Item3', value:'item3'},
              {label:'Item4', value:'item4'},
              {label:'Item5', value:'item5'}
              ];

const App = () => {
        return <div>
            <FlexDropdown data={data} editable={true} placeholder='Choose' onItemSelect={onItemSelect}/>
        </div>
}
export default App;


```

