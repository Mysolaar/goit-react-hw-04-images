//button load more

import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ handleClickBtn }) {
    return (
        <button className={css.Button} type="button" onClick={handleClickBtn}>
            Load more
        </button>
    );
}

Button.propTypes = {
  handleClickBtn: PropTypes.func.isRequired,
};