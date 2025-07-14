import React, { useState, useEffect } from 'react';

// Admin credentials (in production, this should be handled more securely)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'drdo123'
};

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = () => {
    setLoading(true);
    setError('');

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        onLogin(true);
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>DRDO Admin Login</h1>
          <p>Enter your credentials to access the admin panel</p>
        </div>
        
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter admin username"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter admin password"
              disabled={loading}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            onClick={handleSubmit}
            className="login-button"
            disabled={loading || !credentials.username || !credentials.password}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        
        <div className="login-footer">
          <p>For security purposes, please ensure you log out after use.</p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: Arial, sans-serif;
          padding: 20px;
        }

        .login-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          padding: 40px;
          width: 100%;
          max-width: 400px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-header h1 {
          color: #333;
          margin: 0 0 10px 0;
          font-size: 24px;
        }

        .login-header p {
          color: #666;
          margin: 0;
          font-size: 14px;
        }

        .login-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .error-message {
          background: #fee;
          border: 1px solid #fcc;
          color: #c66;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .login-button:hover:not(:disabled) {
          background: #5a6fd8;
        }

        .login-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .login-footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .login-footer p {
          color: #666;
          font-size: 12px;
          margin: 0;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 20px;
            margin: 10px;
          }
          
          .login-header h1 {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}

// Protected Admin Route Component
function ProtectedAdmin({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (session storage)
  useEffect(() => {
    const adminSession = sessionStorage.getItem('adminLoggedIn');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminLoggedIn');
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Clone children and add logout function
  return (
    <div>
      {React.cloneElement(children, { onLogout: handleLogout })}
    </div>
  );
}

// Updated AdminCourseEditor with logout functionality
function AdminCourseEditor({ courses, setCourses, onLogout }) {
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    deputy: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (course) => {
    setEditingCourse(course.id);
    setFormData({
      title: course.title,
      director: course.director,
      deputy: course.deputy
    });
    setShowAddForm(false);
  };

  const handleUpdate = () => {
    if (!formData.title || !formData.director || !formData.deputy) {
      alert('Please fill in all fields');
      return;
    }
    setCourses(courses.map(course => 
      course.id === editingCourse 
        ? { ...course, ...formData }
        : course
    ));
    setEditingCourse(null);
    setFormData({ title: '', director: '', deputy: '' });
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handleAdd = () => {
    if (!formData.title || !formData.director || !formData.deputy) {
      alert('Please fill in all fields');
      return;
    }
    const newCourse = {
      id: Math.max(...courses.map(c => c.id)) + 1,
      ...formData
    };
    setCourses([...courses, newCourse]);
    setFormData({ title: '', director: '', deputy: '' });
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingCourse(null);
    setShowAddForm(false);
    setFormData({ title: '', director: '', deputy: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Course Management</h1>
        <div className="admin-actions">
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
            disabled={editingCourse || showAddForm}
          >
            Add New Course
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-secondary"
          >
            Back to Home
          </button>
          <button 
            onClick={onLogout}
            className="btn-logout"
          >
            Logout
          </button>
        </div>
      </div>

      {(editingCourse || showAddForm) && (
        <div className="form-container">
          <h2>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
          <div>
            <div className="form-group">
              <label htmlFor="title">Course Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="director">Director:</label>
              <input
                type="text"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="deputy">Deputy:</label>
              <input
                type="text"
                id="deputy"
                name="deputy"
                value={formData.deputy}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={editingCourse ? handleUpdate : handleAdd} className="btn-primary">
                {editingCourse ? 'Update Course' : 'Add Course'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="courses-table">
        <h2>Existing Courses</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Title</th>
              <th>Director</th>
              <th>Deputy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.director}</td>
                <td>{course.deputy}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(course)}
                    className="btn-edit"
                    disabled={editingCourse || showAddForm}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(course.id)}
                    className="btn-delete"
                    disabled={editingCourse || showAddForm}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
        }

        .admin-header h1 {
          color: #333;
          margin: 0;
        }

        .admin-actions {
          display: flex;
          gap: 10px;
        }

        .form-container {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .form-container h2 {
          margin-top: 0;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }

        .form-actions {
          display: flex;
          gap: 10px;
        }

        .courses-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .courses-table h2 {
          margin: 0;
          padding: 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }

        th {
          background: #f8f9fa;
          font-weight: bold;
          color: #333;
        }

        tr:hover {
          background: #f8f9fa;
        }

        .btn-primary {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #5a6268;
        }

        .btn-logout {
          background: #dc3545;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
        }

        .btn-logout:hover:not(:disabled) {
          background: #c82333;
        }

        .btn-edit {
          background: #28a745;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          margin-right: 5px;
          transition: background 0.3s;
        }

        .btn-edit:hover:not(:disabled) {
          background: #218838;
        }

        .btn-delete {
          background: #dc3545;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.3s;
        }

        .btn-delete:hover:not(:disabled) {
          background: #c82333;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            gap: 15px;
          }

          .admin-actions {
            flex-direction: column;
            width: 100%;
          }

          .form-actions {
            flex-direction: column;
          }

          table {
            font-size: 12px;
          }

          th, td {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
}

export { AdminLogin, ProtectedAdmin, AdminCourseEditor };