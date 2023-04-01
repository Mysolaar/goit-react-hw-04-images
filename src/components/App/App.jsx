import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import api from 'components/Api/Api';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';

export default function App() {
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setStatus('pending');
        const { hits } = await api.fetchQuery(name, page);
        const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });
        if (images.length > 0) {
          setQuery(prevQuery => [...prevQuery, ...images]);
          setStatus('resolved');
        } else {
          alert('Sorry, there are no available images. Please try again.');
          setStatus('idle');
        }
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    };
    if (name !== '') {
      fetchImages();
    }
  }, [name, page]);

  const handleSubmitInput = newQuery => {
    if (newQuery !== name) {
      setName(newQuery);
      setPage(1);
      setStatus('pending');
      setQuery([]);
    }
  };

  const handleClickImg = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;
    setShowModal(true);
    setModalImg(imgForModal);
    setModalAlt(altForModal);
  };

  const handleClickBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  if (status === 'idle') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmitInput} />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmitInput} />
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
          <Modal onClose={toggleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )}
        <div>
          <Searchbar onSubmit={handleSubmitInput} />
          <ImageGallery onClickImg={handleClickImg} query={query} />
          <Button handleClickBtn={handleClickBtn} />
        </div>
      </>
    );
  }
}
