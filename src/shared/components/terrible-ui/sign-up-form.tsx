'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import TerribleNameSelector from './name'
import TerriblePhone from './phone'
import TerribleDatePicker from './date'
import UsernameLimiter from './username'
import TerribleSubmitButton from './submit-button'
import Confetti from './confetti'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' })
    .refine(val => /[A-Z]/.test(val), { message: 'Must contain at least one UPPERCASE letter' })
    // Must me at least 4 characters long
    .refine(val => val.length >= 4, { message: 'Name must be at least 4 characters long' }),
  username: z.string().min(1, { message: 'Username is required' })
    .max(10, { message: 'Username too long' })
    .refine(val => val.toLowerCase() !== val, { message: 'Username must not be all lowercase' }),
  phone: z.string()
    .refine(val => val.length === 10 && parseInt(val) > 7000000000, { 
      message: 'Phone number must start with 7 and be exactly 10 digits' 
    }),
  birthdate: z.date()
    .refine(val => val > new Date('1900-01-01'), { message: 'Are you really that old?' })
    .refine(val => val < new Date(), { message: 'Time travelers not allowed' }),
  disagreeTerms: z.boolean().refine(val => val === false, { message: 'You must agree with the terms' })
})

type FormData = z.infer<typeof formSchema>

export default function SignUpForm() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    disagreeTerms: true // Set initial value to true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setShowConfetti(false)

    try {
      const validatedData = formSchema.parse({
        ...formData,
        disagreeTerms: formData.disagreeTerms || false
      })
      
      // If we get here, validation passed
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setShowConfetti(true) // Trigger confetti before alert
      
      alert(`🎉 CONGRATULATIONS! 🎉
You've managed to complete this terrible form correctly!

Your submitted data:
Name: ${validatedData.name}
Username: ${validatedData.username}
Phone: ${validatedData.phone}
Birthday: ${validatedData.birthdate.toLocaleDateString()}

You must be a very patient person...`)
      
      setFormData({
        disagreeTerms: true // Reset to true when form is cleared
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path) {
            errorMessages[err.path[0]] = err.message
          }
        })
        setErrors(errorMessages)
        
        const missingFields = Object.keys(errorMessages)
        alert(`😅 Not quite there yet! 

The following fields need attention:
${missingFields.map(field => `- ${field}: ${errorMessages[field]}`).join('\n')}

Keep trying! You can do this... maybe.`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {showConfetti && <Confetti duration={5000} />}
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center text-2xl font-bold text-red-600 animate-pulse">
          <span className="inline-block transform -scale-x-100">🎉</span> 
          Sign Up (If You Can) 
          <span className="inline-block transform -scale-x-100">🎉</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-black">
              Your Name <span className="text-xs text-gray-500">(must include 1 UPPERCASE, and be at least 4 characters long)</span>
            </h3>
            <TerribleNameSelector 
              value={formData.name || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <h3 className="text-lg font-medium text-black">
              Choose Username 
              <span className="text-xs text-gray-500">(max 10 chars, NO lowercase only)</span>
            </h3>
            <UsernameLimiter 
              value={formData.username || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <h3 className="text-lg font-medium text-black">
              Phone Number 
              <span className="text-xs text-gray-500">(must start with 07)</span>
            </h3>
            <TerriblePhone 
              value={formData.phone || ''}
              onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <h3 className="text-lg font-medium text-black">
              Date of Birth 
              <span className="text-xs text-gray-500">(no time travelers)</span>
            </h3>
            <TerribleDatePicker 
              value={formData.birthdate}
              onChange={(value) => setFormData(prev => ({ ...prev, birthdate: value }))}
            />
            {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2">
            <span className="text-sm">I disagree with the terms</span>
            <input 
              type="checkbox" 
              className="form-checkbox"
              checked={formData.disagreeTerms}
              onChange={(e) => {
                if (!e.target.checked) {
                  alert("You must disagree to continue!")
                  e.target.checked = true
                }
                setFormData(prev => ({ ...prev, disagreeTerms: e.target.checked }))
              }}
            />
            {errors.disagreeTerms && <p className="text-red-500 text-sm ml-2">{errors.disagreeTerms}</p>}
          </label>
          <button
            type="button"
            onClick={() => {
              if (confirm("Are you sure you want to clear the form?")) {
                if (confirm("Really really sure?")) {
                  if (!confirm("Last chance to keep your data!")) {
                    setFormData({
                      disagreeTerms: true // Reset to true when clearing form
                    })
                  }
                }
              }
            }}
            className="text-red-500 hover:text-red-700"
          >
            Save Progress
          </button>
        </div>

        <TerribleSubmitButton isSubmitting={isSubmitting} />

        <div className="text-center text-sm text-black font-medium">
          * By attempting to submit this form, you agree to potentially lose your sanity
          <br />
          <span className="text-xs text-gray-500">
            (Click here to disagree)
          </span>
        </div>
      </form>
    </>
  )
}