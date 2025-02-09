import { FC, PropsWithChildren } from 'react';

import { ContainerStyled } from './Container.styled';

const Container: FC<PropsWithChildren> = ({ children }) => {
    return <ContainerStyled>{children}</ContainerStyled>;
};

export default Container;