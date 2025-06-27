import React from 'react';
import { Button } from 'antd';
import { Shield, Home, ArrowLeft } from 'lucide-react';
import {
    ErrorContainer,
    ErrorCard,
    ErrorCode,
    ErrorTitle,
    ErrorMessage,
    ActionButton,
    IconWrapper,
    ParticleContainer,
    Particle,
    ActionButtonWrapper
} from './403.styled';

const ForbiddenPage: React.FC = () => {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    // Generate floating particles
    const particles = Array.from({ length: 20 }, (_, i) => (
        <Particle
            key={i}
            delay={Math.random() * 2}
            duration={3 + Math.random() * 2}
            size={4 + Math.random() * 8}
        />
    ));

    return (
        <ErrorContainer>
            <ParticleContainer>
                {particles}
            </ParticleContainer>

            <ErrorCard>
                <IconWrapper>
                    <Shield size={80} />
                </IconWrapper>

                <ErrorCode>403</ErrorCode>

                <ErrorTitle>Access Forbidden</ErrorTitle>

                <ErrorMessage>
                    Sorry, you don't have permission to access this resource.
                    The page you're trying to reach requires special authorization
                    or may be restricted to certain users only.
                </ErrorMessage>

                <ActionButtonWrapper style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <ActionButton>
                        <Button
                            type="primary"
                            icon={<Home size={18} />}
                            onClick={handleGoHome}
                        >
                            Go Home
                        </Button>
                    </ActionButton>

                    <ActionButton>
                        <Button
                            type="default"
                            icon={<ArrowLeft size={18} />}
                            onClick={handleGoBack}
                            style={{
                                background: 'transparent',
                                borderColor: '#667eea',
                                color: '#667eea'
                            }}
                        >
                            Go Back
                        </Button>
                    </ActionButton>
                </ActionButtonWrapper>
            </ErrorCard>
        </ErrorContainer>
    );
};

export default ForbiddenPage;