import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/apiconnector';
import { endpoints } from '../services/apis';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // State to store users

  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      if (!token || user?.accountType !== 'Admin') {
        navigate('/dashboard/my-profile'); // Redirect if not admin or not logged in
        return;
      }
      try {
        // Fetch dashboard message
        const dashboardResponse = await apiConnector(
          'GET',
          endpoints.ADMIN_DASHBOARD_API,
          null,
          { Authorization: `Bearer ${token}` }
        );
        setMessage(dashboardResponse.data.message);

        // Fetch all users
        const usersResponse = await apiConnector(
          'GET',
          endpoints.GET_ALL_USERS_API, // This endpoint needs to be defined in apis.js
          null,
          { Authorization: `Bearer ${token}` }
        );
        setUsers(usersResponse.data.data); // Assuming users are in response.data.data
      } catch (error) {
        console.error('Error fetching admin dashboard data or users:', error);
        setMessage('Failed to load admin dashboard data or users.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboardData();
  }, [token, user, navigate]);

  if (loading) {
    return <div className="spinner">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="text-richblack-5 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">{message}</p>

      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-richblack-800 rounded-lg shadow-md">
            <thead>
              <tr className="bg-richblack-700 text-richblack-25">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Account Type</th>
                <th className="py-3 px-4 text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userItem) => (
                <tr key={userItem._id} className="border-b border-richblack-700 last:border-b-0">
                  <td className="py-3 px-4">{userItem.firstName} {userItem.lastName}</td>
                  <td className="py-3 px-4">{userItem.email}</td>
                  <td className="py-3 px-4">{userItem.accountType}</td>
                  <td className="py-3 px-4">{userItem.contactNumber || userItem.additionalDetails?.contactNumber || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default AdminDashboard;