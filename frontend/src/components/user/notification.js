import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/notifications/notify');

                // Filter notifications for users
                const userNotifications = response.data.filter(notification => 
                    notification.message.startsWith('New Book Added')
                );

                setNotifications(userNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error.message);
            }
        };

        fetchNotifications();
    }, []);

    const handleNotificationClick = (link) => {
        if (link.startsWith('http')) {
            window.location.href = link;
        } else {
            navigate(link);
        }
    };

    return (
        <div className="p-4 flex justify-center">
            <Card
                title="User Notifications"
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

export default Notifications;
