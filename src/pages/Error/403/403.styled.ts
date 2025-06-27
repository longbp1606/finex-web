import styled, { keyframes } from 'styled-components';
import { Card } from 'antd';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 77, 79, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 77, 79, 0);
  }
`;

export const ErrorContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.1;
  }
`;

export const ErrorCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
  text-align: center;
  position: relative;
  z-index: 1;

  .ant-card-body {
    padding: 40px 30px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }
`;

export const ErrorCode = styled.div`
  font-size: 120px;
  font-weight: 900;
  background: linear-gradient(135deg, #ff4d4f, #ff7875);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(255, 77, 79, 0.3);
`;

export const ErrorTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const ActionButton = styled.div`
  .ant-btn {
    height: 50px;
    padding: 0 30px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 25px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      background: linear-gradient(135deg, #5a6fd8, #6a4190);
      animation: ${pulse} 2s infinite;
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export const IconWrapper = styled.div`
  font-size: 80px;
  color: #ff4d4f;
  margin-bottom: 20px;
  animation: ${float} 2s ease-in-out infinite;
  
  .lucide {
    filter: drop-shadow(0 0 20px rgba(255, 77, 79, 0.3));
  }
`;

export const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

export const Particle = styled.div<{ delay: number; duration: number; size: number }>`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  top: ${Math.random() * 100}%;
  left: ${Math.random() * 100}%;
`;

export const ActionButtonWrapper = styled.div``;