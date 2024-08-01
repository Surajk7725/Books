import React, { useState } from 'react';
import NavBar from './navbar';
import Footer from './user/footer';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSearchQuery(''); // Reset search query when selecting a tag
    filterFAQ(tag, ''); // Filter with the selected tag and empty search query
  };

  const filterFAQ = (tag, query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = faqData.filter((faq) => {
      const matchesTag = tag ? faq.tags.includes(tag) : true;
      const matchesQuery = faq.question.toLowerCase().includes(lowerCaseQuery);
      return matchesTag && matchesQuery;
    });
    setFilteredFAQs(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterFAQ(selectedTag, query); // Filter with the selected tag and current search query
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div className="flex-grow bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            What can we help you with?
          </h1>
          <div className="relative mx-auto max-w-lg">
            <input
              className="w-full py-3 pl-4 pr-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Search your question here..."
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              🔍
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h2>
            <div className="flex flex-wrap -m-1">
              {['Getting Started', 'Account', 'Troubleshooting', 'Integrations'].map(
                (tag) => (
                  <button
                    key={tag}
                    className={`m-1 px-3 py-1 rounded-full ${
                      selectedTag === tag ? 'bg-primary-100 text-primary-800' : 'bg-gray-200 text-gray-800'
                    } hover:bg-primary-200 transition-colors duration-200`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <button className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-200">
              Ask your question here
            </button>
          </div>
        </div>
      </div>
      <Footer className="mt-auto bg-gray-800 text-white py-4" />
    </div>
  );
};

const faqData = [
  // Getting Started
  {
    question: 'How do I create an account?',
    answer:
      'Creating an account is easy! Simply click the "Sign Up" button on our homepage and follow the prompts to enter your information. You\'ll need to provide a valid email address and create a secure password.',
    tags: ['Getting Started', 'Account']
  },
  {
    question: 'How can I start using your service?',
    answer:
      'To start using our service, visit our homepage and click on the "Sign Up" button. Follow the registration process to create your account and get started.',
    tags: ['Getting Started']
  },
  {
    question: 'Where can I find your user guide?',
    answer:
      'Our user guide is available in the Help section of our website. You can also access it directly through your account dashboard after logging in.',
    tags: ['Getting Started']
  },
  {
    question: 'What are the benefits of creating an account?',
    answer:
      'Creating an account allows you to personalize your experience, access exclusive features, and manage your preferences and settings.',
    tags: ['Getting Started', 'Account']
  },
  {
    question: 'Is there a fee for creating an account?',
    answer:
      'No, creating an account on our platform is completely free of charge. You only need to provide basic information to get started.',
    tags: ['Getting Started']
  },
  {
    question: 'Can I create multiple accounts?',
    answer:
      'No, our platform allows only one account per user. This policy ensures security and prevents misuse of our services.',
    tags: ['Getting Started']
  },

  // Account
  {
    question: 'How do I log into my account?',
    answer:
      'To log into your account, go to our homepage and click on the "Log In" button. Enter your registered email address and password, then click "Sign In".',
    tags: ['Account']
  },
  {
    question: 'How can I update my account information?',
    answer:
      'You can update your account information by navigating to the settings page after logging in. Edit your profile details and save the changes.',
    tags: ['Account']
  },
  {
    question: 'Can I change my password?',
    answer:
      'Yes, you can change your password anytime by visiting the account settings page. Select the "Change Password" option and follow the instructions.',
    tags: ['Account']
  },
  {
    question: 'What should I do if I encounter issues with my account login?',
    answer:
      'If you have trouble logging into your account, ensure your internet connection is stable and try clearing your browser cache. Contact our support team if the problem persists.',
    tags: ['Account', 'Troubleshooting']
  },
  {
    question: 'How can I delete my account?',
    answer:
      'To delete your account, please contact our customer support team for assistance. We will guide you through the account deletion process.',
    tags: ['Account']
  },
  {
    question: 'Can I recover a deleted account?',
    answer:
      'Once an account is deleted, it cannot be recovered. You will need to create a new account if you wish to use our services again.',
    tags: ['Account']
  },

  // Troubleshooting
  {
    question: 'What should I do if I forget my password?',
    answer:
      'If you forget your password, click on the "Forgot Password?" link on the login page. Follow the instructions to reset your password via email.',
    tags: ['Account', 'Troubleshooting']
  },
  {
    question: 'How can I troubleshoot login issues?',
    answer:
      'For login issues, ensure your internet connection is stable and your credentials are correct. Try clearing your browser cookies and cache, or use a different browser.',
    tags: ['Troubleshooting']
  },
  {
    question: 'Why am I unable to access certain features?',
    answer:
      'If you cannot access certain features, check your account permissions or subscription status. Contact our support team for further assistance.',
    tags: ['Troubleshooting']
  },
  {
    question: 'How do I report a technical issue?',
    answer:
      'To report a technical issue, contact our support team via email or live chat. Provide details about the problem you are experiencing for faster assistance.',
    tags: ['Troubleshooting']
  },
  {
    question: 'What should I do if the website is not loading properly?',
    answer:
      'If the website is not loading properly, check your internet connection and try refreshing the page. Clear your browser cache and cookies if the issue persists.',
    tags: ['Troubleshooting']
  },
  {
    question: 'How do I troubleshoot browser compatibility issues?',
    answer:
      'For browser compatibility issues, ensure you are using a supported browser version. Update your browser or try using a different one to see if the issue persists.',
    tags: ['Troubleshooting']
  },

  // Integrations
  {
    question: 'How can I integrate your service with my website?',
    answer:
      'To integrate our service with your website, use our API documentation to understand integration requirements and follow the provided guidelines.',
    tags: ['Integrations']
  },
  {
    question: 'Do you offer APIs for third-party integrations?',
    answer:
      'Yes, we provide APIs for third-party integrations. Visit our developer portal for API documentation and guidelines on integrating with our service.',
    tags: ['Integrations']
  },
  {
    question: 'What are the benefits of integrating with third-party applications?',
    answer:
      'Integrating with third-party applications allows you to enhance functionality, streamline processes, and provide a seamless experience for your users.',
    tags: ['Integrations']
  },
  {
    question: 'How do I manage integrations in my account?',
    answer:
      'You can manage integrations by navigating to the settings or integrations page in your account dashboard. Add, remove, or configure integrations as needed.',
    tags: ['Integrations']
  },
  {
    question: 'Are there any limitations to integrating with third-party applications?',
    answer:
      'Some third-party applications may have specific requirements or limitations for integration. Review our documentation and contact support for assistance.',
    tags: ['Integrations']
  },
  {
    question: 'Can I integrate your service with popular platforms like WordPress or Shopify?',
    answer:
      'Yes, our service supports integration with popular platforms like WordPress and Shopify. Follow our integration guides for detailed instructions.',
    tags: ['Integrations']
  },
];

export default FAQPage;



