import React, { useState } from 'react';
import { FaStar, FaRegStar, FaReply, FaCalendarAlt, FaUser } from 'react-icons/fa';
import {
    FeedbackContainer,
    FeedbackHeader,
    FeedbackTitle,
    FeedbackForm,
    FormGroup,
    FormLabel,
    FormInput,
    FormTextArea,
    FormSelect,
    SubmitButton,
    FeedbackList,
    FeedbackCard,
    FeedbackCardHeader,
    FeedbackType,
    RatingContainer,
    FeedbackContent,
    FeedbackMeta,
    ReplyContainer,
    ReplyForm,
    StarRating
} from './Feedback.styled';
import { mockFeedbackData, feedbackTypes, RenderStars, FeedbackItem, Reply, FeedbackType as FeedbackTypeEnum } from './mockData';

const Feedback: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(mockFeedbackData);
    const [newFeedback, setNewFeedback] = useState({
        title: '',
        content: '',
        type: 'General' as FeedbackTypeEnum,
        rating: 0
    });
    const [replyStates, setReplyStates] = useState<{ [key: string]: { isReplying: boolean, replyText: string } }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewFeedback(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingClick = (rating: number) => {
        setNewFeedback(prev => ({
            ...prev,
            rating
        }));
    };

    const handleSubmitFeedback = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newFeedback.title || !newFeedback.content || !newFeedback.rating) {
            alert('Please fill all required fields and provide a rating');
            return;
        }

        const newFeedbackItem: FeedbackItem = {
            id: `feedback-${Date.now()}`,
            userId: 'currentUser', // In a real app, this would come from authentication
            userName: 'Current User', // In a real app, this would come from authentication
            title: newFeedback.title,
            content: newFeedback.content,
            type: newFeedback.type,
            rating: newFeedback.rating,
            createdAt: new Date(),
            status: 'Open',
            replies: []
        };

        setFeedbacks([newFeedbackItem, ...feedbacks]);
        setNewFeedback({
            title: '',
            content: '',
            type: 'General',
            rating: 0
        });
    };

    const toggleReplyForm = (feedbackId: string) => {
        setReplyStates(prev => ({
            ...prev,
            [feedbackId]: {
                isReplying: !(prev[feedbackId]?.isReplying || false),
                replyText: prev[feedbackId]?.replyText || ''
            }
        }));
    };

    const handleReplyTextChange = (feedbackId: string, text: string) => {
        setReplyStates(prev => ({
            ...prev,
            [feedbackId]: {
                ...prev[feedbackId],
                replyText: text
            }
        }));
    };

    const submitReply = (feedbackId: string) => {
        if (!replyStates[feedbackId]?.replyText.trim()) {
            return;
        }

        const newReply: Reply = {
            id: `reply-${Date.now()}`,
            userId: 'currentUser',
            userName: 'Current User',
            content: replyStates[feedbackId].replyText,
            createdAt: new Date()
        };

        setFeedbacks(feedbacks.map(feedback =>
            feedback.id === feedbackId
                ? { ...feedback, replies: [...feedback.replies, newReply] }
                : feedback
        ));

        // Reset reply state
        setReplyStates(prev => ({
            ...prev,
            [feedbackId]: {
                isReplying: false,
                replyText: ''
            }
        }));
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <FeedbackContainer>
            <FeedbackHeader>
                <FeedbackTitle>Feedback & Suggestions</FeedbackTitle>
            </FeedbackHeader>

            {/* Feedback Form */}
            <FeedbackForm onSubmit={handleSubmitFeedback}>
                <FormGroup>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormInput
                        type="text"
                        id="title"
                        name="title"
                        value={newFeedback.title}
                        onChange={handleInputChange}
                        placeholder="Enter a title for your feedback"
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="type">Feedback Type</FormLabel>
                    <FormSelect
                        id="type"
                        name="type"
                        value={newFeedback.type}
                        onChange={handleInputChange}
                    >
                        {feedbackTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </FormSelect>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Rating</FormLabel>
                    <StarRating>
                        {[1, 2, 3, 4, 5].map(rating => (
                            <span
                                key={rating}
                                className="cursor-pointer text-2xl"
                                onClick={() => handleRatingClick(rating)}
                            >
                                {rating <= newFeedback.rating ? (
                                    <FaStar className="text-yellow-400" />
                                ) : (
                                    <FaRegStar className="text-yellow-400" />
                                )}
                            </span>
                        ))}
                    </StarRating>
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="content">Your Feedback</FormLabel>
                    <FormTextArea
                        id="content"
                        name="content"
                        value={newFeedback.content}
                        onChange={handleInputChange}
                        placeholder="Please share your thoughts, suggestions, or issues..."
                        required
                    />
                </FormGroup>

                <SubmitButton type="submit">Submit Feedback</SubmitButton>
            </FeedbackForm>

            {/* Feedback List */}
            <FeedbackList>
                {feedbacks.map(feedback => (
                    <FeedbackCard key={feedback.id}>
                        <FeedbackCardHeader>
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold">{feedback.title}</h3>
                                <FeedbackType>{feedback.type}</FeedbackType>
                            </div>
                            <RatingContainer>
                                <RenderStars rating={feedback.rating} />
                            </RatingContainer>
                        </FeedbackCardHeader>

                        <FeedbackContent>{feedback.content}</FeedbackContent>

                        <FeedbackMeta>
                            <div className="flex items-center gap-2">
                                <FaUser className="text-gray-400" />
                                <span>{feedback.userName}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <FaCalendarAlt className="text-gray-400" />
                                <span>{formatDate(feedback.createdAt)}</span>
                            </div>
                        </FeedbackMeta>

                        <div className="flex justify-between items-center">
                            <span className={`px-2 py-1 text-xs rounded ${feedback.status === 'Open' ? 'bg-green-100 text-green-800' :
                                    feedback.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                        feedback.status === 'Resolved' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                }`}>
                                {feedback.status}
                            </span>
                            <button
                                onClick={() => toggleReplyForm(feedback.id)}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                                <FaReply /> Reply
                            </button>
                        </div>

                        {/* Replies */}
                        {feedback.replies.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">Replies</h4>
                                {feedback.replies.map(reply => (
                                    <ReplyContainer key={reply.id}>
                                        <div className={`text-sm ${reply.isAdmin ? 'font-semibold' : ''}`}>
                                            {reply.userName} {reply.isAdmin && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded ml-2">Staff</span>}
                                        </div>
                                        <p className="text-gray-700 mt-1">{reply.content}</p>
                                        <div className="text-xs text-gray-500 mt-1">{formatDate(reply.createdAt)}</div>
                                    </ReplyContainer>
                                ))}
                            </div>
                        )}

                        {/* Reply Form */}
                        {replyStates[feedback.id]?.isReplying && (
                            <ReplyForm>
                                <FormTextArea
                                    value={replyStates[feedback.id]?.replyText || ''}
                                    onChange={(e) => handleReplyTextChange(feedback.id, e.target.value)}
                                    placeholder="Write your reply..."
                                    className="mt-2"
                                />
                                <div className="mt-2 flex justify-end">
                                    <button
                                        onClick={() => toggleReplyForm(feedback.id)}
                                        className="px-3 py-1 mr-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => submitReply(feedback.id)}
                                        className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        Submit Reply
                                    </button>
                                </div>
                            </ReplyForm>
                        )}
                    </FeedbackCard>
                ))}
            </FeedbackList>
        </FeedbackContainer>
    );
};

export default Feedback;