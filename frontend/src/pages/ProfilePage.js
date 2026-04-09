// frontend/src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { userAPI } from '../services/api';
import './ProfilePage.css';

const ProfilePage = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    branch: user?.branch || '',
    year: user?.year || '',
    interests: user?.interests || [],
  });
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const branches = ['CSE', 'ECE', 'IT', 'ME', 'CE', 'EE', 'Other'];
  const years = ['1st', '2nd', '3rd', '4th'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = async (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
    try {
      await userAPI.removeSkill(skill);
      toast.success('Skill removed');
    } catch (error) {
      toast.error('Error removing skill');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userAPI.updateProfile({
        ...formData,
        skills,
      });

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkillClick = async () => {
    if (newSkill.trim()) {
      try {
        await userAPI.addSkills([newSkill.trim()]);
        handleAddSkill();
        toast.success('Skill added successfully');
      } catch (error) {
        toast.error('Error adding skill');
      }
    }
  };

  return (
    <main className="profile-page">
      <div className="container profile-container">
        <div className="profile-header">
          <h1>👤 My Profile</h1>
          <p>Update your information and skills</p>
        </div>

        <div className="profile-content">
          {/* Basic Information */}
          <section className="profile-section">
            <h2>Basic Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="branch">Branch</label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                  >
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year} Year
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </section>

          {/* Skills Section */}
          <section className="profile-section">
            <h2>Skills & Experience</h2>
            <div className="skills-section">
              <div className="add-skill-form">
                <input
                  type="text"
                  placeholder="Add a new skill (e.g., Python, React, AWS)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkillClick()}
                />
                <button
                  type="button"
                  onClick={handleAddSkillClick}
                  className="btn-primary"
                >
                  Add Skill
                </button>
              </div>

              {skills.length > 0 && (
                <div className="skills-display">
                  <h4>Your Skills:</h4>
                  <div className="skills-tags">
                    {skills.map((skill) => (
                      <div key={skill} className="skill-item">
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="remove-skill"
                          title="Remove skill"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Account Information */}
          <section className="profile-section">
            <h2>Account Information</h2>
            <div className="account-info">
              <div className="info-item">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-item">
                <label>Profile Status</label>
                <p>{user?.profileComplete ? '✓ Complete' : '⚠ Incomplete'}</p>
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
