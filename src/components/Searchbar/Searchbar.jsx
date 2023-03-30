import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { FiSearch } from 'react-icons/fi';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInputChange = e => {
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      toast.warning('Enter data in the search field!');
      return;
    }
    this.props.onSubmit(this.state.value.trim().toLowerCase());
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <IconContext.Provider value={{ size: '1.5em' }}>
              <div>
                <FiSearch />
              </div>
            </IconContext.Provider>

            <span className={css.SearchForm__button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};