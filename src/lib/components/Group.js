import React from 'react';
import './Group.css';

const renderOneChild = (child) => {
	const top = child.props['data-y'];
	// const bottom = child.props['data-bottom'];
	const left = child.props['data-x'];
	//  const right = child.props['data-right'];
	const childStyle = { top, left };
  return  <div style={childStyle} className="groupChild">
		  {child}
   </div>
}

const Group = props => {
  return (
    <div className="groupMain">
     {!props.children.length && renderOneChild(props.children)}
      {props.children.length && props.children.map((child,i )=> {
        const top = child.props['data-y'];
       // const bottom = child.props['data-bottom'];
        const left = child.props['data-x'];
      //  const right = child.props['data-right'];
        const childStyle = { top, left };
        return (
          <div key={i} style={childStyle} className="groupChild">
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default Group;
