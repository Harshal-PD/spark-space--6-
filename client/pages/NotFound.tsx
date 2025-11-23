import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-white/70 mb-6">Oops! Page not found</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-semibold text-white shadow-glow hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
