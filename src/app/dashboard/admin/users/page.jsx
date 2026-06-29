// src/app/dashboard/admin/users/page.jsx
"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "@/services/userApi";
import Swal from "sweetalert2";
import { User, Mail, Shield } from "lucide-react";

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
      confirmButtonColor: "#14b8a6",
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
      <div className="p-8 flex justify-center items-center min-h-[70vh] bg-slate-950">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 text-center bg-slate-950 min-h-screen">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Manage Users</h1>
        <p className="text-slate-400 mt-2 text-lg">View and manage all platform users</p>
      </div>

      <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/80">
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
                  <tr 
                    key={user._id} 
                    className="border-b border-slate-700 hover:bg-slate-800/50 transition"
                  >
                    <td className="p-6">
                      <img 
                        src={user.image || "https://i.pravatar.cc/150?img=12"} 
                        alt={user.name} 
                        className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-700" 
                      />
                    </td>
                    <td className="p-6">
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-slate-400">Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                    </td>
                    <td className="p-6 text-slate-300">{user.email}</td>
                    <td className="p-6">
                      <span className={`px-5 py-2 rounded-2xl text-sm font-medium capitalize
                        ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 
                          user.role === 'owner' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                        {user.role || "tenant"}
                      </span>
                    </td>
                    <td className="p-6">
                      <select 
                        value={user.role || "tenant"} 
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-slate-800 border border-slate-600 text-white px-5 py-3 rounded-2xl focus:outline-none focus:border-teal-500 transition cursor-pointer"
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
                    No users found
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