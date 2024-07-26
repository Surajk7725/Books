// import React, { useState } from 'react';
// import { Input, Button, Card } from 'antd';

// const SecurityPage = () => {
//   const [formData, setFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCancel = () => {
//     setFormData({
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: ''
//     });
//   };

//   return (
//     <div className="justify-start ml-24 items-center min-h-screen bg-gray-100 mt-12"> {/* Reduced mb-72 to mb-10 to move the card up */}
//       <Card className="w-full max-w-3xl p-6"> {/* Changed max-w-lg to max-w-3xl to expand the width */}
//         <h2 className="text-2xl font-bold mb-6">Security</h2>
//         <div className="mb-4">
//           <Input.Password
//             name="currentPassword"
//             value={formData.currentPassword}
//             onChange={handleChange}
//             placeholder="Current Password"
//             size="large"
//             className="w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <Input.Password
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleChange}
//             placeholder="New Password"
//             size="large"
//             className="w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <Input.Password
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm Password"
//             size="large"
//             className="w-full"
//           />
//         </div>
//         <div className="flex justify-end space-x-2 mt-16">
//           <Button onClick={handleCancel}>Cancel</Button>
//           <Button type="primary">Save</Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default SecurityPage;

import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';

const SecurityPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const getPasswordStrength = (password) => {
    const criteria = [
      /[A-Z]/.test(password), // Capital letter
      /[a-z]/.test(password), // Small letter
      /\d/.test(password), // Number
      /[!@#$%^&*(),.?":{}|<>]/.test(password), // Special character
      password.length >= 8 // Minimum length
    ];

    const fulfilledCriteria = criteria.filter(Boolean).length;

    if (fulfilledCriteria <= 2) {
      return 'weak';
    } else if (fulfilledCriteria === 3 || fulfilledCriteria === 4) {
      return 'medium';
    } else {
      return 'strong';
    }
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const getPasswordBorderColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'border-red-500';
      case 'medium':
        return 'border-orange-500';
      case 'strong':
        return 'border-green-500';
      default:
        return '';
    }
  };

  return (
    <div className="justify-center ml-32 items-center min-h-screen bg-gray-100 mb-2">
      <Card className="w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold mb-6">Security</h2>
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium">Current Password</label>
          <Input.Password
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            size="large"
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium">New Password</label>
          <Input.Password
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            size="large"
            className={`w-full ${getPasswordBorderColor()}`}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium">Confirm Password</label>
          <Input.Password
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            size="large"
            className="w-full"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-16">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary">Save</Button>
        </div>
      </Card>
    </div>
  );
};

export default SecurityPage;


