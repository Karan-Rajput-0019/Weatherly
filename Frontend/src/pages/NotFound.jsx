import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-4">Page not found.</p>
      <Link
        to="/dashboard"
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        Go to dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;
