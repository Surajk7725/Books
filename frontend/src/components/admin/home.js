import React, {useState,useEffect} from 'react';
import { Card,Table, Progress, Button } from 'antd';
import { UserOutlined, TeamOutlined, ReadOutlined, CrownOutlined } from '@ant-design/icons';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Book1 from '../images/book-1.jpg';
import Book2 from '../images/book-2.jpg';
import Book3 from '../images/book-3.jpg';
import Book4 from '../images/book-4.jpg';
import axiosInstance from '../axiosInstance';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const sampleBooks = [
  {
    key: '1',
    srNo: 1,
    title: 'Man’s Search for Meaning',
    author: 'William J. Winslade',
    genre: 'Psychology',
    addedDate: '2024-07-25',
    coverImage: Book1,
  },
  {
    key: '2',
    srNo: 2,
    title: 'Thinking Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Human Psychology',
    addedDate: '2024-07-20',
    coverImage: Book2,
  },
  {
    key: '3',
    srNo: 3,
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    genre: 'Biography',
    addedDate: '2024-07-22',
    coverImage: Book3,
  },
  {
    key: '4',
    srNo: 4,
    title: 'Classroom of the Elite: Year 2',
    author: 'Syougo Kinugasa',
    genre: 'Dark Psychology',
    addedDate: '2024-07-23',
    coverImage: Book4,
  },
];

// Function to format date
const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const book = [
  {
    title: 'Man’s Search for Meaning',
    author: 'By William J. Winslade',
    image: Book1, 
    progress: 49,
  },
  {
    title: 'Thinking Fast and Slow',
    author: 'By  Daniel Kahneman',
    image: Book2,
    progress: 77,
  },
  {
    title: 'The Diary of a Young Girl',
    author: 'By  Anne Frank',
    image: Book3, 
    progress: 82,
  },
  {
    title: 'Classroom of the Elite: Year 2',
    author: 'By  Syougo Kinugasa',
    image: Book4, 
    progress: 100,
  },
];

function getProgressColor(progress) {
  if (progress <= 50) return 'red';
  if (progress <= 90) return 'orange';
  return 'green';
}

// Sample data for Bar Chart
const barData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Books Added',
      data: [12, 19, 3, 5, 2, 3, 15, 8, 4, 10, 9, 6],
      backgroundColor: [
        '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966FF', // Purple
          '#FF9F40', // Orange
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966FF', // Purple
          '#FF9F40', // Orange
      ],
      borderColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
      ],
      borderWidth: 1,
    },
  ],
};

// Sample data for Pie Chart
const pieData = {
  labels: ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy', 'Biography'],
  datasets: [
    {
      data: [30, 15, 10, 20, 15, 10],
      backgroundColor: [
        '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966FF', // Purple
          '#FF9F40', // Orange
      ],
      borderColor: [
        '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
      ],
      borderWidth: 1,
    },
  ],
};

// Options for Bar Chart
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
  height: 400, // Increase height here
};

// Options for Pie Chart
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
  radius: '85%', // Adjust radius here
};

function AdminHome() {

  const [books, setBooks] = useState(sampleBooks);
  const [countsData, setCountsData] = useState([]);

  useEffect(() => {
    const fetchCountsData = async () => {
      try {
        const response = await axiosInstance.get('/admin/counts');
        const { totalUsers, totalStaffs, totalBooks, totalAdmins } = response.data;

        setCountsData([
          {
            title: 'Total Users',
            value: totalUsers,
            icon: <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
            change: '95%',
            changeType: 'up',
          },
          {
            title: 'Total Staffs',
            value: totalStaffs,
            icon: <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
            change: '37%',
            changeType: 'up',
          },
          {
            title: 'Total Books',
            value: totalBooks,
            icon: <ReadOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
            change: '77%',
            changeType: 'up',
          },
          {
            title: 'Total Admins',
            value: totalAdmins,
            icon: <CrownOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
            change: '7%',
            changeType: 'up',
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch counts data:', error);
      }
    };

    fetchCountsData();
  }, []);

  // Columns configuration for Ant Design Table
  const columns = [
    {
      title: 'Sr.No',
      dataIndex: 'srNo',
      key: 'srNo',
      sorter: (a, b) => a.srNo - b.srNo,
    },
    {
      title: 'Cover',
      dataIndex: 'coverImage',
      key: 'coverImage',
      render: (text) => <img src={text} alt="Book Cover" className="w-16 h-24 object-cover rounded" />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      sorter: (a, b) => a.genre.localeCompare(b.genre),
    },
    {
      title: 'Added Date',
      dataIndex: 'addedDate',
      key: 'addedDate',
      render: (text) => formatDate(text),
      sorter: (a, b) => new Date(a.addedDate) - new Date(b.addedDate),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleViewBook(record.key)}>
          View Book
        </Button>
      ),
    },
  ];

   // Function to handle "View Book" button click
   const handleViewBook = (key) => {
    console.log('Viewing book with key:', key);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mb-2 px-4 overflow-x-hidden">
  <div className="container mx-auto">
    <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 mb-8">
      {countsData.map((item,index) => (
        <Card key={index} className="w-full md:w-1/3 bg-white shadow-lg p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="bg-gray-100 rounded-full p-3 w-fit">
                {item.icon}
              </div>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-500">{item.title}</p>
              <p className={`text-sm ${item.changeType === 'up' ? 'text-green-500' : item.changeType === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                {item.change} {item.changeType === 'up' ? '▲' : item.changeType === 'down' ? '▼' : ''}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>

    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">Book Analysis</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">Books Added Per Month</h2>
          <div className="h-64 md:h-96">
            <Bar data={barData} options={barOptions} />
          </div>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">Books by Genre</h2>
          <div className="h-64 md:h-96">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </Card>
      </div>
    </div>

    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Recently Added Books</h1>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={books}
          pagination={{ pageSize: 5 }}
          className="rounded-lg shadow-md w-full"
        />
      </div>
    </div>


    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg mt-8 md:mt-12">
      <h2 className="text-2xl font-semibold mb-6">My Library</h2>
      <div className="flex flex-wrap justify-center md:justify-between -mx-4">
        {book.map((bookk, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-4">
            <div className="bg-transparent rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img src={bookk.image} alt={bookk.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-xl mb-2 font-bold">{bookk.title}</h3>
                <p className="text-sm text-gray-500 truncate">{bookk.author}</p>
                <div className="mt-2">
                  <Progress percent={bookk.progress} status="active" strokeColor={getProgressColor(bookk.progress)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</div>
  );
}

export default AdminHome;
