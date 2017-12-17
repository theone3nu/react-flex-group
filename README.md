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

const App = () => {
        const data = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
        return <div>
            <FlexDropdown data={data} editable={true} placeholder='Choose' onItemSelect={onItemSelect}/>
        </div>
}
export default App;


```

