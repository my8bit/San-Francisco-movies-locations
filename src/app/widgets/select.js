import React, {Component} from 'react';
import {connect} from 'react-redux';

class SelectPickerRedux extends Component {
  render() {
    // const {years} = this.props;
    const years = ['1991', '2016'].map((year, idx) => {
      return <li key={idx} className="mdl-menu__item" data-val="BLR">{year}</li>;
    });
    const yearsListEl = years;
    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select">
        <input className="mdl-textfield__input" id="country" name="country" value="Belarus" type="text" readOnly tabIndex="-1" data-val="BLR"/>
        <label className="mdl-textfield__label" htmlFor="country">Country</label>
        <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu" htmlFor="country">
          {yearsListEl}
        </ul>
      </div>
    );
  }
}

SelectPickerRedux.propTypes = {
  currentYear: React.PropTypes.string.isRequired,
  years: React.PropTypes.array.isRequired
};

const mapStateToProps = store => {
  const {currentYear, years} = store.dataState;
  return {currentYear, years};
};

export const SelectPicker = connect(mapStateToProps)(SelectPickerRedux);
