import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
    image: null,
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
        // image: oneProduct.image,
      });
    }
  }, [oneProduct]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProductObj({ ...newProductObj, [name]: files[0] });
    } else {
      setNewProductObj({ ...newProductObj, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProduct = new FormData();
    updatedProduct.append("title", newProductObj.title);
    updatedProduct.append("description", newProductObj.description);
    updatedProduct.append("price", newProductObj.price);
    updatedProduct.append("category", newProductObj.category);
    if (newProductObj.image) {
      updatedProduct.append("image", newProductObj.image);
    }

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
          name="title"
          label="Title"
          variant="outlined"
          value={newProductObj.title}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          value={newProductObj.description}
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Price"
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
        {/* <FormControl sx={{ width: "260px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            onChange={handleChange}
            name="category"
          >
            {categories.map((cat) => (
              <MenuItem value={cat.id}>{cat.title}</MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Button type="submit" variant="contained">
          Save changes
        </Button>
      </Box>
    </>
  );
};

export default EditProduct;
