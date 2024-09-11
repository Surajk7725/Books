import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Card } from 'antd';
import { Line, Pie, Bar } from 'react-chartjs-2';
import Book4 from '../images/book-4.jpg';
import axiosInstance from '../axiosInstance';
import { Chart as ChartJS, RadarController, RadialLinearScale, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadarController, RadialLinearScale, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function ViewBook() {
  const [showMore, setShowMore] = useState(false);
  const [bookData, setBookData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { title } = useParams(); 

  const baseURL = process.env.REACT_APP_API_URL;

  // Fetch Book Overview Data
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axiosInstance.get(`/books/display/${title}`); 
        setBookData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch book data');
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  //Show More Logic
  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  const combinedData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Views',
        data: [65, 59, 80, 81, 56],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Bookmarks',
        data: [12, 19, 3, 5, 2],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Downloads',
        data: [5, 2, 3, 1, 2],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  const lineoptions = {
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

  const topUsers = [
    {
      username: 'Yuuichi Katagiri',
      image: 'https://wallpapers.com/images/hd/yuuichi-katagiri-anime-portrait-5xl430n009kmsg7l.jpg'
    },
    {
      username: 'Kiyotaka Ayanokoji',
      image: 'https://i.pinimg.com/originals/84/d3/fa/84d3fa68414aecbc3172909302cb5144.jpg'
    },
    {
      username: 'Nagi Seishiro',
      image: 'https://dthezntil550i.cloudfront.net/ec/latest/ec2305160145567360024742816/1280_960/33c8e334-53bd-4beb-8ef4-8873b4468ce2.png'
    }
  ];


  const userInteractionData = {
    labels: ['Views', 'Bookmarks', 'Downloads'],
    datasets: [
      {
        label: 'User Interactions',
        data: [300, 50, 100],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        radius: '85%',
      },
    ],
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Monthly labels
    datasets: [
      {
        label: '18-24 Years',
        data: [150, 200, 180, 220, 210, 230],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: '25-34 Years',
        data: [180, 190, 160, 210, 220, 250],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '35-44 Years',
        data: [130, 150, 140, 170, 160, 180],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} users`;
            }
            return label;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    },
  };


  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-2 mt-4 md:ml-10">

      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4 mb-4 md:mb-0">Book Analysis</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/books">Display Books</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Book Analysis</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Book Overview</h1>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 w-32 h-48 mx-auto md:mr-6 mb-4 md:mb-0">
              <img
                src={bookData.coverImage ? `${baseURL}${bookData.coverImage.replace(/\\/g, '/')}` : 'default-image-path.jpg'}
                alt="Book Cover"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg mb-4 ml-4"><strong>Title:</strong> {bookData.title || 'Classroom of the Elite'}</p>
              <p className="text-lg mb-4 ml-4"><strong>Author:</strong> {bookData.authors || 'Shōgo Kinugasa'}</p>
              <p className="text-lg mb-4 ml-4"><strong>Genre:</strong> {bookData.genre || 'School, Dark Psychology'}</p>
              <p className="text-lg ml-4">
                <strong>Description:</strong>
                <p className={`mt-2 ${showMore ? '' : 'line-clamp-3'}`}>
                  {bookData.description || 'The Japanese government has established the Tokyo Metropolitan Advanced Nurturing School, dedicated to instruct and foster the generation of people that will support the country in the future. The students are given a high degree of freedom in order to closely resemble real life.'}
                </p>
                <button onClick={toggleDescription} className="text-blue-500 hover:underline">
                  {showMore ? 'Show Less' : 'Show More'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}


      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Reading Statistics</h2>
        <div className="flex flex-col sm:flex-row justify-center mb-6">
          <div className="flex flex-col items-center bg-zinc-300 rounded-lg shadow-md m-4 p-6 w-full sm:w-60 h-40">
            <h3 className="text-lg font-semibold text-gray-800 mb-8">Total Views</h3>
            <p className="text-4xl font-bold text-amber-400">25</p>
          </div>
          <div className="flex flex-col items-center bg-zinc-300 rounded-lg shadow-md m-4 p-6 w-full sm:w-60 h-40">
            <h3 className="text-lg font-semibold text-gray-800 mb-8">Total Bookmarks</h3>
            <p className="text-4xl font-bold text-emerald-600">7</p>
          </div>
          <div className="flex flex-col items-center bg-zinc-300 rounded-lg shadow-md m-4 p-6 w-full sm:w-60 h-40">
            <h3 className="text-lg font-semibold text-gray-800 mb-8">Total Downloads</h3>
            <p className="text-4xl font-bold text-lime-500">15</p>
          </div>
        </div>

        <div className="flex justify-center items-center p-4 md:p-6">
          <Card className="bg-white w-full shadow-lg rounded-lg" >
            <h2 className="text-lg font-semibold mb-2 text-center">User Activity Trends</h2>
            <div className="h-64 md:h-96">
              <Line data={combinedData} options={lineoptions} />
            </div>
          </Card>
        </div>
      </div>


      <div className="justify-center items-center min-h-screen p-2">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">User Engagement</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Users</h2>
            <div className="flex flex-wrap justify-between items-center">
              {topUsers.map((user, index) => (
                <div key={index} className="bg-transparent p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <img className="w-16 h-16 rounded-full mx-auto mb-2" src={user.image} alt={`Headshot of ${user.username}`} width="64" height="64" />
                  <h3 className="text-lg font-semibold text-secondary">{user.username}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-6">
            <Card className="bg-white shadow-lg rounded-lg h-96">
              <h2 className="text-lg font-semibold mb-2 text-center">Books Read Per Month</h2>
              <div className="h-80">
                <Bar data={data} options={options} />
              </div>
            </Card>
            <Card className="bg-white shadow-lg rounded-lg h-96">
              <h2 className="text-lg font-semibold mb-2 text-center">User Interaction Trends</h2>
              <div className="h-80">
                <Pie data={userInteractionData} />
              </div>
            </Card>
          </div>
        </div>
      </div>

    </div>

  )
}

export default ViewBook