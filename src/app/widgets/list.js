import React, {Component} from 'react';
import Autocomplete from 'react-autocomplete';
import {connect} from 'react-redux';
import {initAction, getMoviesAction, changeAction} from '../actions/action';

const menuStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  overflow: 'auto',
  width: '300px',
  zIndex: '2',
  maxHeight: '50%'
};

class ListRedux extends Component {
  constructor(props) {
    super(props);
    this.handleSelectItemFromList = this.handleSelectItemFromList.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.refCallback = this.refCallback.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevValue = prevProps.value;
    const currValue = this.props.value;
    // TODO: simplify
    if ((prevValue === '' && currValue !== '') ||
        (prevValue !== '' && currValue === '')) {
      this.textfield
        .MaterialTextfield
        .checkDirty();
    }
  }

  refCallback(textfield) {
    this.textfield = textfield;
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(initAction());
  }

  matchStateToTerm(state, value) {
    return state.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  }

  renderItem(item, isHighlighted) {
    // TODO: on mouse hover performance issues
    return (
      <div
        className={isHighlighted ? "highlightedItem" : "regularItem"}
        key={item}
        >
        {item}
      </div>
    );
  }

  mapListItem(title, idx) {
    return <li key={idx}>{title}</li>;
  }

  renderListItem(movie, idx) {
    const {img} = this.props;
    console.log(movie);
    return (
      <li
        className="mdl-list__item mdl-list__item--three-line list-element"
        key={idx}
        >
        <div className="mdl-list__item-primary-content content-element">
          <div>{`${movie[8]} (${movie[9]})`}</div>
          <div className="mdl-list__item-text-body">
            <div>Director: {movie[14]}</div>
            <div>Production: {movie[12]}</div>
          </div>
        </div>
        <img className="image" src={img}/>
      </li>
    );
  }

  handleSelectItemFromList(event, value) {
    // TODO: clear results
    const {dispatch, moviesData} = this.props;
    dispatch(getMoviesAction(moviesData, value));
  }

  render() {
    const {movieTitles, movies, value, label, inputDisabled} = this.props;
    const moviesListEl = movies.map(this.renderListItem)[0]; // TODO: return first currently
    return (
      <div className="list">
        <div
          className="name-input mdl-textfield mdl-js-textfield"
          ref={this.refCallback}
          >
          <label className="mdl-textfield__label" htmlFor="title-autocomplete">{label}</label>
          <Autocomplete
            menuStyle={menuStyle}
            value={value}
            inputProps={{
              disabled: inputDisabled, // TODO: fix
              autoFocus: true,
              name: "Movie title",
              className: "mdl-textfield__input",
              id: "title-autocomplete"
            }}
            wrapperStyle={{display: "initial"}}
            items={movieTitles}
            getItemValue={function (item) {
              return item;
            }}
            shouldItemRender={this.matchStateToTerm}
            onSelect={this.handleSelectItemFromList}
            onChange={this.handleChange}
            renderItem={this.renderItem}
            />
        </div>
        <ul className="mdl-list">{moviesListEl}</ul>
      </div>
    );
  }

  handleChange(event, value) {
    const {dispatch} = this.props;
    dispatch(changeAction(value));
  }
}

ListRedux.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  movieTitles: React.PropTypes.array.isRequired,
  moviesData: React.PropTypes.array.isRequired,
  movies: React.PropTypes.array.isRequired,
  value: React.PropTypes.string.isRequired,
  img: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  inputDisabled: React.PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  // TODO: REFACTOR looks wierd
  const {movieTitles, moviesData, movies, value, img, label, inputDisabled} = store.dataState;
  return {movieTitles, moviesData, movies, value, img, label, inputDisabled};
};

export const List = connect(mapStateToProps)(ListRedux);
