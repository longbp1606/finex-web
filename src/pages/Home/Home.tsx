import Container from '@/components/Container';
import * as Styled from './Home.styled';
import { useDocumentTitle } from '@/hooks'
import { Button, Card, Col, Flex, Image, List, Row, Skeleton, Typography } from 'antd';
import { FeatureCardContents, LogoURLs, navbar } from './Home.const';
import { MenuType } from '@/utils/type';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Paragraph, Text, Title } = Typography;

const Home = () => {
    useDocumentTitle('Finex | Home');

    return (
        <>
            <Styled.IntroductionSection>
                <Container>
                    <Row justify={"space-between"}>
                        <Col lg={12}>
                            <Row className='gap-10 items-center justify-start p-4'>
                                <Col>
                                    <Skeleton.Input />
                                </Col>
                                <Col>
                                    <Styled.Navbar
                                        split={false}
                                        dataSource={navbar}
                                        renderItem={(item: unknown) => {
                                            const menuItem = item as MenuType;
                                            return <List.Item key={menuItem.key}>{menuItem.label}</List.Item>
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Paragraph className='intro-title'>
                                Manage spending money <Text mark>effectively</Text> and efficiently
                            </Paragraph>
                            <Paragraph className='description'>
                                Don't let your money gett out of control and
                                run out because your expenses are not
                                properly monitored
                            </Paragraph>
                            <Styled.CustomButton
                                icon={<ArrowRightOutlined />}
                                iconPosition='end'
                                type='link'
                                className='text-xl font-medium p-5'
                            >
                                Explore features
                            </Styled.CustomButton>
                        </Col>
                        <Styled.CardContainer lg={12} className='flex flex-col gap-8 p-4 mt-4'>
                            <Row className='flex align-center justify-between gap-10'>
                                <Text>
                                    The best AI financial manager
                                </Text>
                                <Button type='primary'>
                                    Try it free
                                </Button>
                            </Row>

                            <Row className='w-full'>
                                <Skeleton.Node style={{
                                    width: '750px',
                                    height: '200px',
                                    borderRadius: '12px'
                                }} />
                            </Row>

                            <Row className='flex gap-10'>
                                <Col>
                                    <Skeleton.Node style={{
                                        width: '300px',
                                        height: '300px',
                                        borderRadius: '12px'
                                    }} />
                                </Col>
                                <Col className='flex flex-col gap-10'>
                                    <Row>
                                        <Flex vertical>
                                            <Title>3 Years</Title>
                                            <Text>FiNex is already up</Text>
                                        </Flex>
                                    </Row>
                                    <Row>
                                        <Flex vertical>
                                            <Title>45+</Title>
                                            <Text>Financial companies support</Text>
                                        </Flex>
                                    </Row>
                                </Col>
                            </Row>
                        </Styled.CardContainer>
                    </Row>
                </Container>
            </Styled.IntroductionSection>

            <Styled.SupportSection>
                <Container>
                    <Row justify={"space-between"} className='gap-10'>
                        <Col className='flex items-center'>
                            <Text className='text-lg font-medium text-gray-500'>
                                Supported by international financial managers
                            </Text>
                        </Col>
                        <Col>
                            <Flex justify='end' align='center' gap={20}>
                                {LogoURLs.map((logo, index) => (
                                    <Image
                                        src={logo}
                                        key={index}
                                        preview={false}
                                        width={150}
                                        className='opacity-20'
                                    />
                                ))}
                            </Flex>
                        </Col>
                    </Row>
                </Container>
            </Styled.SupportSection>

            <Styled.FeatureSection>
                <Container>
                    <Row justify={"center"} className='flex flex-col mt-40'>
                        <Title className='text-center'>
                            Together with AI assistants who manage your finances
                            optimally
                        </Title>
                        <Text className='text-center'>
                            Finex uses AI technology that can help manage your finances
                        </Text>
                    </Row>
                    <Row justify={"center"}>
                        <Flex gap={40} className='mt-20' justify='space-between'>
                            {FeatureCardContents.map((content, index) => (
                                <Card
                                    cover={
                                        <Skeleton.Image
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                            }}
                                        />
                                    }
                                    key={index}
                                    className='w-80'
                                >
                                    <Card.Meta
                                        title={content.title}
                                        description={content.description}
                                        className='text-center'
                                    />
                                </Card>
                            ))}
                        </Flex>
                    </Row>
                    <Row>
                        <Col>
                            Sư
                        </Col>
                    </Row>
                </Container>
            </Styled.FeatureSection>
        </>
    )
}

export default Home;