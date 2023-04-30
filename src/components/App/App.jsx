import { useEffect, useState } from 'react';
import { getImages } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Searchbar } from '../Searchbar/Searchbar';
import { Modal } from '../Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query !== '') {
      fetchImages(query, page);
    }
  }, [page, query]);

  const fetchImages = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await getImages(query, page);
      if (data.hits.length === 0) {
        return toast.error(
          "We didn't find anything for this search :(  Try another option"
        );
      }

      setTotal(data.totalHits);
      setImages(prev => [...prev, ...data.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onOpenModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };
  const totalPage = total / images.length;
  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery gallery={images} onOpenModal={onOpenModal} />
      )}
      {totalPage > 1 && !isLoading && images.length !== 0 && (
        <Button onClick={onLoadMore} />
      )}
      {showModal && (
        <Modal
          largeImage={largeImage}
          tags={tags}
          onCloseModal={onCloseModal}
        />
      )}
      {error && <p>We didn't find anything for this search</p>}
      <ToastContainer autoClose={1000} />
    </div>
  );
};
