import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log('Naciśnij ESC, aby zamknąć okno modalne');

      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    // console.log('kliknięte w tle');

    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};