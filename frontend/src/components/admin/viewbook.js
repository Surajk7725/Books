import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Card} from 'antd';
import { Line, Pie, Bar } from 'react-chartjs-2';
import Book4 from '../images/book-4.jpg';
import {Chart as ChartJS,RadarController, RadialLinearScale,LineElement,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend} from 'chart.js';

ChartJS.register(RadarController, RadialLinearScale,LineElement,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend);

function ViewBook() {
const [showMore, setShowMore] = useState(false);

//Show More Logic
const toggleDescription = () => {
    setShowMore(!showMore);
};

const viewsData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Views',
      data: [65, 59, 80, 81, 56],
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

const bookmarksData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Bookmarks',
      data: [12, 19, 3, 5, 2],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const downloadsData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Downloads',
      data: [5, 2, 3, 1, 2],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
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
          label: function(context) {
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
    maintainAspectRatio: false, // Ensures chart adjusts to container size
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
    <div className="justify-center items-center min-h-screen mb-2 ml-10">

      <div className="text-start -mt-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Book Analysis</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/books">Display Books</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Book Analysis</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h1 className="text-2xl font-bold mb-6">Book Overview</h1>
      <div className="flex">
        <div className="flex-shrink-0 w-32 h-48 mr-6">
          <img
            src ={Book4}
            alt="Book Cover"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <p className="text-lg mb-4 ml-4"><strong>Title:</strong> Classroom of the Elite</p>
          <p className="text-lg mb-4 ml-4"><strong>Author:</strong> Shōgo Kinugasa</p>
          <p className="text-lg mb-4 ml-4"><strong>Genre:</strong> School, Dark Psychology</p>
          <p className="text-lg ml-4">
            <strong>Description:</strong>
            <p className={`mt-2 ${showMore ? '' : 'line-clamp-3'}`}>
            The Japanese government has established the Tokyo Metropolitan Advanced Nurturing School, dedicated to instruct and foster the generation of people that will support the country in the future. The students are given a high degree of freedom in order to closely mimic real life. 
            The story follows the perspective of Kiyotaka Ayanokōji, a quiet and modest boy, who is bad at making friends and would rather keep his distance, but possesses unrivaled intelligence and incredible physical ability. He is a student of Class-D, which is where the school dumps its inferior students, widely considered "defective". 
            After meeting Suzune Horikita and Kikyō Kushida, two other students in his class, the situation begins to change, and he gets involved in many affairs and his thought of an ideal normal high school life begins to get scattered, taking a toll on his sanity.
              </p>
              <button onClick={() => setShowMore(!showMore)} className="text-blue-500 mt-2">
                {showMore ? 'Show less' : 'Read more'}
              </button>
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Reading Statistics</h2>
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center bg-zinc-300 rounded-lg shadow-md m-4 p-6 w-60 h-40">
          <h3 className="text-lg font-semibold text-gray-800 mb-8">Total Views</h3>
          <p className="text-4xl font-bold text-amber-400">25</p>
        </div>
        <div className="flex flex-col items-center bg-zinc-300 rounded-lg shadow-md m-4 p-6 w-60 h-40">
          <h3 className="text-lg font-semibold text-gray-800 mb-8">Total Bookmarks</h3>
          <p className="text-4xl font-bold text-emerald-600">7</p>
        </div>
        <div className="flex flex-col items-center bg-zinc-300 rounded-lg shadow-md m-4 p-6 w-60 h-40">
          <h3 className="text-lg font-semibold text-gray-800 mb-8">Total Downloads</h3>
          <p className="text-4xl font-bold text-lime-500">15</p>
        </div>
      </div>

      <div className="justify-center items-center min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Views Over Time</h3>
          <div className="relative h-64">
            <Line data={viewsData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Bookmarks Over Time</h3>
          <div className="relative h-64">
            <Line data={bookmarksData} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-2/3">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Downloads Over Time</h3>
          <div className="relative h-64">
            <Line data={downloadsData} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="justify-center items-center min-h-screen p-2">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">User Engagement</h2>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Users</h2>
          <div className="flex justify-between items-center">
            {topUsers.map((user, index) => (
              <div key={index} className="bg-transparent p-4 rounded-lg text-center transition-all duration-300 hover:scale-105">
                <img className="w-16 h-16 rounded-full mx-auto mb-2" src={user.image} alt={`Headshot of ${user.username}`} width="64" height="64" />
                <h3 className="text-lg font-semibold text-secondary">{user.username}</h3>
              </div>
            ))}
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-[2cm]">
        <Card className="bg-white shadow-lg rounded-lg" style={{ height: '500px' }}>
          <h2 className="text-lg font-semibold mb-2 text-center">Books Added Per Month</h2>
          <div style={{ height: '400px' }}>
              <Bar data={data} options={options} />
          </div>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">User Interaction Trends</h2>
          <div style={{ height: '400px' }}>
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