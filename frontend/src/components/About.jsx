import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 pt-24 pb-10">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg p-10 lg:p-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">Cloud Vault</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <b>Cloud Vault</b> is your secure, reliable, and always-accessible
          cloud storage solution.
          <b>Upload, access, and download</b> your important files from anywhere
          in the world—whether it's work, school, or personal projects, your
          data is always just a click away.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Feature
            icon="🔒"
            title="Secure & Private"
            description="Your files are stored safely with encryption and privacy in mind."
          />
          <Feature
            icon="🌍"
            title="Anywhere Access"
            description="Retrieve your files from any device, anywhere in the world."
          />
          <Feature
            icon="⚡"
            title="Fast & Reliable"
            description="Lightning-fast uploads and downloads, so you're never waiting."
          />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
    <span className="text-4xl">{icon}</span>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
      {title}
    </h2>
    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 text-center">
      {description}
    </p>
  </div>
);

export default About;