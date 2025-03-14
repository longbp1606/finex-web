import { Typography } from 'antd'
import { TitleWrapper } from './Logo.styled';

const { Text } = Typography;

const Logo = () => {
    return (
        <TitleWrapper>
            <Text>Fin</Text>
            <Text>Ex</Text>
        </TitleWrapper>
    )
}

export default Logo