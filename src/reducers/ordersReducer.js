export function ordersReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "SET_FILTER":
      return { ...state, filterQuery: action.payload };
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map(order =>
          order.orderId === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        )
      };

    default:
      return state;
  }
}
