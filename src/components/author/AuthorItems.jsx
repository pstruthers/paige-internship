import React from "react";
import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";

const AuthorItems = ({ author, isLoading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading
            ? new Array(8)
                .fill(0)
                .map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <ItemCardSkeleton />
                  </div>
                ))
            : author?.nftCollection.map((collection) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={collection.id}
                >
                  <ItemCard
                    authorImage={author?.authorImage}
                    nftImage={collection.nftImage}
                    title={collection.title}
                    price={collection.price}
                    likes={collection.likes}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
