export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST

export const API_ENDPOINT = {
  AUTH: {
    INDEX: `${BASE_URL}/auth`,
    AUTH_ME: `${BASE_URL}/auth/me`
  },
  ROLE: {
    INDEX: `${BASE_URL}/roles`
  },
  USER: {
    INDEX: `${BASE_URL}/users`
  },
  SETTINGS: {
    PAYMENT_TYPE: {
      INDEX: `${BASE_URL}/payment-type`
    }
  },
  MANAGE_PRODUCT: {
    PRODUCT_TYPE: {
      INDEX: `${BASE_URL}/product-types`
    },
    PRODUCT: {
      INDEX: `${BASE_URL}/products`
    }
  }
}
