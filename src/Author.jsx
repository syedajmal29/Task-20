import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Author() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited

    const data = async () => {
        try {
            const chardata = await axios.get("https://66c66053134eb8f434977998.mockapi.io/users/users");
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
            title: "",
            author: "",
            isbn: "",
            date: ""
        },
        onSubmit: async (values) => {
            try {
                if (editingUserId) {
                    // If editing, send a PUT request to update the user
                    await axios.put(`https://66c66053134eb8f434977998.mockapi.io/users/users/${editingUserId}`, values);
                    setEditingUserId(null); // Reset editing mode
                } else {
                    // Otherwise, send a POST request to create a new user
                    await axios.post("https://66c66053134eb8f434977998.mockapi.io/users/users", values);
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
            await axios.delete(`https://66c66053134eb8f434977998.mockapi.io/users/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        }
    };

    const editUser = (user) => {
        setEditingUserId(user.id); // Set the ID of the user being edited
        formik.setValues({
            title: user.title,
            author: user.author,
            isbn: user.isbn,
            date: user.date
        }); // Populate the form with the user's data
    };

    return (
        <div className="row">
        <div className='main-box'>
         
          <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className='box'>
            
                <form className='input' onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type='text'
                            name='title'
                            placeholder='Enter the Title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>Author:</label>
                        <input
                            type='text'
                            name='author'
                            placeholder='Enter the Author'
                            value={formik.values.author}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>ISBN NUMBER:</label>
                        <input
                            type='number'
                            name='isbn'
                            placeholder='Enter the ISBN'
                            value={formik.values.isbn}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>Publication Date:</label>
                        <input
                            type='date'
                            name='date'
                            placeholder='Enter the Publication Date'
                            value={formik.values.date}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='text-center'>
                        <input type='submit' className='btn btn-primary' value={editingUserId ? "Update" : "Submit"} />
                        <input type='reset' className='btn btn-danger' onClick={() => setEditingUserId(null)} />
                    </div>
                </form>
            </div>
            </div>
            <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className='box'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Publication Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.title}</td>
                                <td>{user.author}</td>
                                <td>{user.isbn}</td>
                                <td>{user.date}</td>
                                <td>
                                    <button className='btn btn-primary mx-2' onClick={() => editUser(user)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            <div className='text-center'>
                <Link to="/" className='btn btn-warning'>Home</Link>
            </div>
        </div>
        </div>
    )
}

export default Author;