import LayoutGuest from "@/views/LayoutGuest"
const authRoutes = [
    {
        path: '/auth',
        component: LayoutGuest,
        meta: {
            hidden: true,
        },
        children: [
            {
                path: 'login',
                component: () => import('./Form'),
                name: 'Login',
                meta: {
                    title: 'Login',
                    hidden: true,
                }
            },
        ]
    }
]

export default authRoutes