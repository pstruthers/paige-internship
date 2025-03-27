import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHotCollections() {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollections(data);
      setIsLoading(false);
    }
    fetchHotCollections();
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div
          data-aos="fade-in"
          data-aos-offset="100"
          data-aos-delay="100"
          data-aos-duration="500"
          data-aos-once="true"
          className="row"
        >
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {isLoading
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="nft_coll" key={index}>
                      <div className="nft_wrap">
                        <div className="lazy img-fluid img-skeleton skeleton" />
                      </div>
                      <div className="nft_coll_pp">
                        <div className="lazy pp-coll author-skeleton skeleton" />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <div className="hot_collection_title_skeleton skeleton" />
                        <div className="hot_collection_code_skeleton skeleton" />
                      </div>
                    </div>
                  ))
                : hotCollections.map((hotCollection) => (
                    <div className="nft_coll" key={hotCollection.id}>
                      <div className="nft_wrap">
                        <Link to={`/item-details/${hotCollection.nftId}`}>
                          <img
                            src={hotCollection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${hotCollection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={hotCollection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{hotCollection.title}</h4>
                        </Link>
                        <span>ERC-{hotCollection.code}</span>
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

export default HotCollections;
