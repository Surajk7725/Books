import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Breadcrumb, Card} from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import axiosInstance from '../axiosInstance';
import {Chart as ChartJS,RadarController, RadialLinearScale,LineElement,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend} from 'chart.js';

ChartJS.register(RadarController, RadialLinearScale,LineElement,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend);

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Logins',
        data: [30, 45, 28, 50, 72, 60, 80],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Logouts',
        data: [20, 35, 18, 40, 62, 50, 70],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  };

  const barData = {
    labels: ['Viewed', 'Bookmarked', 'Downloaded'],
    datasets: [
      {
        label: 'User Interaction',
        data: [300, 150, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  

  const topBooks = [
    {
      title: 'Classroom of the Elite',
      cover: 'https://m.media-amazon.com/images/I/81+8UiitTuL._SY425_.jpg',
    },
    {
      title: 'To Kill a Mockingbird',
      cover: 'https://images.gr-assets.com/books/1553383690l/2657.jpg',
    },
    {
      title: 'Pride and Prejudice',
      cover: 'https://images.gr-assets.com/books/1320399351l/1885.jpg',
    },
  ];

  


function ViewUser() {
  const { username } = useParams(); 
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBookmarkedBooks = async () => {
      try {
        const response = await axiosInstance.get(`/books/user/${username}/bookmarks`);
        const allBookmarkedBooks = response.data;
        const limitedBookmarkedBooks = allBookmarkedBooks.slice(0, 3); // Limit to 3 books
        setBookmarkedBooks(limitedBookmarkedBooks);
      } catch (error) {
        console.error('Error fetching bookmarked books:', error);
      }
    };

    fetchBookmarkedBooks();
  }, [username]);


  return (
    

    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">

    <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">User Analysis</h1>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/admin/user-display">User Display</Link></Breadcrumb.Item>
                <Breadcrumb.Item>User Analysis</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="bg-white shadow-lg rounded-lg" >
            <h2 className="text-lg font-semibold mb-2 text-center">User Activity Trends</h2>
            <div className="h-64 md:h-96">
                <Line data={data} options={options} />
            </div>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg" >
            <h2 className="text-lg font-semibold mb-2 text-center">User Books Interaction</h2>
            <div className="h-64 md:h-96">
                <Bar data={barData} options={options} />
            </div>
        </Card>
    </div>

    <div className="bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-6">Top Bookmarked Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarkedBooks.map((book, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center">
              <div className="w-24 h-36 mb-2 flex items-center justify-center">
                <img src={book.coverImage ? `${baseURL}${book.coverImage.replace(/\\/g, '/')}` : 'default-image-path.jpg'} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium text-center">{book.title}</h3>
            </div>
          ))}
        </div>
      </div>
</div>

  )
}

export default ViewUser