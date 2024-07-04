import React, { useState } from 'react';
import NavBar from '../navbar';


const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  return (
    <div>
    <NavBar/>
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">What can we help you with?</h1>
        <div className="relative mx-auto max-w-lg">
          <input
            className="w-full py-3 pl-4 pr-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search your question here..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            🔍
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h2>
          <div className="flex flex-wrap -m-1">
            {['Getting Started', 'Account', 'Troubleshooting', 'Integrations'].map((tag) => (
              <button
                key={tag}
                className="m-1 px-3 py-1 rounded-full bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors duration-200"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqData.map((faq, index) => (
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
    </div>
  );
};

const faqData = [
  {
    question: 'How do I create an account?',
    answer:
      'Creating an account is easy! Simply click the "Sign Up" button on our homepage and follow the prompts to enter your information. You\'ll need to provide a valid email address and create a secure password.'
  },
  {
    question: 'How do I search for books?',
    answer:
      'To search for books, simply enter your keywords in the search bar on our homepage. You can search by title, author, genre, or any other relevant term. Our advanced search filters allow you to refine your results further.'
  },
  {
    question: 'Can I preview books ?',
    answer:
      'Yes, we offer a preview feature for most of our books. When you click on a book\'s cover image, you\'ll see an option to "Preview" the book. This allows you to read a sample portion before making a purchase decision.'
  },
  {
    question: 'I cannot find a book I am looking for in your search results. What should I do?',
    answer:
      'If you still cannot find the book, our customer support team is here to help. You can reach out to them via live chat, email, or phone, and they will assist you in locating the book or providing alternative suggestions.'
  },
  {
    question: 'Do you offer discounts or promotions?',
    answer:
      'Absolutely! We frequently offer discounts and promotions to our customers. Be sure to sign up for our newsletter to stay informed about our latest deals, sales, and special offers on books and other products.'
  },
  {
    question: 'How can I search for a specific book on your platform?',
    answer:
      'To search for a specific book, simply use the search bar located at the top of our website. Type in the title, author, or keywords related to the book you re looking for, and our search feature will help you find relevant results quickly. You can also use filters such as genre, author, publication year, and more to narrow down your search.'
  }
];

export default FAQPage;
