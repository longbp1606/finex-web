import { generateChat } from "@/services/chatAPI";
import { RootState } from "@/store";
import { setMessages } from "@/store/slices/messages.slice";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as ChatStyled from "./Chat.styled";
import MyMarkdown from "@/components/MyMarkdown/MyMarkdown";

const { Title, Text } = Typography;

export const suggestion = [
  "Analyze my spending habits",
  "I want to plan buy a house",
  "Saving strategies",
];

const Chat = () => {
  // const [messages, setMessages] = useState<ChatProps[]>([]);
  const { messages } = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async (inputMessage: string) => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { message: inputMessage, isUser: true }];
    dispatch(setMessages(newMessages));
    // setMessages(newMessages);
    setLoading(true);
    setInput("");

    try {
      const response = await generateChat(inputMessage);
      const botMessage = response.data.data;
      dispatch(
        setMessages([...newMessages, { message: botMessage, isUser: false }])
      );
      // setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error: ", error);
    }
    setLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage(input);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Flex justify="center" className="w-full">
      <Flex vertical justify="space-between" className="w-[50%] h-[700px]">
        <Flex>
          <Title level={4}> Chat with AI Advisor</Title>
        </Flex>
        <Flex
          vertical
          gap={20}
          className="h-[600px] p-4 overflow-y-auto"
          justify="flex-end"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{ textAlign: msg.isUser ? "right" : "left" }}
            >
              <b style={{ color: msg.isUser ? "#18453E" : "gray" }}>
                {msg.isUser ? "You" : "Advisor"}
              </b>
              <Flex className="w-full" justify={msg.isUser ? "end" : "start"}>
                <div
                  className="w-fit bg-[#18453E] text-white px-4 py-2 rounded-3xl"
                  style={{ backgroundColor: msg.isUser ? "#18453E" : "gray" }}
                >
                  <MyMarkdown content={msg.message} />
                </div>
              </Flex>
            </div>
          ))}

          {loading && (
            <Flex justify="flex-start">
              <div style={{ textAlign: "left" }}>
                <b style={{ color: "gray" }}>Advisor</b>
                <Flex className="w-full" justify={"start"}>
                  <p
                    className="w-fit bg-[#18453E] text-white px-4 py-2 rounded-3xl"
                    style={{ backgroundColor: "gray" }}
                  >
                    <LoadingOutlined spin />
                  </p>
                </Flex>
              </div>
            </Flex>
          )}

          {messages.length === 0 && (
            <Flex align="flex-end" vertical gap={12}>
              <Text className="text-italic">Chat suggestion:</Text>
              {suggestion.map((suggest) => (
                <Flex
                  className="w-full"
                  justify="end"
                  onClick={() => handleSendMessage(suggest)}
                >
                  <p className="w-fit text-[#18453E] px-4 py-2 rounded-3xl border-[#18453E] border hover:bg-[#18453E] hover:text-white transition-all ease-linear">
                    {suggest}
                  </p>
                </Flex>
              ))}
            </Flex>
          )}

          <div ref={messagesEndRef} />
        </Flex>
        <Flex gap={12} className="w-2xl p-4" align="center">
          <ChatStyled.ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text..."
            className="w-half"
            autoSize={{ minRows: 1, maxRows: 4 }}
          />
          <ChatStyled.SendButton
            type="primary"
            shape="circle"
            icon={<BsSendFill size={16} />}
            onClick={() => handleSendMessage(input)}
            onKeyDown={handleKeyDown}
            style={{ width: "45px", height: "42px" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chat;
