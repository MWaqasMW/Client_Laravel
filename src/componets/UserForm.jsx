import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        number: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/customers', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Resource created:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                Number:
                <input type="text" name="number" value={formData.number} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
