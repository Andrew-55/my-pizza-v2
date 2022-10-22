import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    >
    <circle cx="135" cy="130" r="120" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="420" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="415" rx="25" ry="25" width="145" height="45" />
  </ContentLoader>
);

export default Skeleton;
