import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './FlexDropDown.css';

class FlexDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { showDropdown: false, data: props.data, filteredData: props.data, selectedText: '' };
    this.onFocusOut = this.onFocusOut.bind(this);
  }

  onFocusOut(e) {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      if (this.state.showDropdown) {
        this.setState({ showDropdown: false, active: false });
        ReactDOM.findDOMNode(this).removeEventListener('keydown', this.keyDownHandler);
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onFocusOut);
  }

  componentDidUpdate() {
    if (this.state.active) {
      ReactDOM.findDOMNode(this.dropdownInput).focus();
    }
  }

  onInputChange = e => {
    if (e.target.value === '') {
      this.setState({ showDropdown: false, selectedText: '', filteredData: this.state.data });
    } else {
      const filteredData = this.state.data.filter(
        item => item.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
      this.setState({ showDropdown: true, filteredData, selectedText: e.target.value });
    }
  };

  onItemSelect = e => {
    this.setState({ showDropdown: false, selectedText: e.target.textContent });
  };

  onFocus = e => {
    ReactDOM.findDOMNode(this).removeEventListener('keydown', this.keyDownHandler);
    ReactDOM.findDOMNode(this).addEventListener('keydown', this.keyDownHandler);
    this.setState({ active: true });
  };

  keyDownHandler = e => {
    if (this.state.filteredData.length === 0) {
      return;
    }
    if (e.keyCode === 40) {
      const selectedIndex = this.state.filteredData.findIndex(
        item => item.toLowerCase() === this.state.selectedText.toLowerCase()
      );
      this.setState({ showDropdown: true});
      if (selectedIndex === -1) {
        this.setState({ selectedText: this.state.filteredData[0] });
        return;
      }
      if (selectedIndex !== this.state.filteredData.length - 1) {
        this.setState({ selectedText: this.state.filteredData[selectedIndex + 1] });
      } else {
        this.setState({ selectedText: this.state.filteredData[selectedIndex] });
      }
    } else if (e.keyCode === 38) {
      const selectedIndex = this.state.filteredData.findIndex(
        item => item.toLowerCase() === this.state.selectedText.toLowerCase()
      );
			this.setState({ showDropdown: true});
      if (selectedIndex === -1) {
        this.setState({ selectedText: this.state.filteredData[0] });
        return;
      }
      if (selectedIndex !== 0) {
        this.setState({ selectedText: this.state.filteredData[selectedIndex - 1] });
      } else {
        this.setState({ selectedText: this.state.filteredData[selectedIndex] });
      }
    }
    if(this.selectedLi) {
      const isVisible = this.isElementInViewport(ReactDOM.findDOMNode(this.selectedLi));
      if(!isVisible) {
				ReactDOM.findDOMNode(this.selectedLi).scrollIntoView();
      }
		}
  };

	isElementInViewport (el) {

		var rect     = el.getBoundingClientRect(),
			vWidth   = window.innerWidth || document.documentElement.clientWidth,
			vHeight  = window.innerHeight || document.documentElement.clientHeight,
			efp      = function (x, y) { return document.elementFromPoint(x, y) };

		// Return false if it's not in the viewport
		if (rect.right < 0 || rect.bottom < 0
			|| rect.left > vWidth || rect.top > vHeight)
			return false;

		// Return true if any of its four corners are visible
		return (
			el.contains(efp(rect.left,  rect.top))
			||  el.contains(efp(rect.right, rect.top))
			||  el.contains(efp(rect.right, rect.bottom))
			||  el.contains(efp(rect.left,  rect.bottom))
		);
	}

  componentWillUnmount() {
    window.removeEventListener('click', this.onFocusOut);
  }

  renderList() {
    return (
      <ul className="dropdownList">
        {this.state.filteredData.map((item, i) => {
          const selected = item === this.state.selectedText ? 'selected' : '';
          return (
            <li
              key={i}
              ref={li => {
                if (selected) {
                  this.selectedLi = li;
                }
              }}
              onClick={this.onItemSelect}
              className={selected}
            >
              {item}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className="dropdown" onClick={this.onFocus} tabIndex="0">
        <div className="inputArrow">
          <input
            ref={input => {
              this.dropdownInput = input;
            }}
            disabled={!this.props.editable}
            onChange={this.onInputChange}
            value={this.state.selectedText}
          />
          <p onClick={() => this.setState({ showDropdown: !this.state.showDropdown })}>C</p>
        </div>
        {this.state.showDropdown && this.renderList()}
      </div>
    );
  }
}

FlexDropDown.defaultProps = {
  data: []
}
export default FlexDropDown;
