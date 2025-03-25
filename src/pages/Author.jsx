import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [followerText, setFollowerText] = useState("Follow");
  const [followerCount, setFollowerCount] = useState(null);

  useEffect(() => {
    async function fetchAuthor() {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthor(data);
      setFollowerCount(data.followers);
      setIsLoading(false);
    }
    fetchAuthor();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  {isLoading ? (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <div className="profile_avatar_skeleton skeleton" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name profile_name_skeleton">
                            <div className="author_name_skeleton skeleton" />
                            <div className="author_tag_skeleton skeleton" />
                            <div className="author_address_skeleton skeleton" />
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower_skeleton skeleton" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author?.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author?.authorName}
                              <span className="profile_username">
                                @{author?.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author?.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followerCount} followers
                          </div>
                          <button
                            className="btn-main"
                            onClick={() => {
                              setFollowerText((prevText) =>
                                prevText === "Follow" ? "Unfollow" : "Follow"
                              );
                              setFollowerCount(
                                followerText === "Follow"
                                  ? author?.followers + 1
                                  : author?.followers
                              );
                            }}
                          >
                            {followerText}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
