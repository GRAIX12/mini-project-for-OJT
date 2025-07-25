"use client";

import { useState } from 'react';
import AddUserForm from './components/AddUserForm';
import UserTable from './components/UserTable';
import EditUserModal from './components/EditUserModal';
import { User } from '../app/types/User';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {id: 1, name: 'Crisostomo Ibarra', email: 'crisostomo@example.com'},
    {id: 2, name: 'Maria Clara', email: 'maria@example.com'},
    {id: 3, name: 'Juan Dela Cruz', email: 'juan@example.com'},
    {id: 4, name: 'Ana Punzalan', email: 'ana@example.com'}
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userToAdd = {
      ...newUser,
      id: nextId
    };
    setUsers([...users, userToAdd]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    // Filter out the deleted user
    const updatedUsers = users.filter(user => user.id !== id);
    
    // Renumber the remaining users sequentially
    const renumberedUsers = updatedUsers.map((user, index) => ({
      ...user,
      id: index + 1
    }));
    
    setUsers(renumberedUsers);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      
      <AddUserForm onAdd={handleAddUser} />
      
      <UserTable 
        users={users} 
        onEdit={setEditingUser}
        onRemove={handleDeleteUser}
      />
      
      {editingUser && (
        <EditUserModal 
          user={editingUser}
          onUpdate={handleUpdateUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}