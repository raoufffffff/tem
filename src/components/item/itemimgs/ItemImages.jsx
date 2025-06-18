import React, { useRef, useState } from 'react'
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
const ItemImages = ({ imgs }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  // Mapping the images for the larger view
  const myimg = imgs.map((e, i) => (
    <div key={i} className="min-w-full item-img rounded-xl mx-[10px] snap-center">
      <img
        onClick={() => {
          setVisible(true)
          setIndex(i); // Update the index to the clicked image's index
        }}
        src={e}
        alt={"item"}
        width={300}
        height={300}
        className="min-w-full mb-2 hover:scale-110 transition-all"
      />
    </div>
  ));

  // Mapping the smaller images (thumbnails)
  const minimgs = imgs.map((e, i) => (
    <span
      key={i}
      className="w-[20%] item-img overflow-hidden border-red-600 rounded-xl mx-1"
      onClick={() => scrollToImage(i)} // Click handler for small images
    >
      <img
        src={e}
        alt={"item"}
        width={300}
        height={300}
        className="min-w-full mb-2 hover:scale-110 transition-all"
      />
    </span>
  ));

  // Scroll to the corresponding large image
  const scrollToImage = (index) => {
    const containerWidth = ref.current.offsetWidth;
    const scrollPosition = containerWidth * index;
    ref.current.scrollLeft = scrollPosition;
  };

  return (
    <div className="w-full flex flex-col md:py-3 md:px-5">
      <div
        ref={ref}
        className="w-full a flex scroll-smooth snap-mandatory snap-x overflow-x-scroll"
      >
        {myimg}
      </div>
      <div className="w-full flex flex-wrap">{minimgs}</div>

      {/* Photo Slider */}
      <PhotoSlider
        images={imgs.map((item) => ({ src: item, key: item }))} // Providing the correct image array for the slider
        visible={visible} // Control the visibility of the photo slider
        onClose={() => setVisible(false)} // Close handler for the slider
        index={index} // Set the starting index for the slider
        onIndexChange={setIndex} // Update the index when the slider changes
      />

    </div>
  );
};

export default ItemImages;
