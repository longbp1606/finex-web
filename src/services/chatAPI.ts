import config from "@/config";
import { get, post } from "./apiCaller";
import cookieUtils from "./cookieUtils";

export const generateChat = (message: string) => {
  return post("/api/chat", { message });
};

export const listChat = () => {
  return get("/api/chat");
};

export interface ChatResponse {
  id: string;
  message: string;
  role: string;
}

export interface ChatRequest {
  message: string;
}

export const generateChatStream = async (
  message: string,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
) => {
  try {
    const token = cookieUtils.getToken();
    const response = await fetch(`${config.publicRuntime.API_URL}/api/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ message }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }
      
      // Decode the chunk and add to buffer
      buffer += decoder.decode(value, { stream: true });
      
      // Process complete SSE messages
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.substring(6));
            
            if (data.text) {
              // Send the text chunk to the callback
              onChunk(data.text);
            }
            
            if (data.done) {
              // Stream is complete
              return;
            }
            
            if (data.error) {
              throw new Error(data.error);
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }
    }
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Error in stream:', error);
      throw error;
    }
  }
};
