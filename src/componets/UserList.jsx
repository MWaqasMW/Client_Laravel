// import React, { useState, useEffect } from 'react';

// const UserList = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUsers();


//         window.Echo.channel('new-customer-channel').listen('NewCustomerEvent', event => {
//             console.log("event------", event)
//             setUsers(prevUsers => [...prevUsers, event.customer]);
//         });

//         // return () => {
//         //     window.Echo.disconnect();
//         // };
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/api/customers');
//             if (response.ok) {
//                 const data = await response.json();
//                 setUsers(data);
//             } else {
//                 console.error('Failed to fetch users');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>User List</h2>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         <strong>{user.username}</strong> - {user.email} - {user.number}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserList;





// import React, { useState, useEffect } from 'react';

// const UserList = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUsers();

//         const echo = window.Echo;

//         // Listen for new customer events
//         echo.channel('new-customer-channel').listen('NewCustomerEvent', event => {
//             console.log("New customer event:", event)
//             setUsers(prevUsers => [...prevUsers, event.customer]);
//         });

//         // Listen for delete customer events
//         echo.channel('delete-customer-channel').listen('DeleteCustomerEvent', event => {
//             console.log("Delete customer event:", event)
//             // Remove the deleted customer from the list
//             setUsers(prevUsers => prevUsers.filter(user => user.id !== event.customerId));
//         });

//         // return () => {
//         //     echo.leaveChannel('new-customer-channel');
//         //     echo.leaveChannel('delete-customer-channel');
//         // };
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/api/customers');
//             if (response.ok) {
//                 const data = await response.json();
//                 setUsers(data);
//             } else {
//                 console.error('Failed to fetch users');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     // Function to handle customer deletion
//     const handleDelete = async (customerId) => {
//         try {
//             // Make API request to delete the customer
//             const response = await fetch(`http://localhost:8000/api/customers/${customerId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.ok) {
//                 // Trigger the DeleteCustomerEvent
//                 window.Echo.channel('delete-customer-channel').whisper('DeleteCustomerEvent', { customerId });
//             } else {
//                 console.error('Failed to delete customer');
//             }
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>User List</h2>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         <strong>{user.username}</strong> - {user.email} - {user.number}
//                         <button onClick={() => handleDelete(user.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserList;


import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {



        window.Echo.channel('new-customer-channel').listen('NewCustomerEvent', event => {
            console.log("New customer event:", event);

            const userExists = users.some(user => user.id === event.customer.id);

            if (!userExists) {
                setUsers(prevUsers => [...prevUsers, event.customer]);
            }
        });

        window.Echo.channel('delete-customer-channel').listen('DeletCustomer', event => {
            console.log("Delete customer event:", event)
            setUsers(prevUsers => prevUsers.filter(user => user.id !== event.customerId));
        });

        return () => {
            window.Echo.leaveChannel('new-customer-channel');
            window.Echo.leaveChannel('delete-customer-channel');
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
        fetchUsers()
    }, [])

    // Function to handle customer deletion
    const handleDelete = async (customerId) => {
        try {
            // Make API request to delete the customer
            const response = await fetch(`http://localhost:8000/api/customers/${customerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Trigger the DeleteCustomerEvent
                window.Echo.channel('delete-customer-channel').listen('DeleteCustomerEvent', { customerId });
            } else {
                console.error('Failed to delete customer');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>{user.username}</strong> - {user.email} - {user.number}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;





