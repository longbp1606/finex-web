const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    API_URL: import.meta.env.VITE_API_URL,
    OPENAI_KEY: import.meta.env.VITE_OPENAI_KEY,
};

export default publicRuntimeConfig;