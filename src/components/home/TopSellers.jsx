import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopSellers() {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(data);
      setIsLoading(false);
    }
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
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
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="lazy pp-author top-sellers_pp_skeleton skeleton" />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div className="top-sellers_name_skeleton skeleton" />
                        <div className="top-sellers_price_skeleton skeleton" />
                      </div>
                    </li>
                  ))
                : topSellers.map((topSeller) => (
                    <li key={topSeller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${topSeller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={topSeller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${topSeller.authorId}`}>
                          {topSeller.authorName}
                        </Link>
                        <span>{topSeller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
