import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import ProductCard from "./ProductCard";
import Product from "./Product";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import style from "./item.module.css";

const ProductList = () => {
  const { getProducts, products, pages } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  console.log(useSearchParams(), "parms");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      page: currentPage,
    });
  }, [currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);

    console.log(currentPage);
  };

  console.log(pages, "products");
  return (
    <>
      <div className={style.prod}>
        {products.map((card) => (
          <div key={card.id}>
            <Product card={card} />
          </div>
        ))}
      </div>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", margin: "1% 0" }}
        count={pages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </>
  );
};

export default ProductList;
