import React, { useState } from 'react'

    const FeedbackForm = () => {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [message, setMessage] = useState('')
      const [submitted, setSubmitted] = useState(false)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState('')

      const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
          const response = await fetch('/api/send-feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.error || 'Failed to send feedback')
          }

          // Success!
          setSubmitted(true)
          setName('')
          setEmail('')
          setMessage('')
          
          // Reset success message after 5 seconds
          setTimeout(() => {
            setSubmitted(false)
          }, 5000)
        } catch (err) {
          setError(err.message || 'Something went wrong. Please try again.')
          console.error('Error submitting feedback:', err)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="feedback-form">
          <h3>We'd Love to Hear from You!</h3>
          {submitted ? (
            <p className="success-message">Thank you for your feedback! 🐢</p>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="error-message" style={{
                  color: '#ff6b6b',
                  backgroundColor: '#ffe0e0',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '15px',
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      )
    }

    export default FeedbackForm
