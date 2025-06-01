import { useTranslation } from 'react-i18next'
import { ROUTE_CONFIG } from './route'

export const VerticalItem = () => {
  // ** Translation
  const { t } = useTranslation()

  return [
    {
      title: t('System'),
      icon: 'eos-icons:file-system-outlined',
      // path: '/',
      childrens: [
        {
          title: t('User'),
          icon: 'iconoir:group',
          path: ROUTE_CONFIG.SYSTEM.USER
        },
        {
          title: t('Role'),
          icon: 'icon-park-outline:permissions',
          path: ROUTE_CONFIG.SYSTEM.ROLE
        }
      ]
    },
    {
      title: t('Manage_product'),
      icon: 'eos-icons:products-outlined',
      // path: '/',
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
        },
        {
          title: t('List_order'),
          icon: 'lets-icons:order-light',
          path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_ORDER
        },
        {
          title: t('List_review'),
          icon: 'carbon:review',
          path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_REVIEW
        }
      ]
    },
    {
      title: t('Setting'),
      icon: 'ant-design:setting-outlined',
      // path: '/',
      childrens: [
        {
          title: t('Payment_method'),
          icon: 'streamline:payment-10',
          path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE
        }
        // {
        //   title: 'Danh mục sản phẩm',
        //   icon: 'material-sysbols-light:category-outline',
        //   path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_TYPE_PRODUCT
        // },
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
