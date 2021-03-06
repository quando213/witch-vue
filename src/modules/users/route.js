import LayoutAdmin from "@/views/LayoutAdmin"
const userRoutes = [
    {
        path: '/users',
        component: LayoutAdmin,
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'userList'
            },
            {
                path: 'form',
                component: () => import('./Form'),
                name: 'userForm'
            }
        ]
    }
]

export default userRoutes