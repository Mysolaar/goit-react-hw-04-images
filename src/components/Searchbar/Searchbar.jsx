import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === '') {
      toast.warning('Enter data in the search field!');
      return;
    }
    onSubmit(value.trim().toLowerCase());
    reset();
  };

  const reset = () => {
    setValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
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
          onChange={handleInputChange}
          value={value}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
