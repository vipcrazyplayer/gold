import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import Add from "./Add";

const EditProduct = () => {
  const {
    getCategories,
    categories,
    getOneProduct,
    oneProduct,
    saveEditedProduct,
  } = useProducts();
  const [newProductObj, setNewProductObj] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    getOneProduct(id);
  }, []);

  useEffect(() => {
    if (oneProduct) {
      console.log(oneProduct);
      setNewProductObj({
        title: oneProduct.title,
        description: oneProduct.description,
        price: oneProduct.price,
        category: oneProduct.category.id,
        image: oneProduct.image,
      });
    }
  }, [oneProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductObj({ ...newProductObj, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProduct = new FormData();
    updatedProduct.append("title", newProductObj.title);
    updatedProduct.append("description", newProductObj.description);
    updatedProduct.append("price", newProductObj.price);
    updatedProduct.append("category", newProductObj.category);
    updatedProduct.append("image", newProductObj.image);

    saveEditedProduct(id, newProductObj, navigate);
  };

  return (
    <>
      <Add />
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "25%",
          margin: "10% 0 0 10%",
          border: "2px solid #1976D2",
          borderRadius: "20px",
          gap: "5px",
          padding: "30px 0",
        }}
        noValidate
        autoComplete="off"
      >
        <h2 className="text-center text-xl font-semibold">Update product</h2>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={newProductObj.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={newProductObj.description}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={newProductObj.price}
          onChange={handleChange}
        />
        <select name="category" onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
        <TextField
          label="Image"
          name="image"
          type="url"
          variant="outlined"
          value={newProductObj.image}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Save changes
        </Button>
      </Box>
    </>
  );
};

export default EditProduct;
