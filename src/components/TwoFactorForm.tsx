"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface TwoFactorFormProps {
  tempToken: string
  onSuccess: () => void
  onError: (error: string) => void
  onBack: () => void
}

export function TwoFactorForm({ tempToken, onSuccess, onError, onBack }: TwoFactorFormProps) {
  const [otpValue, setOtpValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      // TODO: Implement API call to backend
      console.log('2FA verification:', { tempToken, otpValue })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate success/failure (randomly for demo)
      const isValid = Math.random() > 0.3 // 70% success rate for demo
      
      if (isValid) {
        onSuccess()
      } else {
        setError('Invalid verification code. Please try again.')
      }
    } catch (error) {
      onError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (value: string) => {
    setOtpValue(value)
    if (error) {
      setError('')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
        <CardDescription>
          Enter the 6-digit code from your authenticator app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={handleOtpChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="space-y-3">
            <Button type="submit" className="w-full" disabled={isLoading || otpValue.length !== 6}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
            
            <Button type="button" variant="outline" className="w-full" onClick={onBack}>
              Back to Login
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have access to your authenticator app?{' '}
            <button className="text-primary hover:underline">
              Contact Support
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
