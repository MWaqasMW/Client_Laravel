import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState({});

    useEffect(() => {
        window.Echo.channel('new-customer-channel').listen('NewCustomerEvent', event => {
            console.log("New customer event:", event);

            const userExists = users.some(user => user.id === event.customer.id);
            if (!userExists) {
                setUsers(prevUsers => [...prevUsers, event.customer]);
            }
        });

        // Listen for delete customer events
        window.Echo.channel('delete-customer-channel').listen('DeletCustomer', event => {
            console.log("Delete customer event:", event);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== event.customerId));
        });

        // Listen for update customer events
        window.Echo.channel('update-customer-channel').listen('UpdateCustomerEvent', event => {
            console.log("Update customer event:", event);

            // Update the user in the state
            setUsers(prevUsers => {
                const updatedUsers = prevUsers.map(user => {
                    if (user.id === event.customer.id) {
                        return event.customer;
                    }
                    return user;
                });
                return updatedUsers;
            });
        });

        return () => {
            // Leave channels when the component is unmounted
            window.Echo.leaveChannel('new-customer-channel');
            window.Echo.leaveChannel('delete-customer-channel');
            window.Echo.leaveChannel('update-customer-channel');
        };
    }, [users]);
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/customers');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/customers/${customerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.Echo.channel('delete-customer-channel').listen('DeleteCustomerEvent', { customerId });
            } else {
                console.error('Failed to delete customer');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleEdit = (userId, userData) => {
        setEditingUserId(userId);
        setUpdatedUserData(userData);
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
        setUpdatedUserData({});
    };

    const handleUpdate = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/customers/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });

            if (response.ok) {
                window.Echo.channel('update-customer-channel').listen('UpdateCustomerEvent', { customer: response.data });
                setEditingUserId(null);
                setUpdatedUserData({});
            } else {
                console.error('Failed to update customer');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {editingUserId === user.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={updatedUserData.username || ''}
                                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, username: e.target.value })}
                                />
                                <input
                                    type="email"
                                    value={updatedUserData.email || ''}
                                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={updatedUserData.number || ''}
                                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, number: e.target.value })}
                                />
                                <button onClick={() => handleUpdate(user.id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <strong>{user.username}</strong> - {user.email} - {user.number}
                                <button onClick={() => handleEdit(user.id, { username: user.username, email: user.email, number: user.number })}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
