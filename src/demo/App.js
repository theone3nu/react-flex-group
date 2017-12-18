import React from 'react';
import FlexDropdown from '../lib';

const onItemSelect = value => {
  console.log(value);
};

const App = () => {
  // const data = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
  const data = [{label: 'Item1', value: 'item1'}, {label: 'Item2', value:'item2'}, {label:'Item3', value:'item3'}, {label:'Item4', value:'item4'}, {label:'Item5', value:'item5'}];
  return (
    <div>
      <FlexDropdown data={data} editable={true} onItemSelect={onItemSelect} placeholder="Choose" />
    </div>
  );
};
export default App;
