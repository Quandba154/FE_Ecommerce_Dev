import { useTranslation } from 'react-i18next'
import { ROUTE_CONFIG } from './route'
import { PERMISSIONS } from './permission'

export type TVertical = {
  title: string
  path?: string
  icon?: string
  childrens?: {
    title: string
    path?: string
    icon?: string
    permission?: string
  }[]
}

export const VerticalItem = () => {
  // ** Translation
  const { t } = useTranslation()

  return [
    {
      title: t('Dashboard'),
      icon: 'material-symbols-light:dashboard-outline',
      path: ROUTE_CONFIG.DASHBOARD,
      permission: PERMISSIONS.DASHBOARD
    },
    {
      title: t('System'),
      icon: 'eos-icons:file-system-outlined',
      childrens: [
        {
          title: t('User'),
          icon: 'iconoir:group',
          path: ROUTE_CONFIG.SYSTEM.USER,
          permissions: PERMISSIONS.SYSTEM.USER.VIEW
        },
        {
          title: t('Role'),
          icon: 'icon-park-outline:permissions',
          path: ROUTE_CONFIG.SYSTEM.ROLE,
          permissions: PERMISSIONS.SYSTEM.ROLE.VIEW
        }
      ]
    },
    {
      title: t('Manage_product'),
      icon: 'eos-icons:products-outlined',
      childrens: [
        {
          title: t('Lits_product'),
          icon: 'icon-park-outline:ad-product',
          path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT
        },
        {
          title: t('Type_product'),
          icon: 'material-sysbols-light:category-outline',
          path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_TYPE_PRODUCT
        }
      ]
    },
    {
      title: t('Manage_order'),
      icon: 'carbon:order-details',
      // path: '/',
      childrens: [
        {
          title: t('List_order'),
          icon: 'lets-icons:order-light',
          path: ROUTE_CONFIG.MANAGE_ORDER.ORDER,
          permissions: PERMISSIONS.MANAGE_ORDER.ORDER.VIEW
        },
        {
          title: t('List_review'),
          icon: 'carbon:review',
          path: ROUTE_CONFIG.MANAGE_ORDER.MANAGE_REVIEW
        }
      ]
    },
    {
      title: t('Setting'),
      icon: 'ant-design:setting-outlined',
      childrens: [
        {
          title: t('Payment_method'),
          icon: 'streamline:payment-10',
          path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE
        },
        {
          title: t('Delivery_method'),
          icon: 'iconamoon:delivery-fast-duotone',
          path: ROUTE_CONFIG.SETTINGS.DELIVERY_TYPE
        },
        {
          title: t('City'),
          icon: 'ph:city-fill',
          path: ROUTE_CONFIG.SETTINGS.CITY
        }
        // {
        //   title: 'Danh sách đơn hàng',
        //   icon: 'lets-icons:order-light',
        //   path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_ORDER
        // },
        // {
        //   title: 'Danh sách đánh giá',
        //   icon: 'carbon:review',
        //   path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_REVIEW
        // }
      ]
    }
  ]
}
