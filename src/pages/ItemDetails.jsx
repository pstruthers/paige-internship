import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();

  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchItemDetails() {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );
      setItemDetails(data);
      setIsLoading(false);
    }
    fetchItemDetails();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <>
                  <div className="col-md-6 text-center">
                    <div className="img-fluid img-rounded mb-sm-30 nft-image nft-image-skeleton skeleton" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <div className="nft-title-skeleton skeleton" />
                      <div className="item_info_counts">
                        <div className="item_info_views item_info_counts_skeleton" />
                        <div className="item_info_like item_info_counts_skeleton" />
                      </div>
                      <div className="nft-description-skeleton skeleton" />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div className="nft-author-skeleton skeleton" />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <div className="nft-author-name-skeleton skeleton" />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6 className="creator-skeleton">Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div className="nft-author-skeleton skeleton" />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <div className="nft-author-name-skeleton skeleton" />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <div className="nft-price-skeleton skeleton" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={itemDetails?.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {itemDetails?.title} #{itemDetails?.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemDetails?.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemDetails?.likes}
                        </div>
                      </div>
                      <p>{itemDetails?.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails?.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails?.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails?.ownerId}`}>
                                {itemDetails?.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails?.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails?.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails?.creatorId}`}>
                                {itemDetails?.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{itemDetails?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
