import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaReply,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
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
  StarRating,
} from "./Feedback.styled";
import {
  mockFeedbackData,
  feedbackTypes,
  RenderStars,
  FeedbackItem,
  FeedbackType as FeedbackTypeEnum,
} from "./mockData";
import {
  createFeedback,
  listFeedbacks,
  replyFeedback,
} from "@/services/feedbackAPI";
import { Button, message } from "antd";

const Feedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [newFeedback, setNewFeedback] = useState({
    title: "",
    content: "",
    type: "General" as FeedbackTypeEnum,
    rating: 0,
  });
  const [replyStates, setReplyStates] = useState<{
    [key: string]: { isReplying: boolean; replyText: string };
  }>({});
  const [loading, setLoading] = useState(false);

  // Load feedbacks from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await listFeedbacks();
        const items = res?.data || [];
        // Map API shape to UI shape (convert dates to Date)
        const mapped: FeedbackItem[] = items.map((f) => ({
          id: f.id,
          userId: f.userId,
          userName: f.userName,
          title: f.title,
          content: f.content,
          type: (f.type as FeedbackTypeEnum) || "General",
          rating: f.rating,
          createdAt: new Date(f.createdAt),
          status: (f.status as FeedbackItem["status"]) || "Open",
          replies: (f.replies || []).map((r) => ({
            id: r.id,
            userId: r.userId,
            userName: r.userName,
            content: r.content,
            createdAt: new Date(r.createdAt),
            isAdmin: r.isAdmin,
          })),
        }));
        setFeedbacks(mapped);
      } catch (e) {
        // Fallback to mock data on failure
        setFeedbacks(mockFeedbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating: number) => {
    setNewFeedback((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFeedback.title || !newFeedback.content || !newFeedback.rating) {
      message.warning("Please fill all required fields and provide a rating");
      return;
    }

    try {
      setLoading(true);
      const res = await createFeedback({
        title: newFeedback.title,
        content: newFeedback.content,
        type: newFeedback.type,
        rating: newFeedback.rating,
      });
      const created = res.data;
      const mapped: FeedbackItem = {
        id: created.id,
        userId: created.userId,
        userName: created.userName,
        title: created.title,
        content: created.content,
        type: (created.type as FeedbackTypeEnum) || "General",
        rating: created.rating,
        createdAt: new Date(created.createdAt),
        status: (created.status as FeedbackItem["status"]) || "Open",
        replies: (created.replies || []).map((r) => ({
          id: r.id,
          userId: r.userId,
          userName: r.userName,
          content: r.content,
          createdAt: new Date(r.createdAt),
          isAdmin: r.isAdmin,
        })),
      };
      setFeedbacks([mapped, ...feedbacks]);
      setNewFeedback({ title: "", content: "", type: "General", rating: 0 });
      message.success("Feedback submitted");
    } catch (error) {
      message.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  const toggleReplyForm = (feedbackId: string) => {
    setReplyStates((prev) => ({
      ...prev,
      [feedbackId]: {
        isReplying: !(prev[feedbackId]?.isReplying || false),
        replyText: prev[feedbackId]?.replyText || "",
      },
    }));
  };

  const handleReplyTextChange = (feedbackId: string, text: string) => {
    setReplyStates((prev) => ({
      ...prev,
      [feedbackId]: {
        ...prev[feedbackId],
        replyText: text,
      },
    }));
  };

  const submitReply = async (feedbackId: string) => {
    const text = replyStates[feedbackId]?.replyText?.trim();
    if (!text) return;

    try {
      setLoading(true);
      const res = await replyFeedback(feedbackId, { content: text });
      const updated = res.data;
      // Replace that item in state
      setFeedbacks((prev) =>
        prev.map((f) => {
          if (f.id !== feedbackId) return f;
          return {
            id: updated.id,
            userId: updated.userId,
            userName: updated.userName,
            title: updated.title,
            content: updated.content,
            type: (updated.type as FeedbackTypeEnum) || "General",
            rating: updated.rating,
            createdAt: new Date(updated.createdAt),
            status: (updated.status as FeedbackItem["status"]) || "Open",
            replies: (updated.replies || []).map((r) => ({
              id: r.id,
              userId: r.userId,
              userName: r.userName,
              content: r.content,
              createdAt: new Date(r.createdAt),
              isAdmin: r.isAdmin,
            })),
          } as FeedbackItem;
        })
      );
      message.success("Reply posted");
    } catch (error) {
      message.error("Failed to post reply");
    } finally {
      // Reset reply state
      setReplyStates((prev) => ({
        ...prev,
        [feedbackId]: {
          isReplying: false,
          replyText: "",
        },
      }));
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
            {feedbackTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Rating</FormLabel>
          <StarRating>
            {[1, 2, 3, 4, 5].map((rating) => (
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

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </SubmitButton>
      </FeedbackForm>

      {/* Feedback List */}
      <FeedbackList>
        {feedbacks.map((feedback) => (
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
              <span
                className={`px-2 py-1 text-xs rounded ${
                  feedback.status === "Open"
                    ? "bg-green-100 text-green-800"
                    : feedback.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : feedback.status === "Resolved"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {feedback.status}
              </span>
              <Button
                size="small"
                type="primary"
                icon={<FaReply />}
                onClick={() => toggleReplyForm(feedback.id)}
              >
                Reply
              </Button>
            </div>

            {/* Replies */}
            {feedback.replies.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Replies</h4>
                {feedback.replies.map((reply) => (
                  <ReplyContainer key={reply.id}>
                    <div
                      className={`text-sm ${
                        reply.isAdmin ? "font-semibold" : ""
                      }`}
                    >
                      {reply.userName}{" "}
                      {reply.isAdmin && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded ml-2">
                          Staff
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mt-1">{reply.content}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(reply.createdAt)}
                    </div>
                  </ReplyContainer>
                ))}
              </div>
            )}

            {/* Reply Form */}
            {replyStates[feedback.id]?.isReplying && (
              <ReplyForm>
                <FormTextArea
                  value={replyStates[feedback.id]?.replyText || ""}
                  onChange={(e) =>
                    handleReplyTextChange(feedback.id, e.target.value)
                  }
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
                    {loading ? "Posting..." : "Submit Reply"}
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
