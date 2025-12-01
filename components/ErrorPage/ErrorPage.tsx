"use client";

import Link from "next/link";

type ErrorPageProps = {
  title?: string;
  message?: string;
  statusCode?: number;
  showRetry?: boolean;
};

export const ErrorPage = ({
  title = "Something went wrong",
  message = "We encountered an error while loading this page. Please try again later.",
  statusCode,
  showRetry = true,
}: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        {statusCode && <div className="text-6xl font-bold text-red-300 mb-4">{statusCode}</div>}
        <h1 className="text-2xl font-bold text-red-800 mb-2">{title}</h1>
        <p className="text-red-600 mb-6">{message}</p>
        {showRetry && (
          <div className="flex gap-4 justify-center">
            <Link href="/" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Go Home
            </Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
