import * as React from "react";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { useProducts } from "../../contexts/ProductContextProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import Back from "./Back";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Product = ({ card }) => {
  const [expanded] = React.useState(false);
  const [opn, setOpn] = React.useState(0);
  const [cls, setCls] = React.useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const { getProducts, deleteProduct, toggleLike } = useProducts();

  return (
    <>
      <Back />
      <Box
        sx={{
          margin: "30% auto 0",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Card
          key={card.id}
          sx={{
            maxWidth: 300,
            width: 500,
            height: `${+card.id === +opn ? "485px" : "405px"}`,
          }}
        >
          <Typography
            sx={{
              margin: "10px 0",
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "Reaver, serif",
              fontWeight: "700",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {card.title}
          </Typography>
          <CardMedia
            component="img"
            sx={{ height: 220, width: "100%" }}
            image={card.image}
            alt={card.title}
            title={card.title}
          />
          <CardActions sx={{ justifyContent: "space-between" }}>
            <CardActions sx={{ gap: 1 }}>
              {card.likes == 0 ? (
                <div onClick={() => toggleLike(card.id)}>
                  <FavoriteBorderIcon />
                </div>
              ) : (
                <div onClick={() => toggleLike(card.id)}>
                  <FavoriteIcon color="error" />
                </div>
              )}
              {card.likes}
            </CardActions>
            <CardActions sx={{ justifyContent: "end" }}>
              <Link to={`/details/${card.id}`}>
                <CropFreeIcon sx={{ color: "#000" }} />
              </Link>
              <ExpandMore
                expand={expanded}
                onClick={() => {
                  if (!cls) {
                    setOpn(+card.id);
                    setCls(true);
                  } else {
                    setOpn(0);
                    setCls(false);
                  }
                }}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </CardActions>
          <Collapse
            in={+opn === +card.id ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                Price: {card.price} $
              </Typography>
            </CardContent>
          </Collapse>
          {card.is_author && (
            <CardActions sx={{ justifyContent: "space-evenly" }}>
              <Link to={`/edit/${card.id}`}>
                <Button variant="contained" color="info">
                  Update
                </Button>
              </Link>
              <Button
                onClick={() => deleteProduct(card.id)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </CardActions>
          )}
        </Card>
      </Box>
    </>
  );
};

export default Product;
