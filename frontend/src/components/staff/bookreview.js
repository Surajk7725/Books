import React from 'react';

const BookReview = () => {
  const reviewData = {
    userName: 'John Doe',
    bookName: 'The McKinsey Way',
    authorName: 'Ethan M. Rasiel',
    rating: 4.5,
    comments: 'A comprehensive guide to strategic consulting with practical insights and real-world examples.'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2>Book Review</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>User Name:</strong></td>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{reviewData.userName}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Book Name:</strong></td>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{reviewData.bookName}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Author Name:</strong></td>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{reviewData.authorName}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Rating:</strong></td>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{reviewData.rating} / 5</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Comments:</strong></td>
            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{reviewData.comments}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookReview;
