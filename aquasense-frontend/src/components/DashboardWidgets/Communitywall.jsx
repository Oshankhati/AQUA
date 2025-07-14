import React, { useState, useEffect } from 'react';
import axios from 'axios';

const currentUser = JSON.parse(localStorage.getItem('user'));

export default function Communitywall() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
        const res = await axios.get(`http://localhost:5000/api/posts?page=${page}&limit=5`);
        setPosts(prev => {
          const newPosts = res.data.posts.filter(
            newPost => !prev.some(existing => existing._id === newPost._id)
          );
          return [...prev, ...newPosts];
        });

        const totalLoaded = page * 5;
        setHasMore(totalLoaded < res.data.totalCount);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!message.trim() && !image) return;

    const formData = new FormData();
    formData.append('caption', message);
    if (image) formData.append('image', image);
    formData.append('userId', currentUser?.id);

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => {
          const withoutDuplicate = prev.filter((p) => p._id !== data._id);
          return [data, ...withoutDuplicate];
        });
        setMessage('');
        setImage(null);
        setPreviewUrl(null);
        setPage(1);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Post error:', err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {
        userId: currentUser?.id,
      });
      setPosts(posts.map((p) => (p._id === postId ? res.data : p)));
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();
    const commentText = e.target.elements[`comment-${postId}`].value.trim();
    if (!commentText) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, {
        text: commentText,
        userId: currentUser?.id,
      });
      setPosts(posts.map((p) => (p._id === postId ? res.data : p)));
      e.target.reset();
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/posts/${postId}/comment/${commentId}`);
      setPosts(posts.map((p) => (p._id === postId ? res.data : p)));
    } catch (err) {
      console.error('Delete comment error:', err);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 p-6 rounded-lg shadow-xl max-w-3xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">📸 Community Wall</h2>

      <form onSubmit={handlePost} className="space-y-4 mb-8 bg-white p-5 rounded-lg shadow">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block text-sm text-gray-600"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full max-h-80 object-contain mt-2 rounded-lg border border-gray-300 shadow-sm"
          />
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
        >
          Post
        </button>
      </form>

      <div className="space-y-8">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-md transition hover:shadow-lg">
              {post.imageUrl && (
                <img
                  src={`http://localhost:5000${post.imageUrl}`}
                  alt="User Post"
                  className="mb-4 rounded-md w-full max-h-96 object-cover"
                />
              )}

              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>Posted by: <span className="font-semibold text-indigo-600">{post.author?.name || 'Anonymous'}</span></span>
                {post.author?._id === currentUser?.id && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-red-500 text-xs hover:underline ml-2"
                    title="Delete Post"
                  >
                    🗑 Delete
                  </button>
                )}
              </div>

              {post.caption && (
                <p className="text-gray-800 mb-3 text-sm">{post.caption}</p>
              )}

              <button
                onClick={() => handleLike(post._id)}
                className="text-sm text-indigo-600 hover:underline mb-3"
              >
                👍 {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
              </button>

              {post.comments.length > 0 && (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  {post.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-indigo-50 px-3 py-2 rounded flex justify-between items-start"
                    >
                      <span>
                        <span className="font-medium text-indigo-700">{comment.user?.name || 'Anonymous'}:</span>{' '}
                        {comment.text}
                      </span>
                      {comment.user?._id === currentUser?.id && (
                        <button
                          onClick={() => handleDeleteComment(post._id, comment._id)}
                          className="text-red-500 text-xs hover:underline ml-2"
                          title="Delete Comment"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => handleComment(e, post._id)}
                className="mt-4 flex items-center gap-2"
              >
                <input
                  name={`comment-${post._id}`}
                  placeholder="Add a comment..."
                  className="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  type="submit"
                  className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition"
                >
                  Comment
                </button>
              </form>
            </div>
          ))
        )}
        {loading && hasMore && (
          <p className="text-center text-gray-400 text-sm mt-4">Loading more posts...</p>
        )}
      </div>
    </section>
  );
}
