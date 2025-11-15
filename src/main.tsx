import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress non-critical console errors from third-party scripts (Discord, Sentry, etc.)
// These don't affect functionality but can clutter the console
const originalError = console.error;
console.error = (...args: any[]) => {
  const message = args[0]?.toString() || '';
  // Filter out known non-critical errors
  if (
    message.includes('AnalyticsTrackImpressionContext') ||
    message.includes('sentry.') ||
    message.includes('ERR_BLOCKED_BY_CLIENT') && message.includes('/api/v9/science')
  ) {
    // Silently ignore these - they're from Discord/Sentry and don't affect our app
    return;
  }
  // Log all other errors normally
  originalError.apply(console, args);
};

createRoot(document.getElementById("root")!).render(<App />);
