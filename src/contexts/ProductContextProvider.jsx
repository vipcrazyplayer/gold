import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../helpers/consts";
import axios from "axios";
import { getConfig } from "../helpers/functions";

const productContext = createContext();
export const useProducts = () => {
  const context = productContext;
  if (!context) throw new Error("You should use provide this app");
  return useContext(context);
};

const INIT_STATE = {
  products: [],
  oneProduct: null,
  pages: 0,
  categories: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.results,
        pages: Math.ceil(action.payload.count / 6),
      };
    case ACTIONS.GET_ONE_PRODUCT:
      return {
        ...state,
        oneProduct: action.payload,
      };
    case ACTIONS.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getProducts() {
    try {
      const res = await axios.get(
        `${API}products/${window.location.search}`,
        getConfig()
      );

      console.log(res);
      dispatch({
        type: ACTIONS.GET_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const addProduct = async (newProduct, navigate) => {
    try {
      await axios.post(`${API}products/`, newProduct, getConfig());
      getProducts();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}products/${id}/`, getConfig());
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const getOneProduct = async (id) => {
    try {
      const { data } = await axios.get(`${API}products/${id}/`, getConfig());
      dispatch({
        type: ACTIONS.GET_ONE_PRODUCT,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const saveEditedProduct = async (id, newProduct, navigate) => {
    try {
      await axios.patch(`${API}products/${id}/`, newProduct, getConfig());
      navigate("/");
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${API}category/list/`);
      dispatch({
        type: ACTIONS.GET_CATEGORIES,
        payload: data.results,
      });
    } catch (err) {
      console.log(err);
    }
  };

  async function createComment(id, content) {
    try {
      const res = await axios.post(`${API}reviews/`, content, getConfig());
      console.log(res);
      getOneProduct(id);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteComment(productId, commentId) {
    try {
      const res = await axios.delete(
        `${API}reviews/${commentId}/`,
        getConfig()
      );
      console.log(res);
      getOneProduct(productId);
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleLike(id) {
    try {
      const res = await axios.get(
        `${API}products/${id}/toggle_like/`,
        getConfig()
      );
      console.log(res);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <productContext.Provider
      value={{
        getProducts,
        products: state.products,
        oneProduct: state.oneProduct,
        pages: state.pages,
        addProduct,
        deleteProduct,
        getOneProduct,
        getCategories,
        saveEditedProduct,
        categories: state.categories,
        createComment,
        deleteComment,
        toggleLike,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
