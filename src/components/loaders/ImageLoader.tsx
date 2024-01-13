import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
const ImageLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={90}
      height={90}
      viewBox="0 0 90 90"
      backgroundColor="#212529"
      foregroundColor="#000000">
      <Rect x="1" y="-1" rx="16" ry="16" width="86" height="87" />
    </ContentLoader>
  );
};

export default ImageLoader;
