import { theme } from '@/themes';
import styled from 'styled-components';

export const FeedbackContainer = styled.div`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

export const FeedbackHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const FeedbackTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
`;

export const FeedbackForm = styled.form`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  min-height: 120px;
  background-color: #f9fafb;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: ${theme.color.primary};
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

export const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FeedbackCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.25rem;
  transition: box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const FeedbackCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const FeedbackType = styled.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: #dbeafe;
  color: #1e40af;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const FeedbackContent = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
`;

export const FeedbackMeta = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

export const ReplyContainer = styled.div`
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #e5e7eb;
`;

export const ReplyForm = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
`;
