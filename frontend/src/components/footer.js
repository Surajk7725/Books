import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className='text-center text-sm'>
            &copy; {new Date().getFullYear()} BookHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer