import React from 'react'
import NavBar from '../navbar';

export default function Settings() {
  return (
    <div>
    <NavBar />
    <div class="flex flex-col min-h-screen bg-primary text-secondary">
  <header class="bg-accent py-4 px-6 flex justify-between items-center">
    <h1 class="text-2xl font-bold">Settings</h1>
    <button class="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg text-white">
      Logout 🚪
    </button>
  </header>
  <main class="flex-grow p-6">
    <section class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Account</h2>
      <div class="mb-4">
        <label class="block font-semibold mb-2" for="name">Name</label>
        <input class="border border-gray-300 rounded-md px-3 py-2 w-full" id="name" placeholder="Enter your name" type="text" />
      </div>
      <div class="mb-4">
        <label class="block font-semibold mb-2" for="email">Email</label>
        <input class="border border-gray-300 rounded-md px-3 py-2 w-full" id="email" placeholder="Enter your email" type="email" />
      </div>
      <div class="mb-4">
        <label class="block font-semibold mb-2" for="phone">Phone Number</label>
        <input class="border border-gray-300 rounded-md px-3 py-2 w-full" id="phone" placeholder="Enter your phone number" type="tel" />
      </div>
      <div class="mb-4">
        <label class="block font-semibold mb-2" for="avatar">Profile Picture</label>
        <div class="flex items-center">
          <img class="w-16 h-16 rounded-full object-cover mr-4" src="https://placehold.co/64x64" alt="A placeholder image for a user's profile picture, which is a circle with a gray background and a white question mark in the center." />
          <input class="border border-gray-300 rounded-md px-3 py-2" id="avatar" type="file" accept="image/*" />
        </div>
      </div>
      <button class="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg text-white">
        Save Changes
      </button>
    </section>
    <section class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Security</h2>
      <div class="mb-4">
        <label class="block font-semibold mb-2" for="password">Change Password</label>
        <input class="border border-gray-300 rounded-md px-3 py-2 w-full mb-2" id="password" placeholder="Enter new password" type="password" />
        <input class="border border-gray-300 rounded-md px-3 py-2 w-full" id="confirm-password" placeholder="Confirm new password" type="password" />
      </div>
      <button class="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg text-white">
        Update Password
      </button>
    </section>
  </main>
  <footer class="bg-gray-800 py-4">
        <div class="container mx-auto text-center">
          <p class="text-white">&copy; Designed by Tome 2024</p>
        </div>
    </footer>    
</div>
</div>
  )
};

