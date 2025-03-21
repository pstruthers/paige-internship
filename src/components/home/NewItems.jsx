import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CountdownTimer from "../CountdownTimer";

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
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="nft__item" key={index}>
                      <div className="author_list_pp">
                        <div className="lazy new-items_author_skeleton skeleton" />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft__item_wrap skeleton" />
                      <div className="nft__item_info">
                        <div className="new-items_title_skeleton skeleton" />
                        <div className="nft__item_info_wrap">
                          <div className="new-items_price_skeleton skeleton" />
                          <div className="new-items_like_skeleton skeleton" />
                        </div>
                      </div>
                    </div>
                  ))
                : newItems.map((newItem) => (
                    <div className="nft__item" key={newItem.id}>
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={newItem.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {newItem.expiryDate && (
                        <CountdownTimer expiryDate={newItem.expiryDate} />
                      )}
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to="/item-details">
                          <img
                            src={newItem.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{newItem.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {newItem.price} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{newItem.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
