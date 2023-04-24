import styled from 'styled-components';
import loginImg from '../../public/login-img.svg';
import Image from 'next/image';

const Login = () => {
  return (
    <Wrapper>
      <div className='container'>
        <Image src={loginImg} className='img' alt='github user' />
        <h1>gitHub analyzer</h1>
        <a href='/api/auth/login' className='btn'>
          Login / sign up
        </a>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
