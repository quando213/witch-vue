import LayoutAdmin from "@/views/LayoutAdmin"
const userRoutes = [
    {
        path: '/users',
        name: 'users',
        component: LayoutAdmin,
        meta: {
            title: 'Quản lý user',
            icon: 'user',
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'userList',
                meta: {
                    title: 'Danh sách user',
                }
            },
            {
                path: 'create',
                component: () => import('./Form'),
                name: 'userCreate',
                meta: {
                    title: 'Thêm user',
                }
            },
            {
                path: 'update/:id',
                component: () => import('./Form'),
                name: 'userUpdate',
                meta: {
                    title: 'Chỉnh sửa user',
                    hidden: true,
                }
            }
        ]
    }
]

export default userRoutes