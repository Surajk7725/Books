import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/login';
import SignUp from './components/signup';
import Forgot from './components/forgot';
import Update from './components/updatePassword';
import Home from './components/user/home';
import Settings from './components/user/settings';
import Help from './components/help';
import Contactus from './components/user/contact.js';
import Profile from './components/user/profile';
import BookForm from './components/user/bookForm';
import AllBooks from './components/user/allBooks';
import BookDescription from './components/user/bookDescription';
import KidsBooks from './components/user/kidsBooks';
import PopularBooks from './components/user/popularBooks';
import AcademicBooks from './components/user/academicBooks';
import Rating from './components/user/rating';
import MyWishlist from './components/user/myWishlist';
import Notes from './components/user/notes';
import Writebook from './components/user/writebook';
import Staff_home from './components/staff/home';
import All_Books from './components/staff/displaybooks';
import Kids_Books from './components/staff/displaykidsbooks';
import Popular_Books from './components/staff/displaypopularbooks';
import Academic_Books from './components/staff/displayacademicbooks';
import AddBook from './components/staff/addbook';
import EditBook from './components/staff/editbook';
import Book_Description from './components/staff/bookdescription';
import Staff_Settings from './components/staff/staff-settings';
import Staff_Profile from './components/staff/staffprofile';
import UserContent from './components/staff/writtenDescription';
import NovelData from './components/staff/novelData';
import UserBooks from './components/staff/userbooks.js';
import ManageUser from './components/staff/manageuser.js';
import BookReview from './components/staff/bookreview.js';
import ContactUsR from './components/staff/contact.js';
import PageTitle from './components/pagetitle.js'; 
import AdminHome from './components/admin/home.js';
import UserCreate from './components/admin/usercreate.js';
import UserEdit from './components/admin/useredit.js';
import AdminCreate from './components/admin/admincreate.js';
import AdminEdit from './components/admin/adminedit.js';
import StaffCreate from './components/admin/staffcreate.js';
import StaffEdit from './components/admin/staffedit.js';
import UserDisplay from './components/admin/userdisplay.js';
import ProfilePage from './components/admin/adminprofile.js';
import AdminSidebar from './components/admin/sidebar.js';
import SettingsPage from './components/admin/settings.js';
import Contactresolve from './components/admin/contactresolve.js';
import SecurityPage from './components/admin/security.js';
import AdminDisplay from './components/admin/admindisplay.js';
import StaffDisplay from './components/admin/staffdisplay.js';
import Books from './components/admin/books.js';


function App() {
  // Initialize state from localStorage if available
  const initialBookmarkedBooks = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
  const [bookmarkedBooks, setBookmarkedBooks] = useState(initialBookmarkedBooks);

  // Update localStorage whenever bookmarkedBooks changes
  useEffect(() => {
    localStorage.setItem('bookmarkedBooks', JSON.stringify(bookmarkedBooks));
  }, [bookmarkedBooks]);

  const toggleBookmark = (bookId) => {
    setBookmarkedBooks((prevBookmarkedBooks) => {
      if (prevBookmarkedBooks.includes(bookId)) {
        return prevBookmarkedBooks.filter((id) => id !== bookId);
      } else {
        return [...prevBookmarkedBooks, bookId];
      }
    });
  };

  return (
    <Router>
      <PageTitle title="Book Hub" /> {/* Set the title for all pages */}
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/update-password" element={<Update />} />
        <Route path="/home" element={<Home />} />
        <Route path="/display-books" element={<AllBooks bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/display-books/description" element={<BookDescription />} />
        <Route path="/display-books/kids" element={<KidsBooks bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/display-books/popular" element={<PopularBooks bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/display-books/academics" element={<AcademicBooks bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/display-books/rating" element={<Rating />} />
        <Route path="/my-wishlist" element={<MyWishlist bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/user-addbook" element={<BookForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/private-notes" element={<Notes />} />
        <Route path="/write-book" element={<Writebook />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help-center" element={<Help />} />
        <Route path="/contactus" element={<Contactus />} />

        {/* Teacher Routes */}

        <Route path='/staff-home' element={<Staff_home />} />
        <Route path='/staff-allbooks' element={<All_Books />} />
        <Route path='/staff-allbooks/kids' element={<Kids_Books />} />
        <Route path='/staff-allbooks/popular' element={<Popular_Books />} />
        <Route path='/staff-allbooks/academic' element={<Academic_Books />} />
        <Route path='/staff-addbook' element={<AddBook />} />
        <Route path='/staff-editbook' element={<EditBook />} />
        <Route path='/staff-allbooks/description' element={<Book_Description />} />
        <Route path='/staff-settings' element={<Staff_Settings />} />
        <Route path='/staff-profile' element={<Staff_Profile />} />
        <Route path='/staff-writeinfo' element={<UserContent />} />
        <Route path='/novel-data' element={<NovelData />} />
        <Route path='/userbooks-data' element={<UserBooks />} />
        <Route path='/manageuser-data' element={<ManageUser />} />
        <Route path='/staff-bookreview' element={<BookReview />} />
        <Route path='/staff-contact' element={<ContactUsR />} />

        {/* Admin Routes */}

        <Route path="/admin/*" element={<AdminSidebar />}>
          <Route path='home' element={<AdminHome />} />
          <Route path='user-create' element={<UserCreate />} />
          <Route path='user-edit' element={<UserEdit />} />
          <Route path='admin-create' element={<AdminCreate />} />
          <Route path='admin-edit' element={<AdminEdit />} />
          <Route path='staff-edit' element={<StaffEdit />} />
          <Route path='staff-create' element={<StaffCreate />} />
          <Route path='user-display' element={<UserDisplay />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='contact-resolve' element={<Contactresolve />} />
          <Route path='security' element={<SecurityPage />} />
          <Route path='admin-display' element={<AdminDisplay />} />
          <Route path='staff-display' element={<StaffDisplay />} />
          <Route path='books' element={<Books />} />
 
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
