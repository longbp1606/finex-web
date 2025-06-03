import Container from '@/components/Container';
import * as Styled from './Home.styled';
import { useDocumentTitle } from '@/hooks'
import { Button, Card, Col, Flex, Image, Input, List, Row, Typography } from 'antd';
import { FeatureCardContents, FeedbackContents, LogoURLs, navbar } from './Home.const';
import { MenuType } from '@/utils/type';
import { ArrowRightOutlined, FacebookFilled, InstagramFilled, XOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const { Paragraph, Text, Title } = Typography;

const Home = () => {
    useDocumentTitle('Finex | Home');
    const navigate = useNavigate();

    return (
        <>
            <Styled.IntroductionSection>
                <Container>
                    <Row justify={"space-between"}>
                        <Col lg={12}>
                            <Row className='gap-10 items-center justify-start p-4'>
                                <Col>
                                    <Logo />
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
                                <Text className='text-2xl font-semibold'>
                                    The best AI financial manager
                                </Text>
                                <Button
                                    type='primary'
                                    onClick={() => navigate('/login')}
                                    className='w-40 text-lg font-medium rounded-3xl shadow-lg bg-[#f6f6f6] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-[#f6f6f6] transition-all ease-in-out p-5'
                                >
                                    Try it free
                                </Button>
                            </Row>

                            <Row className='w-full'>
                                <Card className="w-full rounded-xl shadow-md overflow-hidden">
                                    <Flex justify="space-between" align="middle" className="p-4">
                                        <Flex vertical>
                                            <Title level={2} className="text-lg font-medium ">Total Balance</Title>
                                            <Title level={3} className='text-2xl font-semibold'>$24,562.00</Title>
                                            <Text type="success">+2.45% from last month</Text>
                                        </Flex>
                                        <Image
                                            src="https://img.freepik.com/free-vector/digital-presentation-concept-illustration_114360-8195.jpg"
                                            alt="Balance chart"
                                            fallback="data:image/png;base64,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"
                                            width={400}
                                            preview={false}
                                        />
                                    </Flex>
                                </Card>
                            </Row>

                            <Row className='flex gap-10'>
                                <Col>
                                    <Card className="w-[300px] h-[250px] rounded-xl shadow-md overflow-hidden">
                                        <Flex vertical className="h-full justify-center items-center">
                                            <Image
                                                src="https://img.freepik.com/free-vector/charts-concept-illustration_114360-226.jpg"
                                                alt="Expense breakdown"
                                                fallback="data:image/png;base64,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"
                                                width={300}
                                                preview={false}
                                            />
                                        </Flex>
                                    </Card>
                                </Col>
                                <Col className='flex flex-col gap-10'>
                                    <Row>
                                        <Flex vertical>
                                            <Title>3 Years</Title>
                                            <Text className='stats-description'>FiNex is already up</Text>
                                        </Flex>
                                    </Row>
                                    <Row>
                                        <Flex vertical>
                                            <Title>45+</Title>
                                            <Text className='stats-description'>Financial companies support</Text>
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
                                        // <Skeleton.Image
                                        //     style={{
                                        //         width: '100%',
                                        //         height: '250px',
                                        //     }}
                                        // />
                                        <Image
                                            src={content.url}
                                            preview={false}
                                        />
                                    }
                                    key={index}
                                    className='w-full rounded-xl shadow-md overflow-hidden'
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
                                <Image
                                    src="https://img.freepik.com/free-vector/audit-concept-illustration_114360-6387.jpg"
                                    alt="Budget limits visualization"
                                    width="100%"
                                    className="rounded-xl mt-4 overflow-auto"
                                    preview={false}
                                />
                            </Styled.CardContainer>
                            <Col
                                className='bg-[#f6f6f6] mt-4 p-12 rounded-xl flex flex-col justify-end w-full'
                            >
                                <Image
                                    src="https://img.freepik.com/free-vector/online-banking-concept-illustration_114360-12875.jpg"
                                    alt="Expense tracking"
                                    width="100%"
                                    className="rounded-xl"
                                    preview={false}
                                />
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
                        <Title level={4} className='text-left'>
                            FiNex has helped thousands of people manage their finances
                        </Title>
                    </Row>
                    <Row justify={"center"}>
                        <Flex className='mt-20' justify='space-between' gap={20}>
                            {FeedbackContents.map((content, index) => (
                                <Col
                                    className='flex flex-col gap-10 bg-[#2b2b2b] p-12 rounded-xl w-full'
                                    key={index}
                                >
                                    <Row className='gap-5'>
                                        <Image
                                            src={`https://randomuser.me/api/portraits/${content.gender}/${content.id}.jpg`}
                                            alt={content.username}
                                            width={64}
                                            height={64}
                                            className="rounded-full"
                                            preview={false}
                                        />
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
                        <div className='w-full h-[300px] rounded-xl overflow-hidden flex justify-center items-center'>
                            <Image
                                src="https://img.freepik.com/premium-photo/photo-realistic-as-green-building-financial-chart-green-building-paired-with-financial-chart_980716-848392.jpg?w=1380"
                                alt="Financial Blog"
                                width="100%"
                                className="rounded-xl"
                                preview={false}
                            />
                        </div>
                    </Row>
                </Container>
            </Styled.ContactSection>

            <Styled.FooterSection>
                <Container>
                    <Row justify={"space-between"} className='gap-4 border-b border-gray-300 pb-16'>
                        <Col lg={10} className='flex flex-col gap-4'>
                            <Row justify={"start"} className='gap-4 items-center'>
                                <Logo />
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