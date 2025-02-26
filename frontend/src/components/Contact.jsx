import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg p-10 lg:p-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Contact{" "}
          <span className="text-blue-600 dark:text-blue-400">Cloud Vault</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Have questions or need support? Reach out to us through the details
          below.
        </p>

        <div className="mt-8 space-y-6 text-left">
          <ContactDetail
            icon="📍"
            title="Address"
            info="123 Cloud Street, San Francisco, CA"
          />
          <ContactDetail icon="📞" title="Phone" info="+91 9775567890" />
          <ContactDetail
            icon="✉️"
            title="Email"
            info="support@cloudvault.com"
          />
          <ContactDetail icon="🌍" title="Website" info="www.cloudvault.com" />
        </div>
      </div>
    </div>
  );
};

const ContactDetail = ({ icon, title, info }) => (
  <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-lg">
    <span className="text-2xl">{icon}</span>
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{info}</p>
    </div>
  </div>
);

export default Contact;