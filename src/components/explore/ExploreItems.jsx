import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(8);
  const [sortValue, setSortValue] = useState(null);

  useEffect(() => {
    async function fetchExplore() {
      setIsLoading(true);
      const url = sortValue ? `?filter=${sortValue}` : "";
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${url}`
      );
      setExploreItems(data);
      setIsLoading(false);
    }
    fetchExplore();
  }, [sortValue]);

  const loadMore = () => {
    setItemCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => {
            setSortValue(e.target.value);
            setItemCount(8);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ItemCardSkeleton />
            </div>
          ))
        : exploreItems.slice(0, itemCount).map((exploreItem) => (
            <div
              key={exploreItem.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ItemCard
                authorId={exploreItem.authorId}
                authorImage={exploreItem.authorImage}
                expiryDate={exploreItem.expiryDate}
                nftImage={exploreItem.nftImage}
                title={exploreItem.title}
                price={exploreItem.price}
                likes={exploreItem.likes}
              />
            </div>
          ))}
      {exploreItems.length > itemCount && (
        <div className="col-md-12 text-center">
          <button id="loadmore" className="btn-main lead" onClick={loadMore}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
