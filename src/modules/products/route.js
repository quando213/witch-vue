import LayoutAdmin from "@/views/LayoutAdmin"
const productRoutes = [
    {
        path: '/products',
        component: LayoutAdmin,
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'productList'
            },
            {
                path: 'form',
                component: () => import('./Form'),
                name: 'productForm'
            }
        ]
    }
]

export default productRoutes