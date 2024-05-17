export const ROUTE_PATH = {
  HOME: "/",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  CART: "/cart",
  FORGOT_PASSWORD: "/auth/forgot-password",
  CHECKOUT: "/checkout",
  MY_PROFILE: "/account",
  PRODUCT_DETAIL: (slug) => `/product/${slug}`,
  SEARCH_PRODUCT: `/search`,
  CATEGORY_DETAIL: (slug) => `/${slug}`,

  // admin
  ADMIN: "/admin",

  // category
  CATEGORY_MANAGEMENT: "/admin/category",
  ADD_CATEGORY: "/admin/category/add",
  EDIT_CATEGORY: (slug) => `/admin/category/${slug}/edit`,
  EDIT_CATEGORY_PATH: "/admin/category/:slug/edit",

  // product
  PRODUCT_MANAGEMENT: "/admin/product",
  ADD_PRODUCT: "/admin/product/add",
  EDIT_PRODUCT: (slug) => `/admin/product/${slug}/edit`,
  EDIT_PRODUCT_PATH: "/admin/product/:slug/edit",

  // order
  ORDER_MANAGEMENT: "/admin/order",
  ORDER_DETAIL_PATH: "/admin/order/:id/detail",
  ORDER_DETAIL: (id) => `/admin/order/${id}/detail`,
};
