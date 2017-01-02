import React, {Component} from 'react';
import {connect} from 'react-redux';

export class FilterPickerRedux extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {dispatch} = this.props;
    const filterBy = event.target.value;
    dispatch({
      type: 'FILTER_CHANGE',
      filterBy
    });
  }

  render() {
    const {filterBy} = this.props;
    const colorRadioOptions = [
      'Name',
      'Director',
      'Year'
    ].map((currentColor, idx) => {
      return (
        <label className="checkbox mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={`option-${idx}`} key={idx}>
          <input
            className="mdl-radio__button"
            id={`option-${idx}`}
            onChange={this.handleChange}
            checked={filterBy === currentColor}
            type="radio"
            name="filter-by"
            value={currentColor}
            />
          <span className="mdl-radio__label">{currentColor}</span>
        </label>
      );
    });
    return (
      <form className="filter-container">Sort by:
        {colorRadioOptions}
      </form>
    );
  }
}

FilterPickerRedux.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  filterBy: React.PropTypes.string.isRequired
};

const mapStateToProps = store => {
  // TODO: REFACTOR looks wierd
  const {filterBy} = store.dataState;
  return {filterBy};
};

export const FilterPicker = connect(mapStateToProps)(FilterPickerRedux);

