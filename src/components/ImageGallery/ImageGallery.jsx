import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map((image, idx) => (
        <ImageGalleryItem
          key={image.id + idx}
          imageUrl={image.webformatURL}
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          alt={image.tags}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
