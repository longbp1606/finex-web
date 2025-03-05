import { generateChat } from "@/services/gptAPI";
import { RootState } from "@/store";
import { setMessages } from "@/store/slices/messages.slice";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, FloatButton, Input } from "antd"
import { useEffect, useRef, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { TbMessageCircleDollar } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux";

const ChatAI = () => {
    // const [messages, setMessages] = useState<ChatProps[]>([]);
    const [input, setInput] = useState('');
    const { messages } = useSelector((state: RootState) => state.messages);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        dispatch(setMessages(newMessages));
        setLoading(true);
        // setMessages(newMessages);

        try {
            const response = await generateChat(newMessages);
            const botMessage = response.data.choices[0].message;
            dispatch(setMessages([...newMessages, botMessage]));
            // setMessages([...newMessages, botMessage]);
        } catch (error) {
            console.error("Error: ", error);
        }
        setLoading(false);
        setInput('');
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <FloatButton.Group
                trigger='click'
                type='primary'
                icon={<TbMessageCircleDollar />}
                placement="left"
            >
                <Flex vertical justify="space-between" className="w-[350px] h-[500px] mb-[430px] bg-white rounded-xl border-2">
                    <Flex className="bg-[#18453E] rounded-t-xl">
                        <b className="text-white p-3"> Chat with AI Advisor</b>
                    </Flex>
                    <Flex vertical gap={20} className="h-[500px] p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{ textAlign: msg.role === "user" ? "right" : "left" }}
                            >
                                <b style={{ color: msg.role === "user" ? "#18453E" : "gray" }}>
                                    {msg.role === "user" ? "You" : "Advisor"}
                                </b>
                                <Flex
                                    className="w-full"
                                    justify={msg.role === "user" ? "end" : "start"}
                                >
                                    <p
                                        className="w-fit bg-[#18453E] text-white px-4 py-2 rounded-3xl"
                                        style={{ backgroundColor: msg.role === "user" ? "#18453E" : "gray" }}
                                    >
                                        {msg.content}
                                    </p>
                                </Flex>
                            </div>
                        ))}

                        {loading && (
                            <Flex justify="flex-start">
                                <div style={{ textAlign: "left" }}>
                                    <b style={{ color: "gray" }}>
                                        Advisor
                                    </b>
                                    <Flex
                                        className="w-full"
                                        justify={"start"}
                                    >
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

                        <div ref={messagesEndRef} />
                    </Flex>
                    <Flex gap={12} className="p-4">
                        <Input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter text..."
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<BsSendFill />}
                            onClick={handleSendMessage}
                        />
                    </Flex>
                </Flex>
            </FloatButton.Group>
        </>
    )
}

export default ChatAI