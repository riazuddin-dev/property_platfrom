"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "@/services/userApi";
import Swal from "sweetalert2";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setError(null);
        const data = await getAllUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load users:", error);
        setError("Failed to load users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    if (newRole === "admin") {
      Swal.fire("Error", "Cannot assign Admin role from here", "error");
      return;
    }

    const result = await Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Change",
    });

    if (result.isConfirmed) {
      try {
        await updateUserRole(id, newRole);
        setUsers(users.map(user => 
          user._id === id ? { ...user, role: newRole } : user
        ));
        Swal.fire("Success!", `User role changed to ${newRole}`, "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to update role", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-2">Manage Users</h1>
      <p className="text-slate-400 mb-8">View and manage all platform users</p>

      <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/70">
                <th className="text-left p-6 w-12"></th>
                <th className="text-left p-6">User Info</th>
                <th className="text-left p-6">Email</th>
                <th className="text-left p-6">Role</th>
                <th className="text-center p-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-6">
                      <img 
                        src={user.image || "https://i.pravatar.cc/150?img=12"} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                    </td>
                    <td className="p-6">
                      <p className="font-medium text-white">{user.name}</p>
                    </td>
                    <td className="p-6 text-slate-300">{user.email}</td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize
                        ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 
                          user.role === 'owner' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {user.role || "tenant"}
                      </span>
                    </td>
                    <td className="p-6">
                      <select 
                        value={user.role || "tenant"} 
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="select select-bordered select-sm bg-slate-800 border-slate-700 text-white"
                        disabled={user.role === "admin"}
                      >
                        <option value="tenant">Tenant</option>
                        <option value="owner">Owner</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center text-slate-400">
                    No users found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}