import config from "@/config";
import axios, { AxiosResponse } from "axios";

export type ChatProps = {
    role: string;
    content: string;
}

export const generateChat = (newMessages: ChatProps[]): Promise<AxiosResponse> => {
    return axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4o-2024-08-06",
            messages: newMessages,
            temperature: 0.7,
        },
        {
            headers: {
                "Authorization": `Bearer ${config.publicRuntime.OPENAI_KEY}`,
                "Content-Type": "application/json",
            },
        },
    );
}