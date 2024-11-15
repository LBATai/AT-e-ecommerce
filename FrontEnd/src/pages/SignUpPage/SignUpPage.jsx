import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainContainer,
  TitleContainer,
  InputContainer,
  InputBox,
  SubmitButton,
  SubmitWrapper,
  ErrorLabel,
  PasswordContainer,
  TogglePasswordButton,
  LinkText,
} from './style';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../Service/UserService';
import { message } from 'antd';
import Loading from '../../components/Pending/Pending';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isPending, setIsPending] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Data
  const mutation = useMutationHooks((data) => UserService.signUp(data));

  // Kiểm tra thông tin
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onButtonClick = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setNameError('');
    setAgeError('');
    setPhoneError('');
    setAddressError('');

    if (!email) {
      setEmailError('Tài khoản không được để trống');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Tài khoản không hợp lệ');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Mật khẩu không được để trống');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu ít nhất 6 ký tự');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp');
      isValid = false;
    }

    if (!name) {
      setNameError('Tên không được để trống');
      isValid = false;
    }

    if (!phone || phone.length < 10) {
      setPhoneError('Số điện thoại không hợp lệ');
      isValid = false;
    }

    if (isValid) {

      mutation.mutate(
        { email, password, name, age, sex, phone, address },
        {
          onSuccess: (response) => {
            // Kiểm tra dữ liệu trả về từ server
            if (response?.status === 'Success') {
              setIsPending(true); // Bật pending khi bắt đầu đăng ký
              message.success('Đăng ký thành công!');

              // Chờ 2 giây trước khi chuyển trang và tắt pending
              setTimeout(() => {
                setIsPending(false);
                navigate('/sign-in'); // Chuyển đến trang đăng nhập
              }, 2000);
            } else if(response?.message === 'Email already exists'){
              message.error('Email đã tồn tại!');
              setIsPending(false); // Tắt pending nếu có lỗi
            }
              else {
              message.error('Đã xảy ra lỗi, vui lòng thử lại.');
              setIsPending(false); // Tắt pending nếu có lỗi
            }
          },
          onError: (error) => {
            message.error('Đã xảy ra lỗi, vui lòng thử lại.');
            setIsPending(false); // Tắt pending khi có lỗi
          },
        }
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onButtonClick(); // Gọi hàm đăng nhập khi nhấn Enter
    }
  };
  return (
    <MainContainer>
      <TitleContainer>Đăng Ký</TitleContainer>

      {isPending && <Loading />} {/* Hiển thị loading khi đang đăng ký */}

      <InputContainer>
        <InputBox
          type="email"
          value={email}
          placeholder="Nhập tài khoản (Email)"
          onChange={(ev) => setEmail(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
        {emailError && <ErrorLabel>{emailError}</ErrorLabel>}
      </InputContainer>

      <InputContainer>
        <InputBox
          type="text"
          value={name}
          placeholder="Nhập tên"
          onChange={(ev) => setName(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
        {nameError && <ErrorLabel>{nameError}</ErrorLabel>}
      </InputContainer>

      <InputContainer>
        <InputBox
          type="number"
          value={age}
          placeholder="Nhập tuổi"
          onChange={(ev) => setAge(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
        {ageError && <ErrorLabel>{ageError}</ErrorLabel>}
      </InputContainer>

      <InputContainer>
        <InputBox
          type="text"
          value={sex}
          placeholder="Giới tính"
          onChange={(ev) => setSex(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
      </InputContainer>

      <InputContainer>
        <InputBox
          type="text"
          value={phone}
          placeholder="Nhập số điện thoại"
          onChange={(ev) => setPhone(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
        {phoneError && <ErrorLabel>{phoneError}</ErrorLabel>}
      </InputContainer>

      <InputContainer>
        <InputBox
          type="text"
          value={address}
          placeholder="Nhập địa chỉ"
          onChange={(ev) => setAddress(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
        {addressError && <ErrorLabel>{addressError}</ErrorLabel>}
      </InputContainer>

      <InputContainer>
        <PasswordContainer>
          <InputBox
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Nhập mật khẩu"
            onChange={(ev) => setPassword(ev.target.value)}
            onKeyDown={handleKeyDown}
          />
          <TogglePasswordButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </TogglePasswordButton>
        </PasswordContainer>
        {passwordError && <ErrorLabel>{passwordError}</ErrorLabel>}
      </InputContainer>

      <InputContainer>
        <PasswordContainer>
          <InputBox
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            placeholder="Nhập lại mật khẩu"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            onKeyDown={handleKeyDown}
          />
          <TogglePasswordButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </TogglePasswordButton>
        </PasswordContainer>
        {confirmPasswordError && <ErrorLabel>{confirmPasswordError}</ErrorLabel>}
      </InputContainer>

      <SubmitWrapper>
        <SubmitButton onClick={onButtonClick}>Đăng ký</SubmitButton>
        <LinkText onClick={() => navigate('/sign-in')}>Đăng Nhập</LinkText>
      </SubmitWrapper>
    </MainContainer>
  );
};

export default SignUpPage;
