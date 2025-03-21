import { ChatResponse, generateChatStream, listChat } from "@/services/chatAPI";
import { RootState } from "@/store";
import { setMessages } from "@/store/slices/messages.slice";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as ChatStyled from "./Chat.styled";
import MyMarkdown from "@/components/MyMarkdown/MyMarkdown";
import { useDocumentTitle } from "@/hooks";

const { Title, Text } = Typography;

export const suggestion = [
  "Analyze my spending habits",
  "I want to plan buy a house",
  "Saving strategies",
];

const Chat = () => {
  useDocumentTitle('Chat | Finex');
  const { messages } = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getHistoryChat = async () => {
    try {
      const response = await listChat();
      const historyMessages = response.data.data as ChatResponse[];
      dispatch(setMessages(historyMessages));
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    getHistoryChat();
  }, []);

  const handleSendMessage = async (inputMessage: string) => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { id: "default", message: inputMessage, role: "user" }];
    dispatch(setMessages(newMessages));
    setLoading(true);
    setInput("");
    setStreamingMessage("");

    try {
      const controller = new AbortController();
      const signal = controller.signal;
      
      // dispatch(
      //   setMessages([...newMessages, { id: "default", message: "", role: "assistant" }])
      // );

      let completeResponse = "";
      
      const onChunk = (chunk: string) => {
        setStreamingMessage(prev => prev + chunk);
        completeResponse += chunk;
      };
      
      await generateChatStream(inputMessage, onChunk, signal);
      
      const updatedMessages = [...newMessages, { 
        id: "default", 
        message: completeResponse, 
        role: "assistant" 
      }];
      dispatch(setMessages(updatedMessages));
      
    } catch (error) {
      console.error("Error: ", error);
      const errorMessages = [...newMessages, { 
        id: "default", 
        message: "Sorry, I encountered an error while processing your request.", 
        role: "assistant" 
      }];
      dispatch(setMessages(errorMessages));
    }
    setLoading(false);
    setStreamingMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage(input);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);

  return (
    <Flex justify="center" className="w-full">
      <Flex vertical justify="space-between" className="w-[50%] h-[700px]">
        <Flex>
          <Title level={4}> Chat with AI Advisor</Title>
        </Flex>
        <div className="h-[600px] p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
              <b style={{ color: msg.role === "user" ? "#18453E" : "gray" }}>
                {msg.role === "user" ? "You" : "Advisor"}
              </b>
              <Flex className="w-full" justify={msg.role === "user" ? "end" : "start"}>
                <div
                  className="w-fit bg-[#18453E] text-white px-4 py-2 rounded-3xl"
                  style={{ backgroundColor: msg.role === "user" ? "#18453E" : "gray" }}
                >
                  <MyMarkdown content={
                    msg.role === "assistant" && index === messages.length - 1 && loading
                      ? streamingMessage
                      : msg.message
                  } />
                </div>
              </Flex>
            </div>
          ))}

          {loading && streamingMessage === "" && (
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

          {streamingMessage !== "" && (
            <Flex justify="flex-start">
              <div style={{ textAlign: "left" }}>
                <b style={{ color: "gray" }}>Advisor</b>
                <Flex className="w-full" justify={"start"}>
                  <p
                    className="w-fit bg-[#18453E] text-white px-4 py-2 rounded-3xl"
                    style={{ backgroundColor: "gray" }}
                  >
                    <MyMarkdown content={streamingMessage} />
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
                  key={suggest}
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
        </div>
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
            disabled={loading}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chat;
