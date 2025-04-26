import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Please login to view profile');
          return;
        }

        const response = await axios.get(`http://localhost:3001/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUser(response.data.data);
          setEditUsername(response.data.data.username);
          setEditBio(response.data.data.bio || '');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setIsChanged(
        editUsername !== user.username || editBio !== (user.bio || '')
      );
    }
  }, [editUsername, editBio, user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditUsername(user.username);
    setEditBio(user.bio || '');
    setEditMode(false);
  };

  const handleSubmit = async () => {
    if (!isChanged) return;
    setSubmitting(true);
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3001/users/${userId}`,
        {
          username: editUsername,
          bio: editBio
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        setUser({
          ...user,
          username: editUsername,
          bio: editBio
        });
        setEditMode(false);
        setIsChanged(false);
      } else {
        setError(response.data.message || 'Update failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-4 bg-red-100 text-red-700 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-4 bg-yellow-100 text-yellow-700 rounded-lg text-center">
        User not found
      </div>
    );
  }
  

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 relative">
        {/* Edit Button */}
        {!editMode && (
          <button
            className="absolute top-4 right-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
          />
          <div className="text-center md:text-left w-full">
            {editMode ? (
              <input
                type="text"
                className="text-3xl font-bold text-gray-800 mb-2 border-b-2 border-blue-300 focus:outline-none w-full"
                value={editUsername}
                onChange={e => setEditUsername(e.target.value)}
                maxLength={50}
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user.username}
                {user.isAdmin && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                    Admin
                  </span>
                )}
              </h1>
            )}
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
          {editMode ? (
            <textarea
              className="text-gray-600 border-b-2 border-blue-300 focus:outline-none w-full mb-6"
              rows={3}
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
              maxLength={500}
            />
          ) : (
            <p className="text-gray-600 whitespace-pre-wrap mb-6">
              {user.bio || 'No bio provided'}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div>
              <span className="font-medium">Account Created:</span>{' '}
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">User ID:</span> {user.id}
            </div>
          </div>

          {/* Edit Controls */}
          {editMode && (
            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={handleCancel}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded ${!isChanged || submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                onClick={handleSubmit}
                disabled={!isChanged || submitting}
              >
                {submitting ? 'Saving...' : 'Submit'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Loader CSS (add to your global CSS)
/*
.loader {
  border-top-color: #3B82F6;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

export default ProfilePage;
