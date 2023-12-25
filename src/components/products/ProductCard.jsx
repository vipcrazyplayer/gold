import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";

const ProductCard = ({ card }) => {
  const { deleteProduct, toggleLike } = useProducts();
  return (
    <div className="w-1/3" key={card.id}>
      <img width={200} src={card.image} alt={card.title} />
      <h3>Title: {card.title}</h3>
      <h4>Price: {card.price}$</h4>
      <h4>Category: {card.category.title}</h4>
      <h4>Reviews: {card.reviews.length}</h4>
      <h4>Likes: {card.likes}</h4>
      <p>{card.description.slice(0, 20)}...</p>
      <Button onClick={() => toggleLike(card.id)}>Like</Button>
      <Link to={`/details/${card.id}`}>
        <Button variant="contained" color="info">
          Details
        </Button>
      </Link>
      {card.is_author && (
        <div>
          <Link to={`/edit/${card.id}`}>
            <Button variant="contained"> Edit</Button>
          </Link>
          <Button
            onClick={() => {
              deleteProduct(card.id);
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
