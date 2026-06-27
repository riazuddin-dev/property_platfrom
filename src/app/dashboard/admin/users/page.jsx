"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "@/services/userApi";
import Swal from "sweetalert2";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    if (newRole === "admin") {
      Swal.fire("Error", "Cannot assign Admin role", "error");
      return;
    }

    const result = await Swal.fire({
      title: `Change to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await updateUserRole(id, newRole);
        setUsers(users.map(user => 
          user._id === id ? { ...user, role: newRole } : user
        ));
        Swal.fire("Success!", `User role changed to ${newRole}`, "success");
      } catch (error) {
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

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Manage Users</h1>

      <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="text-left p-6 w-12"></th>
                <th className="text-left p-6">User Info</th>
                <th className="text-left p-6">Email</th>
                <th className="text-left p-6">Role</th>
                <th className="text-center p-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                  <td className="p-6">
                    <img 
                      src={user.image || "https://i.pravatar.cc/150"} 
                      alt={user.name} 
                      className="w-12 h-12 rounded-2xl object-cover" 
                    />
                  </td>
                  <td className="p-6">
                    <p className="font-semibold text-lg">{user.name}</p>
                  </td>
                  <td className="p-6 text-slate-300 break-all">{user.email}</td>
                  <td className="p-6">
                    <span className="capitalize px-6 py-2 bg-slate-800 rounded-full text-sm font-medium">
                      {user.role || "tenant"}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => handleRoleChange(user._id, "owner")}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-sm font-medium"
                      >
                        Make Owner
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "tenant")}
                        className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl text-sm font-medium"
                      >
                        Make Tenant
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="p-20 text-center text-slate-400 text-lg">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}