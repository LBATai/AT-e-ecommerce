import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { routes } from './routers';
import { useEffect } from "react";
import {isJsonString} from './utils';
import {jwtDecode}  from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from "./components/redux/Slide/userSlide";
import * as UserService from './Service/UserService';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const {storageData, decoded} = handleDecoded()
    if(decoded?.id){
      // console.log('decoded', decoded)
          handleGetDetailsUser(decoded?.id, storageData)
        }
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {}
    // console.log('storage', storageData, isJsonString(storageData))
    if(storageData && isJsonString(storageData )){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData);
    }

    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      // console.log('data', data)
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  },(error) => {
    // Do something with request error
    return Promise.reject(error);
  });

  const handleGetDetailsUser = async (id, token) => {
    try {
        // console.log('id', id, 'token', token);
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
        // In ra chi tiết lỗi để kiểm tra
        console.error('Error fetching user details:', error.response || error);
    }
};


  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation(); // Hook chỉ sử dụng trong Main, không phải App
  const user = useSelector((state) => state.user)

  // Kiểm tra xem route hiện tại có phải là trang đăng nhập hoặc đăng ký không
  const shouldHideHeaderFooter = location.pathname === '/sign-in' || location.pathname === '/sign-up' || location.pathname === '/system/admin';

  return (
    <>
      {/* Chỉ hiển thị Header và Footer nếu không phải trang login hoặc sign-up */}
      {!shouldHideHeaderFooter && <Header/>}
      
      <Routes>
        {routes.map((route, index) => {
          // Kiểm tra xem route có yêu cầu xác thực không và người dùng có quyền không
          const isCheckAuth = !route.isPrivate || user.isAdmin;

          // Chỉ hiển thị route nếu là public hoặc người dùng có quyền truy cập
          return (
            isCheckAuth && (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            )
          );
        })}
      </Routes>
      {/* Chỉ hiển thị Footer nếu không phải trang login hoặc sign-up */}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
