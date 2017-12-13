import React from 'react';
import FlexDropdown from '../lib';
const App = () => {
        const data = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
        return <div>
            <FlexDropdown data={data}/>
        </div>
}
export default App;
