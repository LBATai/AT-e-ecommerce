import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { routes } from './routers';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation(); // Hook chỉ sử dụng trong Main, không phải App

  // Kiểm tra xem route hiện tại có phải là trang đăng nhập hoặc đăng ký không
  const shouldHideHeaderFooter = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <>
      {/* Chỉ hiển thị Header và Footer nếu không phải trang login hoặc sign-up */}
      {!shouldHideHeaderFooter && <Header />}
      
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
      
      {/* Chỉ hiển thị Footer nếu không phải trang login hoặc sign-up */}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
