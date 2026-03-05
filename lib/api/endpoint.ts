// list of backend routes

export const API = {
  USER: {
    MESSAGE: "/messages/",
  },
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    UPDATE_PROFILE: "/auth/update-profile",
    REQUEST_RESET_PASSWORD: "/auth/request-password-reset",
    RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
    CHANGE_PASSWORD: `/auth/reset-password-otp`,
    GET_ONE: (userId: string) => `/auth/${userId}`,
    ADD_TO_CART: "/auth/cart",
    UPDATE_CART_ITEM: "/auth/cart/update-quantity",
    DELETE_CART_ITEM: "/auth/cart/remove",
    GET_MY_DATA: "/auth/me",
  },
  ORDER: {
    CREATE: "/orders/",
    GET_BY_USER_ID: `/orders/my-orders`,
  },
  BOOKS: {
    GET_ALL_BOOK: "/books/",
    GET_ONE: (bookId: string) => `/books/${bookId}`,
    GET_BY_GENRE_ID: (genreId: string) => `/books/genre/${genreId}`,
  },
  REVIEWS: {
    GET_BY_BOOK_ID: (bookId: string) => `/reviews/books/${bookId}`,
    MY_REVIEWS: "/reviews/my-reviews",
    CREATE: "/reviews/",
  },
  GENRES: {
    GET_ALL: "/genres/",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    ORDERS: {
      GET_ALL_ORDER: "/admin/orders",
      UPDATE: (orderId: string) => `/admin/orders/${orderId}`,
      DELETE: (orderId: string) => `/admin/orders/${orderId}`,
      GET_BY_USER_ID: (orderId: string) => `/admin/orders/${orderId}`,
    },
    GENRES: {
      CREATE_GENRE: "/admin/genres",
      GET_ALL_GENRE_PAGINATED: "/admin/genres",
      GET_ALL_GENRE: "/admin/genres/all",
      GET_ONE: (genreId: string) => `/admin/genres/${genreId}`,
      DELETE: (genreId: string) => `/admin/genres/${genreId}`,
      UPDATE: (genreId: string) => `/admin/genres/${genreId}`,
    },
    REVIEWS: {
      GET_ALL_REVIEW: "/admin/reviews",
    },
    BOOKS: {
      CREATE_BOOK: "/admin/books",
      GET_ALL_BOOK: "/admin/books",
      DELETE: (bookId: string) => `/admin/books/${bookId}`,
      UPDATE: (bookId: string) => `/admin/books/${bookId}`,
    },
    MESSAGES: {
      GET_ALL_MESSAGE: "/admin/messages/",
      UPDATE: (messageId: string) => `/admin/messages/${messageId}`,
      DELETE: (messageId: string) => `/admin/messages/${messageId}`,
    },
    USER: {
      CREATE_USER: "/admin/users/",
      GET_ALL_USERS: "/admin/users/",
      GET_ONE: (userId: string) => `/admin/users/${userId}`,
      UPDATE: (userId: string) => `/admin/users/${userId}`,
      DELETE: (userId: string) => `/admin/users/${userId}`,
    },
  },
  TESTIMONIAL: "/messages/testimonials",
};
