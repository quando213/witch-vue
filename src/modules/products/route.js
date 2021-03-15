import LayoutAdmin from "@/views/LayoutAdmin";
import LayoutAttributes from "@/views/LayoutAttributes";
const productRoutes = [
    {
        path: '/products',
        name: 'products',
        component: LayoutAdmin,
        meta: {
            title: 'Sản phẩm',
            icon: 'skin',
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'productList',
                meta: {
                    title: 'Danh sách sản phẩm',
                }
            },
            {
                path: 'create',
                component: () => import('./Form'),
                name: 'productCreate',
                meta: {
                    title: 'Thêm sản phẩm',
                }
            },
            {
                path: 'update/:id',
                component: () => import('./Form'),
                name: 'productUpdate',
                meta: {
                    title: 'Chỉnh sửa sản phẩm',
                    hidden: true,
                }
            },
            {
                path: 'attributes',
                component: LayoutAttributes,
                name: 'productAttributes',
                redirect: {
                    name: 'categories',
                },
                meta: {
                    title: 'Quản lý thuộc tính',
                },
                children: [
                    {
                        path: 'categories',
                        component: () => import('./Attributes/Category'),
                        name: 'categories',
                        meta: {
                            title: 'Danh mục',
                        },
                    },
                    {
                        path: 'sizes',
                        component: () => import('./Attributes/Size'),
                        name: 'sizes',
                        meta: {
                            title: 'Kích cỡ',
                        },
                    },
                    {
                        path: 'colors',
                        component: () => import('./Attributes/Color'),
                        name: 'colors',
                        meta: {
                            title: 'Màu sắc',
                        },
                    },
                ],
            },
        ]
    }
]

export default productRoutes