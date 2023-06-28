import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, alt, onImageClick }) => {
  const handleClick = () => {
    onImageClick(imageUrl);
  };
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={imageUrl}
        alt={alt}
        width="150"
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
