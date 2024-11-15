import HomePage from "../pages/HomePage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ProductDetail from "../pages/ProductDetailPage/ProductDetail";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

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
        path: "/product-detail",
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
        path: "*",
        component: PageNotFound
    }
];
