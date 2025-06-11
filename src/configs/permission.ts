export const PERMISSIONS: any = {
  ADMIN: 'ADMIN.GRANTED',
  BASIC: 'BASIC.PUBLIC',
  DASHBOARD: 'DASHBOARD',
  MANAGE_PRODUCT: {
    PRODUCT: {
      CREATE: 'MANAGE_PRODUCT.PRODUCT.CREATE',
      UPDATE: 'MANAGE_PRODUCT.PRODUCT.UPDATE',
      DELETE: 'MANAGE_PRODUCT.PRODUCT.DELETE'
    },
    PRODUCT_TYPE: {
      CREATE: 'MANAGE_PRODUCT.PRODUCT_TYPE.CREATE',
      UPDATE: 'MANAGE_PRODUCT.PRODUCT_TYPE.UPDATE',
      DELETE: 'MANAGE_PRODUCT.PRODUCT_TYPE.DELETE'
    }
  },
  SYSTEM: {
    USER: {
      VIEW: 'SYSTEM.USER.VIEW',
      CREATE: 'SYSTEM.USER.CREATE',
      UPDATE: 'SYSTEM.USER.UPDATE',
      DELETE: 'SYSTEM.USER.DELETE'
    },
    ROLE: {
      VIEW: 'SYSTEM.ROLE.VIEW',
      CREATE: 'SYSTEM.ROLE.CREATE',
      UPDATE: 'SYSTEM.ROLE.UPDATE',
      DELETE: 'SYSTEM.ROLE.DELETE'
    }
  },
  MANAGE_ORDER: {
    REVIEW: {
      UPDATE: 'MANAGE_ORDER.REVIEW.UPDATE',
      DELETE: 'MANAGE_ORDER.REVIEW.DELETE'
    },
    ORDER: {
      VIEW: 'MANAGE_ORDER.ORDER.VIEW',
      CREATE: 'MANAGE_ORDER.ORDER.CREATE',
      UPDATE: 'MANAGE_ORDER.ORDER.UPDATE',
      DELETE: 'MANAGE_ORDER.ORDER.DELETE'
    }
  },
  SETTING: {
    PAYMENT_TYPE: {
      CREATE: 'SETTING.PAYMENT_TYPE.CREATE',
      UPDATE: 'SETTING.PAYMENT_TYPE.UPDATE',
      DELETE: 'SETTING.PAYMENT_TYPE.DELETE'
    },
    DELIVERY_TYPE: {
      CREATE: 'SETTING.DELIVERY_TYPE.CREATE',
      UPDATE: 'SETTING.DELIVERY_TYPE.UPDATE',
      DELETE: 'SETTING.DELIVERY_TYPE.DELETE'
    },
    CITY: {
      CREATE: 'CITY.CREATE',
      UPDATE: 'CITY.UPDATE',
      DELETE: 'CITY.DELETE'
    }
  }
}

export const LIST_DATA_PERMISSIONS: any = [
  {
    id: 15,
    name: 'Dashboard',
    isParent: false,
    value: 'DASHBOARD',
    isHideCreate: true,
    isHideUpdate: true,
    isHideDelete: true
  },
  { id: 1, name: 'Manage_product', isParent: true, value: 'MANAGE_PRODUCT' },
  {
    id: 2,
    name: 'Product',
    isParent: false,
    value: 'PRODUCT',
    parentValue: 'MANAGE_PRODUCT',
    // create: PERMISSIONS.MANAGE_PRODUCT.PRODUCT.CREATE,
    // update: PERMISSIONS.MANAGE_PRODUCT.PRODUCT.UPDATE,
    // delete: PERMISSIONS.MANAGE_PRODUCT.PRODUCT.DELETE,
    isHideView: true
  },
  {
    id: 3,
    name: 'Product_type',
    isParent: false,
    value: 'PRODUCT_TYPE',
    parentValue: 'MANAGE_PRODUCT',
    isHideView: true
    // create: PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE.CREATE,
    // update: PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE.UPDATE,
    // delete: PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE.DELETE,
  },
  { id: 4, name: 'System', isParent: true, value: 'SYSTEM' },
  {
    id: 5,
    name: 'User',
    isParent: false,
    // create: PERMISSIONS.SYSTEM.USER.CREATE,
    // update: PERMISSIONS.SYSTEM.USER.UPDATE,
    // delete: PERMISSIONS.SYSTEM.USER.DELETE,
    // view: PERMISSIONS.SYSTEM.USER.VIEW
    value: 'USER',
    parentValue: 'SYSTEM',
    isHideView: true
  },
  {
    id: 6,
    name: 'Role',
    isParent: false,
    value: 'ROLE',
    parentValue: 'SYSTEM'
    // create: PERMISSIONS.SYSTEM.ROLE.CREATE,
    // update: PERMISSIONS.SYSTEM.ROLE.UPDATE,
    // delete: PERMISSIONS.SYSTEM.ROLE.DELETE,
    // view: PERMISSIONS.SYSTEM.ROLE.VIEW
  },
  { id: 7, name: 'Manage_order', isParent: true, value: 'MANAGE_ORDER' },
  {
    id: 8,
    name: 'Review',
    isParent: false,
    // update: PERMISSIONS.MANAGE_ORDER.REVIEW.UPDATE,
    // delete: PERMISSIONS.MANAGE_ORDER.REVIEW.DELETE,
    value: 'REVIEW',
    parentValue: 'MANAGE_ORDER',
    isHideView: true,
    isHideCreate: true
  },
  {
    id: 9,
    name: 'Order',
    isParent: false,
    value: 'ORDER',
    parentValue: 'MANAGE_ORDER'
  },
  { id: 10, name: 'Settings', isParent: true, value: 'SETTING' },
  {
    id: 11,
    name: 'City',
    isParent: false,
    value: 'CITY',
    parentValue: 'SETTING',
    isHideView: true
  },
  {
    id: 12,
    name: 'Delivery_type',
    isParent: false,
    value: 'DELIVERY_TYPE',
    parentValue: 'SETTING',
    isHideView: true
  },
  {
    id: 13,
    name: 'Payment_type',
    isParent: false,
    value: 'PAYMENT_TYPE',
    parentValue: 'SETTING',
    isHideView: true
  }
]
