import React from 'react';
import { Card } from 'antd';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

const notifications = [
    {
      message: "New Issue from John Doe.",
      date: "12 May, 2025",
      time: "10:30 AM",
      link: "/admin/contact-resolve"
    },
    {
      message: "New Issue from Jane Smith.",
      date: "24 Feb, 2025",
      time: "02:45 PM",
      link: "/admin/contact-resolve"
    },
    {
      message: "New Issue from Robert Johnson.",
      date: "04 Jan, 2025",
      time: "11:00 AM",
      link: "/admin/contact-resolve"
    }
  ];

const NotificationCard = () => {

    const navigate = useNavigate();

    const handleNotificationClick = (link) => {
      navigate(link);
    };

  return (
    <div className="p-4 flex justify-center">
      <Card
        title="Notification"
        className="shadow-sm w-80"
        bordered={false}
        bodyStyle={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex flex-col mb-4 cursor-pointer"
            onClick={() => handleNotificationClick(notification.link)}
          >
            <span className="font-medium mb-2">{notification.message}</span>
            <div className="flex justify-between text-gray-500">
              <span>{notification.date}</span>
              <span>{notification.time}</span>
            </div>
            {index < notifications.length - 1 && <hr className="my-4"/>}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default NotificationCard;
