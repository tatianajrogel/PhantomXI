import { createClient } from '@supabase/supabase-js';

// Polyfill WebSocket for Node < 22 during web/SSR build so realtime-js can init.
if (typeof (globalThis as any).WebSocket === 'undefined') {
  (globalThis as any).WebSocket = class {
    constructor() {
      throw new Error('WebSocket unavailable in this environment');
    }
  };
}

const supabaseUrl = 'https://xuotngtefwkocniegpjx.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjcwZjlhYjAxLTUwNWItNDU3OC05OGVjLTBlMmE2NDI3MzI5MyJ9.eyJwcm9qZWN0SWQiOiJ4dW90bmd0ZWZ3a29jbmllZ3BqeCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgxMzgxMTg1LCJleHAiOjIwOTY3NDExODUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.BfJPP9utOrggsfNXK2OXO-S8XYB1UCjHk_8nlnAag8M';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
