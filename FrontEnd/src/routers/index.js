import HomePage from "../pages/HomePage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ProductDetail from "../pages/ProductDetailPage/ProductDetail";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import BlogPage from "../pages/BlogPage/BlogPage";

export const routes = [ 
    {
        path: "/",
        component: HomePage 
    },
    {
        path: "/home",
        component: HomePage 
    },
    {
        path: "/cart",
        component: CartPage
    },
    {
        path: "/product-detail/:id",
        component: ProductDetail
    },
    {
        path: "/sign-in",
        component: SignInPage
    },
    {
        path: "/sign-up",
        component: SignUpPage
    },
    {
        path: "/profile-user",
        component: ProfilePage
    },
    {
        path: "/system/admin",
        component: AdminPage,
        isPrivate: true
    },
    {
        path: "/type/:type",
        component: TypeProductPage,
    },
    {
        path: "/blog",
        component: BlogPage,
    },
    {
        path: "*",
        component: PageNotFound
    }
];
