import React, { useState, useEffect } from 'react'

    export default function Club() {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [submitted, setSubmitted] = useState(false)
      const [members, setMembers] = useState([])

      // Load members from localStorage on component mount
      useEffect(() => {
        const storedMembers = JSON.parse(localStorage.getItem('turtleWorldClubMembers')) || []
        setMembers(storedMembers)
      }, [])

      const handleSubmit = (e) => {
        e.preventDefault()
        
        // Create new member object
        const newMember = {
          name,
          email,
          date: new Date().toLocaleString()
        }

        // Update members list
        const updatedMembers = [...members, newMember]
        setMembers(updatedMembers)

        // Save to localStorage
        localStorage.setItem('turtleWorldClubMembers', JSON.stringify(updatedMembers))

        // Reset form and show success message
        setSubmitted(true)
        setName('')
        setEmail('')
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
        }, 3000)
      }

      return (
        <section id="club">
          <h2>Join the Turtle World Club!</h2>
          <p>Sign up to receive emails and notifications about good turtle news and updates.</p>
          
          {submitted ? (
            <p className="success-message">Thank you for joining the Turtle World Club! 🐢</p>
          ) : (
            <form onSubmit={handleSubmit} className="club-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Sign Up
              </button>
            </form>
          )}

          {/* Display members list (for admin purposes) */}
          <div style={{ marginTop: '40px', display: 'none' /* Hidden by default */ }}>
            <h3>Club Members</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Join Date</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{member.name}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{member.email}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{member.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )
    }
