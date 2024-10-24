import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Products = ({ productsData, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="py-10 border-t border-gray-200 mb-10">
      <div className="container mx-auto">
        <Carousel
          responsive={responsive}
          showDots={true}
          arrows={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {productsData.map((item, index) => (
            <div key={index} className="relative mx-4" style={{ marginBottom: '30px' }}>
              <div className="w-full">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                />
              </div>
              <div className="content py-3">
                <p className="text-lg font-normal text-gray-500">{item.subtitle}</p>
                <h1 className="text-3xl font-bold text-primary">{item.title}</h1>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Products;
