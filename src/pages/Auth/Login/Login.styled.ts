import { Typography } from 'antd';
import styled from 'styled-components';

import { theme } from '@/themes';

const { Paragraph } = Typography;

export const LoginDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 36px;
        color: ${theme.color.textSecondary};
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.73333;
        text-align: center;

        a {
            margin: 0 4px;
            font-weight: 700;
            color: ${theme.color.textSecondary};
            transition: ${theme.transition.primary};

            span:first-child {
                font-size: inherit;
                color: ${theme.color.primary};
            }

            span:last-child {
                font-size: inherit;
                color: ${theme.color.secondary};
            }

            &:hover {
                color: ${theme.color.primary};
            }
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.4rem;
        }
    }
`;