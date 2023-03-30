import React, { Component } from 'react';
import css from './App.module.css'
import api from 'components/Api/Api';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';

export default class App extends Component {
  state = {
    status: 'idle',
    query: [],
    page: 1,
    name: '',
    modalAlt: '',
    showModal: false,
    modalImg: '',
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.name;
    const nextQuery = this.state.name;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevQuery !== nextQuery) {
      this.setState({ query: [], status: 'pending' });
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      api
        .fetchQuery(nextQuery, nextPage)
        .then(({ hits }) => {
          const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          });
          if (images.length > 0) {
            this.setState(prevState => {
              return {
                query: [...prevState.query, ...images],
                status: 'resolved',
              };
            });
          } else {
            alert('Sorry, there are no available images. Please try again.');
            this.setState({ status: 'idle' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSubmitInput = newQuery => {
    if (newQuery !== this.state.name) {
      this.setState({ name: newQuery, page: 1, status: 'pending' });
    }
  };

  handleClickImg = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;
    this.setState({
      showModal: true,
      modalImg: imgForModal,
      modalAlt: altForModal,
    });
  };

  handleClickBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1, status: 'pending' };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { query, showModal, modalImg, modalAlt, error, status } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitInput} />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitInput} />
          {query.length > 0 && <ImageGallery query={query} />}
          <Loader className={css.Loader} />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}
          <div>
            <Searchbar onSubmit={this.handleSubmitInput} />
            <ImageGallery onClickImg={this.handleClickImg} query={this.state.query} />
            <Button handleClickBtn={this.handleClickBtn} />
          </div>
        </>
      );
    }
  }
}