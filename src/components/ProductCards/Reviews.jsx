import React from 'react'

const Reviews = ({ comments }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.comment_id} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">{comment.user_name}</h3>
              <span className="text-yellow-500">Rating: {comment.rating} / 5</span>
            </div>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews