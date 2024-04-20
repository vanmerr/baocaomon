import Home from '~/pages/Home';
import Authen from '~/pages/Authen';
import UserLayout from '~/layouts/UserLayout';
import Cart from '~/pages/Cart';
import DefaultLayout from '~/layouts/DefaultLayout';
import Order from '~/pages/Order';
import AdminLayout from '~/layouts/AdminLayout';
import ManageProduct from '~/components/ManageProduct';
import ManageOrder from '~/components/ManageOrder';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/authen', component: Authen, layout: null },
    { path: '/search', component: Home, layout: DefaultLayout },
    { path: '/user/cart', component: Cart, layout: UserLayout },
    { path: '/user/order', component: Order, layout: UserLayout },
    { path: '/user', component: Cart, layout: UserLayout },
    { path: '/admin/manage-product', component: ManageProduct, layout: AdminLayout },
    { path: '/admin/manage-order', component: ManageOrder, layout: AdminLayout },
    { path: '/admin/manage-user', component: ManageOrder, layout: AdminLayout },
    { path: '/admin', component: ManageProduct, layout: AdminLayout },
];

export default publicRoutes;
