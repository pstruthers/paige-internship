import React, { useEffect, useState } from "react";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNewItems() {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setIsLoading(false);
    }
    fetchNewItems();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 979,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {isLoading
                ? new Array(4)
                    .fill(0)
                    .map((_, index) => <ItemCardSkeleton key={index} />)
                : newItems.map((newItem) => (
                    <ItemCard
                      key={newItem.id}
                      authorId={newItem.authorId}
                      authorImage={newItem.authorImage}
                      expiryDate={newItem.expiryDate}
                      nftId={newItem.nftId}
                      nftImage={newItem.nftImage}
                      title={newItem.title}
                      price={newItem.price}
                      likes={newItem.likes}
                    />
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
