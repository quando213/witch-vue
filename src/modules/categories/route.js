import LayoutGuest from "@/views/LayoutGuest"
const categoryRoutes = [
    {
        path: '/categories',
        component: LayoutGuest,
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'categoryList'
            },
            {
                path: 'form',
                component: () => import('./Form'),
                name: 'categoryForm'
            }
        ]
    }
]

export default categoryRoutes