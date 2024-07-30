import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Card} from 'antd';
import { Line, Bar, Pie } from 'react-chartjs-2';
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

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Books Added',
      data: [10, 20, 30, 40, 50, 60],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderWidth: 1,
    },
    {
      label: 'Books Edited',
      data: [5, 15, 25, 35, 45, 55],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderWidth: 1,
    },
    {
      label: 'Books Deleted',
      data: [2, 10, 20, 30, 40, 50],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderWidth: 1,
    },
  ],
};

const barOptions = {
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

const reviewData = {
  labels: ['Accepted', 'Pending', 'Rejected'],
  datasets: [
    {
      label: 'Reviews',
      data: [30, 20, 10],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
    },
  ],
};

const sentimentData = {
  labels: ['Positive', 'Neutral', 'Negative'],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
    },
  ],
};

function ViewStaff() {
  return (
    <div className="justify-center items-center min-h-screen mb-2 ml-10">

      <div className="text-start -mt-2 mb-2">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Staff Analysis</h1>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/admin/home">Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/staff-display">Staff Display</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Staff Analysis</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="justify-center items-center min-h-screen p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-[0.5cm]">
        <Card className="bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">User Activity Trends</h2>
          <div style={{ height: '400px' }}>
             <Line data={data} options={barOptions} />
          </div>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">Books Statistics</h2>
          <div style={{ height: '400px' }}>
             <Bar data={barData} options={barOptions} />
          </div>
        </Card>
      </div>
    </div>

    <div className="justify-center items-center min-h-screen p-2 -mt-[2cm]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">Review Analysis</h2>
          <div style={{ height: '400px' }}>
            <Bar data={reviewData} options={barOptions} />
          </div>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">Sentiment Analysis</h2>
          <div style={{ height: '400px' }}>
            <Pie data={sentimentData} />
          </div>
        </Card>
      </div>
    </div>

    </div>

  )
}

export default ViewStaff