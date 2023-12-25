import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts } = useProducts();
  useEffect(() => {
    setSearchParams({ page: 1, title: search });
    getProducts();
  }, [search]);
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <SearchIcon
            sx={{
              color: "#fff",
              margin: "0 10px 0 0",
              fontSize: "30px",
            }}
          />
        ),
      }}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
      sx={{
        border: "2px solid #fff",
        borderRadius: "10px",
        margin: "10px",
      }}
      id="outlined-basic"
      variant="outlined"
    />
  );
};

export default Search;
