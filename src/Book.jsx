import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Book() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited

    const data = async () => {
        try {
            const chardata = await axios.get("https://66c66053134eb8f434977998.mockapi.io/users/guvi");
            setUsers(chardata.data);
        } catch (error) {
            alert("There is an error while collecting", error);
        }
    }

    useEffect(() => {
        data();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            date: "",
            details: ""
        },
        onSubmit: async (values) => {
            try {
                if (editingUserId) {
                    // If editing, send a PUT request to update the user
                    await axios.put(`https://66c66053134eb8f434977998.mockapi.io/users/guvi/${editingUserId}`, values);
                    setEditingUserId(null); // Reset editing mode
                } else {
                    // Otherwise, send a POST request to create a new user
                    await axios.post("https://66c66053134eb8f434977998.mockapi.io/users/guvi", values);
                }
                formik.resetForm(); // Clear the form after submission
                data(); // Refresh the user list
            } catch (error) {
                alert("Something went wrong", error);
            }
        }
    });

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://66c66053134eb8f434977998.mockapi.io/users/guvi/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        }
    };

    const editUser = (user) => {
        setEditingUserId(user.id); // Set the ID of the user being edited
        formik.setValues({
            name: user.name,
            date: user.date,
            details: user.details
        }); // Populate the form with the user's data
    };

    return (
        <div className='main-box'>
            <div className='box'>
                <form className='input' onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Author's Name:</label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter the Authors Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>Birth Date:</label>
                        <input
                            type='date'
                            name='date'
                            value={formik.values.date}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>Short Biography:</label>
                        <textarea
                            name='details'
                            placeholder='Enter the bio'
                            value={formik.values.details}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='text-center'>
                        <input type='submit' className='btn btn-primary' value={editingUserId ? "Update" : "Submit"} />
                        <input type='reset' className='btn btn-danger' onClick={() => setEditingUserId(null)} />
                    </div>
                </form>
            </div>
            <div className='box'>
                <table>
                    <thead>
                        <tr>
                            <th>Author Name</th>
                            <th>Date</th>
                            <th>Bio</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.date}</td>
                                <td>{user.details}</td>
                                <td>
                                    <button className='btn btn-primary mx-2' onClick={() => editUser(user)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='text-center'>
                <Link to="/" className='btn btn-warning'>Home</Link>
            </div>
        </div>
    )
}

export default Book;