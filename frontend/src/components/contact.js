import React from 'react';
import NavBar from './navbar';

const ContactUs = () => {
  return (
    <div>
    <NavBar/>
      {/* Existing Contact Us section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-lg text-gray-500">
              Have questions, feedback, or need assistance? Reach out to our dedicated support team. We're here to help with any inquiries you have regarding our products, services, or your experience.
            </p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Phone */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-primary-500 p-3 shadow-lg">
                        📞
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Phone</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Contact us via phone for immediate assistance with any inquiries or issues you may have.
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              {/* Email */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-primary-500 p-3 shadow-lg">
                        ✉️
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Email</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Prefer to send us an email? We'll respond promptly to address your questions or concerns.
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">support@example.com</p>
                  </div>
                </div>
              </div>
              {/* Online Form */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-primary-500 p-3 shadow-lg">
                        📝
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Online Form</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Fill out our online form, and a member of our support team will get back to you as soon as possible.
                    </p>
                    <a className="mt-2 inline-flex items-center text-base font-semibold text-primary-600 hover:text-primary-500" href="#" target="_blank">
                      Submit a Request
                      <svg aria-hidden="true" className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fillRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New section to be added separately */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-extrabold text-gray-900">Send us a message</h2>
            <form className="mt-8 grid grid-cols-1 gap-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                <div className="mt-1">
                  <input autoComplete="name" className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-2 border-black rounded-md" id="name" name="name" required type="text"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email address</label>
                <div className="mt-1">
                  <input autoComplete="email" className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-2 border-black rounded-md" id="email" name="email" required type="email"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                <div className="mt-1">
                  <textarea className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-2 border-black rounded-md" id="message" name="message" required rows="4"></textarea>
                </div>
              </div>
              <div className="flex justify-center">
                <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
