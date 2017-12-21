import React from 'react';
import './Group.css';

const Group = props => {
  return (
    <div className="groupMain">
      {props.children.map((child,i )=> {
        const top = child.props['data-top'];
        const bottom = child.props['data-bottom'];
        const left = child.props['data-left'];
        const right = child.props['data-right'];
        const childStyle = { top, bottom, left, right };
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
