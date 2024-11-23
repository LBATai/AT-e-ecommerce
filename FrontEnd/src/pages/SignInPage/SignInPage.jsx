import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainContainer,
  TitleContainer,
  InputContainer,
  InputBox,
  ErrorLabel,
  ButtonContainer,
  SubmitButton,
  LinkContainer,
  LinkText,
} from './style';
import * as UserService from '../../Service/UserService';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { message } from 'antd';
import Pending from '../../components/Pending/Pending';
import {jwtDecode}  from "jwt-decode";
import { useDispatch } from 'react-redux'
import {updateUser} from '../../components/redux/Slide/userSlide'
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Mutation hook để gọi API
  const mutation = useMutationHooks((data) => UserService.signIn(data));
  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onButtonClick = () => {
    let isValid = true;

    // Reset lỗi
    setEmailError('');
    setPasswordError('');

    // Kiểm tra email
    if (!email) {
      setEmailError('Tài khoản không được để trống');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Tài khoản không hợp lệ');
      isValid = false;
    }

    // Kiểm tra mật khẩu
    if (!password) {
      setPasswordError('Mật khẩu không được để trống');
      isValid = false;
    }

    // Nếu hợp lệ, tiến hành đăng nhập
    if (isValid) {
      mutation.mutate(
        { email, password },
        {
          onSuccess: (response) => {
            // Kiểm tra dữ liệu trả về từ server
            if (response?.status === 'OK') {
              setIsPending(true);
              message.success('Đăng nhập thành công!');
              
              // Lưu access_token vào localStorage và giải mã token
              localStorage.setItem('access_token', JSON.stringify(response?.access_token));
              if (response?.access_token) {
                const decoded = jwtDecode(response?.access_token);
                // console.log('decoded', decoded);
                if(decoded?.id){
                  // console.log('Calling handleGetDetailsUser with:', decoded.id, response.access_token);
                  handleGetDetailsUser(decoded.id, response.access_token)
                }
              }

          
              // Bật loading trước khi chuyển hướng tới trang home
              setTimeout(() => {
                navigate('/home');
                setIsPending(false); // Tắt loading sau khi chuyển trang
              }, 1000); // Chờ 1 giây trước khi chuyển trang
          
            } else if (response?.message === 'User not found') {
              message.error('Tài khoản không đúng.');
              setIsPending(false); // Tắt loading khi có lỗi
            } else if (response?.message === 'Incorrect password') {
              message.error('Mật khẩu không đúng.');
              setIsPending(false); // Tắt loading khi có lỗi
            }
          },
          
          onError: () => {
            message.error('Đã xảy ra lỗi, vui lòng thử lại.');
            setIsPending(false); // Tắt loading nếu có lỗi
          },
        }
      );
    }
  };
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({...res?.data, access_token: token}));
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onButtonClick(); // Gọi hàm đăng nhập khi nhấn Enter
    }
  };
  return (
    <MainContainer>
      <Pending isPending={isPending}>
        <TitleContainer>Đăng nhập</TitleContainer>

        <InputContainer>
          <InputBox
            type="email"
            value={email}
            placeholder="Nhập email"
            onChange={(ev) => setEmail(ev.target.value)}
            onKeyDown={handleKeyDown}
          />
          {emailError && <ErrorLabel>{emailError}</ErrorLabel>}
        </InputContainer>

        <InputContainer style={{ position: 'relative' }}>
          <InputBox
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Nhập mật khẩu"
            onChange={(ev) => setPassword(ev.target.value)}
            onKeyDown={handleKeyDown}
          />
          {passwordError && <ErrorLabel>{passwordError}</ErrorLabel>}

          {/* Nút hiển thị/ẩn mật khẩu */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </span>
        </InputContainer>

        <ButtonContainer>
          <SubmitButton onClick={onButtonClick}>Đăng nhập</SubmitButton>
        </ButtonContainer>

        <LinkContainer>
          <LinkText onClick={handleForgotPassword}>Quên mật khẩu?</LinkText>
          <LinkText onClick={handleSignUp}>Đăng ký</LinkText>
        </LinkContainer>
      </Pending>
    </MainContainer>
  );
};

export default SignIn;
