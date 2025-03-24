const ItemCardSkeleton = () => {
	return (
    <div className="nft__item">
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
  );
};

export default ItemCardSkeleton;