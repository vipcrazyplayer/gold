import React, { useEffect, useState } from "react";

import { useProducts } from "../../contexts/ProductContextProvider";
import { useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Add from "./Add";

const Details = () => {
  const { getOneProduct, oneProduct, createComment, deleteComment } =
    useProducts();

  const [comment, setComment] = useState("");

  const [open, setOpen] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    getOneProduct(id);
  }, []);

  function saveComment() {
    let newComment = new FormData();
    newComment.append("text", comment);
    newComment.append("product", id);
    createComment(id, newComment);
  }

  return (
    <>
      <Add />

      {oneProduct ? (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "25%",
            margin: "10% 0 0 2%",
            gap: "5px",
            textAlign: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <h3>Title: {oneProduct.title}</h3>
          <h3>Description: {oneProduct.description}</h3>
          <h3>Price: {oneProduct.price} $</h3>
          <h3>Category: {oneProduct.category.title}</h3>
          {oneProduct.image ? (
            <img width={250} src={oneProduct.image} alt={oneProduct.title} />
          ) : (
            <h3>There is no images here!</h3>
          )}

          <h4>Reviews:</h4>
          {oneProduct.reviews.map((item) => {
            console.log(item);
            return (
              <div key={item.id}>
                <span>{item.text}</span>
                {item.is_author ? (
                  <Button
                    onClick={() => deleteComment(oneProduct.id, item.id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                ) : null}
              </div>
            );
          })}
          <Button onClick={() => setOpen(!open)} variant="contained">
            Add Comment
          </Button>
          {open && (
            <div>
              <h4>Create Review</h4>
              <TextField
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                label="comment"
              />
              <Button onClick={saveComment} variant="text">
                Save comment
              </Button>
            </div>
          )}
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Details;
