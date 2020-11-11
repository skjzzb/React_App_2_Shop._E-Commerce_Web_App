export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket"))
    ? JSON.parse(localStorage.getItem("basket"))
    : [],
  wishlist: [],
  user: null,
  search: "",
  guest: "",
};

// Selector

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.qty + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "SET_BASKET":
      const newBsaket = action.item;

      return { ...state, basket: action.item };
    case "SET_GUEST":
      return { ...state, guest: action.guest };
    case "SEARCH_PRODUCT":
      return { ...state, search: action.search };
    case "CLEAR_CART":
      return { ...state, basket: [] };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        basket: [...state.wishlist, action.item],
      };
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };
    case "UPDATE_TO_BASKET":
      state.basket.map((item) => {
        if (item.id === action.id) {
          let qt = action.qty;

          item.qty = qt;
          return item;
        } else {
          return item;
        }
      });
      let newBasket = [...state.basket];
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
