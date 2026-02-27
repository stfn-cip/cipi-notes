import { signInSchema, signUpSchema } from '../types'

/**
 * VALIDATION TESTS EXAMPLE
 *
 * Testing validation schemas is important because they protect
 * your app from invalid data. Zod schemas are pure functions,
 * making them easy to test.
 *
 * This demonstrates testing edge cases and error messages.
 */

describe('signInSchema validation', () => {
  it('should accept valid sign in data', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
    }

    const result = signInSchema.safeParse(validData)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validData)
    }
  })

  it('should reject invalid email format', () => {
    const invalidData = {
      email: 'not-an-email',
      password: 'password123',
    }

    const result = signInSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email')
      expect(result.error.issues[0].message).toMatch(/email/i)
    }
  })

  it('should reject empty password', () => {
    const invalidData = {
      email: 'test@example.com',
      password: '',
    }

    const result = signInSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('password')
    }
  })

  it('should reject missing fields', () => {
    const invalidData = {
      email: 'test@example.com',
      // password is missing
    }

    const result = signInSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
  })
})

describe('signUpSchema validation', () => {
  const validSignUpData = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password123',
  }

  it('should accept valid sign up data', () => {
    const result = signUpSchema.safeParse(validSignUpData)

    expect(result.success).toBe(true)
  })

  describe('first_name validation', () => {
    it('should reject names shorter than 2 characters', () => {
      const invalidData = {
        ...validSignUpData,
        first_name: 'J',
      }

      const result = signUpSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        const firstNameError = result.error.issues.find(
          (issue) => issue.path[0] === 'first_name'
        )
        expect(firstNameError).toBeDefined()
      }
    })

    it('should reject names longer than 50 characters', () => {
      const invalidData = {
        ...validSignUpData,
        first_name: 'A'.repeat(51),
      }

      const result = signUpSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
    })

    it('should reject names with numbers', () => {
      const invalidData = {
        ...validSignUpData,
        first_name: 'John123',
      }

      const result = signUpSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.issues.find(
          (issue) => issue.path[0] === 'first_name'
        )
        expect(error?.message).toBe('Invalid name')
      }
    })

    it('should accept names with special characters like hyphens and apostrophes', () => {
      const validData = {
        ...validSignUpData,
        first_name: "Jean-Paul",
        last_name: "O'Brien",
      }

      const result = signUpSchema.safeParse(validData)

      expect(result.success).toBe(true)
    })

    it('should accept names with accented characters', () => {
      const validData = {
        ...validSignUpData,
        first_name: 'José',
        last_name: 'François',
      }

      const result = signUpSchema.safeParse(validData)

      expect(result.success).toBe(true)
    })
  })

  describe('password validation', () => {
    it('should reject passwords shorter than 8 characters', () => {
      const invalidData = {
        ...validSignUpData,
        password: 'Pass1',
      }

      const result = signUpSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
    })

    it('should reject passwords longer than 64 characters', () => {
      const invalidData = {
        ...validSignUpData,
        password: 'A'.repeat(65) + 'a1',
      }

      const result = signUpSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
    })

    it('should reject passwords without uppercase letter', () => {
      const invalidData = {
        ...validSignUpData,
        password: 'password123',
      }

      const result = signUpSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        const passwordError = result.error.issues.find(
          (issue) => issue.path[0] === 'password'
        )
        expect(passwordError?.message).toContain('uppercase')
      }
    })

    it('should reject passwords without lowercase letter', () => {
      const invalidData = {
        ...validSignUpData,
        password: 'PASSWORD123',
      }

      const result = signUpSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
    })

    it('should reject passwords without numbers', () => {
      const invalidData = {
        ...validSignUpData,
        password: 'PasswordOnly',
      }

      const result = signUpSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        const passwordError = result.error.issues.find(
          (issue) => issue.path[0] === 'password'
        )
        expect(passwordError?.message).toContain('number')
      }
    })

    it('should accept valid complex passwords', () => {
      const validPasswords = [
        'Password123',
        'MyP@ssw0rd',
        'Str0ngPass!',
        'C0mpl3xP@ss',
      ]

      validPasswords.forEach((password) => {
        const data = { ...validSignUpData, password }
        const result = signUpSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('email validation', () => {
    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example',
      ]

      invalidEmails.forEach((email) => {
        const data = { ...validSignUpData, email }
        const result = signUpSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })

    it('should accept various valid email formats', () => {
      const validEmails = [
        'simple@example.com',
        'user+tag@example.co.uk',
        'user.name@example.com',
        'user_name@example-domain.com',
      ]

      validEmails.forEach((email) => {
        const data = { ...validSignUpData, email }
        const result = signUpSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })
})

/**
 * LEARNING NOTES:
 *
 * Testing validation schemas:
 * - Test happy path (valid data)
 * - Test each validation rule individually
 * - Test edge cases (min/max boundaries)
 * - Test error messages when applicable
 * - Group related tests with describe blocks
 *
 * Zod testing pattern:
 * - Use safeParse() to get result without throwing
 * - Check result.success to see if validation passed
 * - Access result.data for valid results
 * - Access result.error.issues for error details
 *
 * Benefits of testing validation:
 * - Catches security issues (weak passwords, SQL injection in email, etc.)
 * - Documents business rules
 * - Prevents regressions when rules change
 * - Verifies error messages are helpful to users
 */
