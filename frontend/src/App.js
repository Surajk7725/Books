import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Landing from './components/landing.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';
import Forgot from './components/forgot.js';
import Update from './components/updatePassword.js';
import Home from './components/user/home.js';
import Settings from './components/user/settings.js';
import Help from './components/help.js';
import Contactus from './components/user/contact.js';
import Profile from './components/user/profile.js';
import BookForm from './components/user/bookForm.js';
import AllBooks from './components/user/allBooks.js';
import BookDescription from './components/user/bookDescription.js';
import KidsBooks from './components/user/kidsBooks.js';
import PopularBooks from './components/user/popularBooks.js';
import AcademicBooks from './components/user/academicBooks.js';
import Rating from './components/user/rating.js';
import MyWishlist from './components/user/myWishlist.js';
import Notes from './components/user/notes.js';
import Writebook from './components/user/writebook.js';
import Staff_home from './components/staff/home.js';
import All_Books from './components/staff/displaybooks.js';
import Kids_Books from './components/staff/displaykidsbooks.js';
import Popular_Books from './components/staff/displaypopularbooks.js';
import Academic_Books from './components/staff/displayacademicbooks.js';
import AddBook from './components/staff/addbook.js';
import EditBook from './components/staff/editbook.js';
import Book_Description from './components/staff/bookdescription.js';
import Staff_Settings from './components/staff/staff-settings.js';
import Staff_Profile from './components/staff/staffprofile.js';
import UserContent from './components/staff/writtenDescription.js';
import NovelData from './components/staff/novelData.js';
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
import ViewBook from './components/admin/viewbook.js';
import ViewUser from './components/admin/viewuser.js';
import ViewStaff from './components/admin/viewstaff.js';
import ProtectedRoute from './components/protectedRoute.js';
import { AuthProvider } from './components/authcontext.js';


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
      <AuthProvider>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/update-password" element={<Update />} />

        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/display-books" element={<AllBooks bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/display-books/:title/description" element={<BookDescription />} />
        <Route path="/display-books/Kids" element={<KidsBooks bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/display-books/Popular" element={<PopularBooks bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/display-books/Academics" element={<AcademicBooks bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/display-books/rating/:title" element={<Rating />} />
        <Route path="/my-wishlist" element={<MyWishlist bookmarkedBooks={bookmarkedBooks} toggleBookmark={toggleBookmark} />} />
        <Route path="/user-addbook" element={<BookForm />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/private-notes" element={<Notes />} />
        <Route path="/write-book" element={<Writebook />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help-center" element={<Help />} />
        <Route path="/contactus" element={<Contactus />} />
        </Route>

        {/* Teacher Routes */}
        <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
        <Route path='/staff-home' element={<Staff_home />} />
        <Route path='/staff-allbooks' element={<All_Books />} />
        <Route path='/staff-allbooks/Kids' element={<Kids_Books />} />
        <Route path='/staff-allbooks/Popular' element={<Popular_Books />} />
        <Route path='/staff-allbooks/Academics' element={<Academic_Books />} />
        <Route path='/staff-addbook' element={<AddBook />} />
        <Route path='/staff-editbook/:title' element={<EditBook />} />
        <Route path='/staff-allbooks/:title/description' element={<Book_Description />} />
        <Route path='/staff-settings' element={<Staff_Settings />} />
        <Route path='/staff-profile/:username' element={<Staff_Profile />} />
        <Route path='/staff-writeinfo' element={<UserContent />} />
        <Route path='/novel-data' element={<NovelData />} />
        <Route path='/userbooks-data' element={<UserBooks />} />
        <Route path='/manageuser-data' element={<ManageUser />} />
        <Route path='/staff-bookreview' element={<BookReview />} />
        <Route path='/staff-contact' element={<ContactUsR />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/*" element={<AdminSidebar />}>
          <Route path='home' element={<AdminHome />} />
          <Route path='user-create' element={<UserCreate />} />
          <Route path='user-edit/:username' element={<UserEdit />} />
          <Route path='admin-create' element={<AdminCreate />} />
          <Route path='admin-edit/:username' element={<AdminEdit />} />
          <Route path='staff-edit/:username' element={<StaffEdit />} />
          <Route path='staff-create' element={<StaffCreate />} />
          <Route path='user-display' element={<UserDisplay />} />
          <Route path='profile/:username' element={<ProfilePage />} />
          <Route path='settings/:username' element={<SettingsPage />} />
          <Route path='contact-resolve' element={<Contactresolve />} />
          <Route path='security' element={<SecurityPage />} />
          <Route path='admin-display' element={<AdminDisplay />} />
          <Route path='staff-display' element={<StaffDisplay />} />
          <Route path='books' element={<Books />} />
          <Route path='books/view/:title' element={<ViewBook />} />
          <Route path='user-display/view' element={<ViewUser />} />
          <Route path='staff-display/view' element={<ViewStaff />} />
 
        </Route>
       </Route>

       <Route path="*" element={<Navigate to="/login" />} />
        
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
