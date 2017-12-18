import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './FlexDropDown.css';

class FlexDropDown extends Component {
  constructor(props) {
    super(props);
    const data = props.data.map(item => {
      if(!item.value) {
        return {
          label: item,
          value: item
        }
      }
      return item;
    })
    this.state = { showDropdown: false, data, filteredData: data, selectedItem: '', selectedText: '' };
  }

  onFocusOut = e => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      if (this.state.showDropdown) {
        this.setState({ showDropdown: false, active: false });
        ReactDOM.findDOMNode(this).removeEventListener('keydown', this.keyDownHandler);
      }
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.onFocusOut);
  }

  componentDidUpdate() {
    if (this.state.active) {
      ReactDOM.findDOMNode(this.dropdownInput).focus();
    }
  }

  onInputChange = e => {
    if (e.target.value === '') {
      this.setState({ showDropdown: false, selectedItem: '', filteredData: this.state.data, selectedText: '' });
    } else {
      const filteredData = this.state.data.filter(item => item.label.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
      this.setState({ showDropdown: true, filteredData, selectedText: e.target.value });
    }
  };

  onItemSelect(item) {
    this.setState({ showDropdown: false, selectedText: item.label });
    this.props.onItemSelect(item.value);
  };

  onFocus = e => {
    ReactDOM.findDOMNode(this).removeEventListener('keydown', this.keyDownHandler);
    ReactDOM.findDOMNode(this).addEventListener('keydown', this.keyDownHandler);
    this.setState({ active: true });
  };

  keyDownHandler = e => {
    const { filteredData, selectedText } = this.state;
    if (filteredData.length === 0) {
      return;
    }
    if (e.keyCode === 13) {
      const selectedIndex = filteredData.findIndex(item => item.label.toLowerCase() === selectedText.toLowerCase());
      const selectedItem = filteredData.find(item => item.label.toLowerCase() === selectedText.toLowerCase());
      if (selectedIndex === -1) {
        return;
      } else {
        this.props.onItemSelect(selectedItem.value);
        this.setState({ showDropdown: false, selectedText: selectedItem.label });
        return;
      }
    } else if (e.keyCode === 40) {
      const selectedIndex = filteredData.findIndex(item => item.label.toLowerCase() === selectedText.toLowerCase());
      this.setState({ showDropdown: true });
      if (selectedIndex === -1) {
        this.setState({ selectedText: filteredData[0].label });
        return;
      }
      if (selectedIndex !== filteredData.length - 1) {
        this.setState({ selectedText: filteredData[selectedIndex + 1].label, selectedItem: filteredData[selectedIndex + 1] });
      } else {
        this.setState({ selectedText: filteredData[selectedIndex].label, selectedItem: filteredData[selectedIndex] });
      }
    } else if (e.keyCode === 38) {
      const selectedIndex = filteredData.findIndex(item => item.label.toLowerCase() === selectedText.toLowerCase());
      this.setState({ showDropdown: true });
      if (selectedIndex === -1) {
        this.setState({ selectedText: filteredData[0].label, selectedItem: filteredData[0] });
        return;
      }
      if (selectedIndex !== 0) {
        this.setState({ selectedText:filteredData[selectedIndex -1].label, selectedItem: filteredData[selectedIndex - 1] });
      } else {
        this.setState({ selectedText: filteredData[selectedIndex].label, selectedItem: filteredData[selectedIndex] });
      }
    }
    if (this.selectedLi) {
      const isVisible = this.isElementInViewport(ReactDOM.findDOMNode(this.selectedLi));
      if (!isVisible) {
        ReactDOM.findDOMNode(this.selectedLi).scrollIntoView();
      }
    }
  };

  isElementInViewport(el) {
    var rect = el.getBoundingClientRect(),
      vWidth = window.innerWidth || document.documentElement.clientWidth,
      vHeight = window.innerHeight || document.documentElement.clientHeight,
      efp = function(x, y) {
        return document.elementFromPoint(x, y);
      };

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false;

    // Return true if any of its four corners are visible
    return (
      el.contains(efp(rect.left, rect.top)) ||
      el.contains(efp(rect.right, rect.top)) ||
      el.contains(efp(rect.right, rect.bottom)) ||
      el.contains(efp(rect.left, rect.bottom))
    );
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onFocusOut);
  }

  renderList() {
    const { filteredData, selectedText } = this.state;
    return (
      <ul className="dropdownList">
        {filteredData.map((item, i) => {
          const selected = item.label === selectedText ? 'selected' : '';
          return (
            <li
              key={item.value}
              ref={li => {
                if (selected) {
                  this.selectedLi = li;
                }
              }}
              onClick={() => this.onItemSelect(item)}
              className={selected}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { placeholder, editable } = this.props;
    const { selectedText, showDropdown } = this.state;
    return (
      <div className="dropdown" onClick={this.onFocus} tabIndex="0">
        <div className="inputArrow">
          <input
            ref={input => {
              this.dropdownInput = input;
            }}
            placeholder={placeholder}
            disabled={!editable}
            onChange={this.onInputChange}
            value={selectedText}
          />
          <span
            className={showDropdown ? 'dropdown-arrow-open' : 'dropdown-arrow-close'}
            onClick={() => this.setState({ showDropdown: !showDropdown })}
          />
        </div>
        {showDropdown && this.renderList()}
      </div>
    );
  }
}

FlexDropDown.defaultProps = {
  data: [],
  editable: false,
  placeholder: 'Select',
  onItemSelect: () => {}
};
FlexDropDown.proptypes = {
  onItemSelect: PropTypes.func,
  data: PropTypes.array
};
export default FlexDropDown;
