import Container from '@/components/Container';
import * as Styled from './Home.styled';
import { useDocumentTitle } from '@/hooks'
import { Button, Card, Col, Flex, Image, Input, List, Row, Skeleton, Typography } from 'antd';
import { FeatureCardContents, FeedbackContents, LogoURLs, navbar } from './Home.const';
import { MenuType } from '@/utils/type';
import { ArrowRightOutlined, FacebookFilled, InstagramFilled, XFilled, XOutlined } from '@ant-design/icons';

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
                    <Row justify={"center"} className='flex flex-col mt-24'>
                        <Title className='text-center'>
                            Together with AI assistants who manage your finances
                            optimally
                        </Title>
                        <Text className='text-center'>
                            Finex uses AI technology that can help manage your finances
                        </Text>
                    </Row>
                    <Row justify={"center"}>
                        <Flex gap={20} className='mt-20' justify='space-between'>
                            {FeatureCardContents.map((content, index) => (
                                <Card
                                    cover={
                                        <Skeleton.Image
                                            style={{
                                                width: '100%',
                                                height: '250px',
                                            }}
                                        />
                                    }
                                    key={index}
                                    className='w-full'
                                >
                                    <Styled.FeatureCardMeta
                                        title={content.title}
                                        description={content.description}
                                        className='text-center'
                                    />
                                </Card>
                            ))}
                        </Flex>
                    </Row>
                    <Row justify={"space-between"} className='mt-20'>
                        <Flex gap={20} className='w-full'>
                            <Styled.CardContainer
                                className='flex flex-col p-12 mt-4 justify-start w-full'
                            >
                                <Title>
                                    We will seta limit for your spending target costume
                                </Title>
                                <Paragraph>
                                    With FiNex, you can set spending limits and
                                    track your expenses effortlessly. Our AI-powered
                                    tools provide insights and recommendations to
                                    help you stay on top of your financial goals.
                                </Paragraph>
                                <Skeleton.Node style={{
                                    width: '100%',
                                    height: '300px',
                                    borderRadius: '12px'
                                }} />
                            </Styled.CardContainer>
                            <Col
                                className='bg-[#f6f6f6] mt-4 p-12 rounded-xl flex flex-col justify-end w-full'
                            >
                                <Skeleton.Node style={{
                                    width: '100%',
                                    height: '320px',
                                    borderRadius: '12px'
                                }} />
                                <Title className='mt-4'>
                                    Tracking your every expense
                                </Title>
                                <Paragraph>
                                    FiNex provides a comprehensive overview of your
                                    finances, including your income, expenses, and
                                    savings. Our AI-powered tools help you make
                                    informed decisions about your finances.
                                </Paragraph>
                            </Col>
                        </Flex>
                    </Row>
                </Container>
            </Styled.FeatureSection>

            <Styled.FeedbackSection className='bg-[#1b1b1b] p-12'>
                <Container>
                    <Row justify={"center"} className='flex flex-col'>
                        <Title className='text-left'>
                            What our customers say about FiNex
                        </Title>
                        <Text className='text-left'>
                            FiNex has helped thousands of people manage their finances
                        </Text>
                    </Row>
                    <Row justify={"center"}>
                        <Flex className='mt-20' justify='space-between' gap={20}>
                            {FeedbackContents.map((content, index) => (
                                <Col
                                    className='flex flex-col gap-10 bg-[#2b2b2b] p-12 rounded-xl w-full'
                                    key={index}
                                >
                                    <Row className='gap-5'>
                                        <Skeleton.Avatar size={64} />
                                        <Flex vertical>
                                            <Title level={4} className='text-white'>
                                                {content.username}
                                            </Title>
                                            <Text className='text-gray-500'>
                                                {content.career}
                                            </Text>
                                        </Flex>
                                    </Row>
                                    <Paragraph className='text-white'>
                                        {content.feedback}
                                    </Paragraph>
                                </Col>
                            ))}
                        </Flex>
                    </Row>
                </Container>
            </Styled.FeedbackSection>

            <Styled.ContactSection>
                <Container>
                    <Row justify={"center"} className='flex flex-col'>
                        <Flex className='mt-20' justify='space-between' gap={40}>
                            <Col lg={12} className='flex flex-col'>
                                <Title
                                    className='w-1/2'
                                    style={{
                                        color: '#1b1b1b',
                                        fontSize: '2.5rem',
                                    }}
                                >
                                    Explore and spread Our Blog
                                </Title>
                                <Input.Search
                                    placeholder='Enter your email'
                                    enterButton='Subscribe'
                                    size='large'
                                    className='w-3/4'
                                />
                            </Col>
                            <Col lg={8} className='flex flex-col'>
                                <Paragraph className='text-gray-500 w-3/4'>
                                    Follow our developments and the blogs we provide,
                                    lots of interesting articles about finance and entertainment
                                    too. Has been the industry's standard dummy text ever since
                                    the 1500s, when an unknown printer took a galley of type and
                                    scrambled it to make a type specimen book.
                                </Paragraph>
                                <Flex gap={20}>
                                    <XOutlined className='text-xl text-gray-500' />
                                    <FacebookFilled className='text-xl text-gray-500' />
                                    <InstagramFilled className='text-xl text-gray-500' />
                                </Flex>
                            </Col>
                        </Flex>
                    </Row>
                    <Row justify={"center"} className='mt-20 flex flex-col'>
                        <Skeleton.Node style={{
                            width: '100%',
                            height: '300px',
                            borderRadius: '12px',
                        }} />
                    </Row>
                </Container>
            </Styled.ContactSection>

            <Styled.FooterSection>
                <Container>
                    <Row justify={"space-between"} className='gap-4 border-b border-gray-300 pb-16'>
                        <Col lg={10} className='flex flex-col gap-4'>
                            <Row justify={"start"} className='gap-4 items-center'>
                                <Skeleton.Avatar size={32} />
                                <Title level={3} className='text-gray-500 text-left'>
                                    FiNex
                                </Title>
                            </Row>
                            <Row>
                                <Text className='text-gray-500 text-left'>
                                    FiNex is a financial management platform that helps
                                    you manage your finances more effectively and efficiently.
                                    Our AI-powered tools provide insights and recommendations
                                </Text>
                            </Row>
                            <Row>
                                <Flex gap={12}>
                                    <Styled.IconContainer>
                                        <XOutlined className='text-sm text-white' />
                                    </Styled.IconContainer>
                                    <Styled.IconContainer>
                                        <FacebookFilled className='text-sm text-white' />
                                    </Styled.IconContainer>
                                    <Styled.IconContainer>
                                        <InstagramFilled className='text-sm text-white' />
                                    </Styled.IconContainer>
                                </Flex>
                            </Row>
                        </Col>
                        <Col lg={10} className='flex flex-col'>
                            <Row justify={"space-between"}>
                                <Col className='flex flex-col gap-4'>
                                    <Title level={4} className='text-gray-500 text-left'>
                                        Company
                                    </Title>
                                    <Flex vertical gap={16}>
                                        <Text className='text-gray-500 text-left'>About</Text>
                                        <Text className='text-gray-500 text-left'>Blog</Text>
                                        <Text className='text-gray-500 text-left'>Careers</Text>
                                    </Flex>
                                </Col>
                                <Col className='flex flex-col gap-4'>
                                    <Title level={4} className='text-gray-500 text-left'>
                                        Support
                                    </Title>
                                    <Flex vertical gap={16}>
                                        <Text className='text-gray-500 text-left'>Help Center</Text>
                                        <Text className='text-gray-500 text-left'>Safety Center</Text>
                                        <Text className='text-gray-500 text-left'>Community Guidelines</Text>
                                    </Flex>
                                </Col>
                                <Col className='flex flex-col gap-4'>
                                    <Title level={4} className='text-gray-500 text-left'>
                                        Legal
                                    </Title>
                                    <Flex vertical gap={16}>
                                        <Text className='text-gray-500 text-left'>Cookies Policy</Text>
                                        <Text className='text-gray-500 text-left'>Privacy Policy</Text>
                                        <Text className='text-gray-500 text-left'>Terms of Service</Text>
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify={"center"} className='mt-8'>
                        <Flex gap={20}>
                            <Text className='text-gray-500'>
                                © Copyright 2025 FiNex. All rights reserved.
                            </Text>
                        </Flex>
                    </Row>
                </Container>
            </Styled.FooterSection>
        </>
    )
}

export default Home;