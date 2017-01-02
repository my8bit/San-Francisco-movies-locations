import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from '../widgets/list';
import {FilterPicker} from '../widgets/filter';
import {SelectPicker} from '../widgets/select';
import config from '../../config.json';
const {enableControlsNew} = config.featureToggle;

class ControlsReduxNew extends Component {
  render() {
    const {filterBy} = this.props;
    return (
      <div className="controls-container">
        <FilterPicker/>
        <div className={filterBy === "Name" ? "visible-block" : "hidden"}><List/></div>
        <div className={filterBy === "Year" ? "visible-block" : "hidden"}><SelectPicker/></div>
      </div>
    );
  }
}

ControlsReduxNew.propTypes = {
  filterBy: React.PropTypes.string.isRequired
};

class ControlsRedux extends Component {
  render() {
    return (
      <div className="controls-container">
        <List/>
      </div>
    );
  }
}

ControlsRedux.propTypes = {
  filterBy: React.PropTypes.string.isRequired
};

const mapStateToProps = store => {
  const {filterBy} = store.dataState;
  return {filterBy};
};

export const Controls = enableControlsNew ? connect(mapStateToProps)(ControlsReduxNew) : connect(mapStateToProps)(ControlsRedux);
