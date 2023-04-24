import { ReactNode } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}
function AuthWrapper({ children }: Props) {
  const { isLoading, error } = useUser();
  if (isLoading) {
    return (
      <Wrapper>
        <img src='./preloader.gif' className='loading-img' alt='spinner' />
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;
