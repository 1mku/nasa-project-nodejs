const { DEV } = import.meta.env;

export const API_URL = DEV ? 'http://localhost:8000/v1' : 'v1';
