import React from 'react';
import FlexDropdown from '../lib';

const onItemSelect = (value) => {
    console.log(value);
}

const App = () => {
        const data = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
        return <div>
            <FlexDropdown data={data} editable={true} onItemSelect={onItemSelect}/>
        </div>
}
export default App;
