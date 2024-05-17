export const TOKEN_STORAGE_KEY = "VK_TOKEN";
export const REDUX_PERSIST_KEY = "VK_STORAGE";
export const E_STATUS_ORDER = {
  INITIAL: "INITIAL",
  CONFIRMED: "CONFIRMED",
  DELIVERING: "DELIVERING",
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
};
export const STATUS_ORDER = {
  [E_STATUS_ORDER.INITIAL]: "Đặt hàng thành công",
  [E_STATUS_ORDER.CONFIRMED]: "Đã xác nhận",
  [E_STATUS_ORDER.DELIVERING]: "Đang giao hàng",
  [E_STATUS_ORDER.DELIVERED]: "Đã giao hàng",
  [E_STATUS_ORDER.CANCELED]: "Đã huỷ",
};
