import { useDocumentTitle } from '@/hooks';
import { Flex, Image, Typography } from 'antd';
import NotFoundImage from '@/assets/image/404.svg';

const { Title } = Typography;

const NotFound = () => {
    useDocumentTitle('Not found | Finex');
    
    return (
        <>
            <Flex vertical justify="center" align="center" style={{ height: '100vh' }}>
                <Image src={NotFoundImage} alt="Not found" preview={false} width={500} />
                <Title level={2}>404 - Page Not Found</Title>
            </Flex>
        </>
    )
}

export default NotFound;