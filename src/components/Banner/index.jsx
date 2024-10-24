import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
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

const Banner = ({ sliderData, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="mb-10">
      <Carousel responsive={responsive} showDots={true} arrows={false}>
        {sliderData.map((item, index) => (
          <div key={index} className="relative bg-black h-[800px]">
            <div className="w-full">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full"
              />
            </div>
            <div className="absolute h-full w-full z-1 top-0 left-0 right-0 bottom-0">
              <div className="container container mx-auto h-full">
                <div className="row h-full w-full">
                  <div className="col flex flex-col items-left justify-center h-full w-full">
                    <p className="text-lg font-normal text-white">{item.subtitle}</p>
                    <h1 className="text-3xl font-bold text-white">{item.title}</h1>
                    <a
                      href="#order"
                      className="mt-4 px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-primary hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      style={{ display: 'inline-block' }}
                    >
                      Invest Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>

  );
};

export default Banner;
