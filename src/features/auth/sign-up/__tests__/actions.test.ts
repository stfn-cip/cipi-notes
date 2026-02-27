/**
 * INTEGRATION TESTS WITH MOCKING EXAMPLE
 *
 * Sometimes you need to test functions that depend on external services
 * (databases, APIs, etc.). You don't want to make real API calls in tests
 * because they're slow, expensive, and can fail for unrelated reasons.
 *
 * Solution: MOCKING - creating fake versions of dependencies.
 *
 * This example shows how to test Next.js Server Actions that use Supabase.
 */

import { signUp } from '../actions'

// Mock the Supabase client module
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}))

// Mock Next.js cache and navigation
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

// Import after mocking so we get the mocked versions
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

describe('signUp server action', () => {
  // Setup: create mock functions
  let mockSupabaseAuth: any

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Create a mock Supabase auth object
    mockSupabaseAuth = {
      signUp: jest.fn(),
    }

    // Make createClient return our mock
    ;(createClient as jest.Mock).mockResolvedValue({
      auth: mockSupabaseAuth,
    })
  })

  // Helper function to create FormData (mimics browser form submission)
  const createFormData = (data: Record<string, string>) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    return formData
  }

  it('should successfully sign up a user with valid data', async () => {
    // Arrange: prepare test data
    const validFormData = createFormData({
      'first-name': 'John',
      'last-name': 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
    })

    // Mock Supabase to return success
    mockSupabaseAuth.signUp.mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    })

    // Act & Assert: the function should redirect on success
    // Since redirect throws in Next.js, we expect it to throw
    await expect(
      signUp({ message: '' }, validFormData)
    ).rejects.toThrow()

    // Verify Supabase was called with correct data
    expect(mockSupabaseAuth.signUp).toHaveBeenCalledWith({
      email: 'john.doe@example.com',
      password: 'Password123',
      options: {
        data: {
          first_name: 'John',
          last_name: 'Doe',
        },
      },
    })

    // Verify cache was revalidated
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')

    // Verify redirect was called
    expect(redirect).toHaveBeenCalledWith('/')
  })

  it('should return validation errors for invalid data', async () => {
    // Arrange: create invalid form data (password too short, no uppercase)
    const invalidFormData = createFormData({
      'first-name': 'John',
      'last-name': 'Doe',
      email: 'john.doe@example.com',
      password: 'weak',
    })

    // Act: call the function
    const result = await signUp({ message: '' }, invalidFormData)

    // Assert: should return Zod validation errors
    expect(result).toHaveProperty('password')
    expect(mockSupabaseAuth.signUp).not.toHaveBeenCalled()
  })

  it('should return validation errors for invalid email', async () => {
    const invalidFormData = createFormData({
      'first-name': 'John',
      'last-name': 'Doe',
      email: 'not-an-email',
      password: 'Password123',
    })

    const result = await signUp({ message: '' }, invalidFormData)

    expect(result).toHaveProperty('email')
    expect(mockSupabaseAuth.signUp).not.toHaveBeenCalled()
  })

  it('should return validation errors for invalid names', async () => {
    const invalidFormData = createFormData({
      'first-name': 'J', // too short
      'last-name': 'Doe123', // contains numbers
      email: 'john@example.com',
      password: 'Password123',
    })

    const result = await signUp({ message: '' }, invalidFormData)

    expect(result).toHaveProperty('first_name')
    expect(result).toHaveProperty('last_name')
  })

  it('should handle Supabase errors gracefully', async () => {
    // Arrange: valid data but Supabase returns an error
    const validFormData = createFormData({
      'first-name': 'John',
      'last-name': 'Doe',
      email: 'existing@example.com',
      password: 'Password123',
    })

    // Mock Supabase to return an error (e.g., email already exists)
    mockSupabaseAuth.signUp.mockResolvedValue({
      data: null,
      error: {
        message: 'User already registered',
      },
    })

    // Act: call the function
    const result = await signUp({ message: '' }, validFormData)

    // Assert: should return error message
    expect(result).toEqual({ message: 'User already registered' })
    expect(redirect).not.toHaveBeenCalled()
  })

  it('should handle unexpected exceptions', async () => {
    const validFormData = createFormData({
      'first-name': 'John',
      'last-name': 'Doe',
      email: 'john@example.com',
      password: 'Password123',
    })

    // Mock Supabase to throw an exception
    mockSupabaseAuth.signUp.mockRejectedValue(new Error('Network error'))

    const result = await signUp({ message: '' }, validFormData)

    expect(result).toEqual({ message: 'Failed to sign up' })
  })

  it('should handle missing form fields', async () => {
    // Create form data with missing fields
    const incompleteFormData = createFormData({
      'first-name': 'John',
      // missing last-name, email, password
    })

    const result = await signUp({ message: '' }, incompleteFormData)

    // Should return validation errors
    expect(result).toHaveProperty('last_name')
    expect(result).toHaveProperty('email')
    expect(result).toHaveProperty('password')
  })
})

/**
 * LEARNING NOTES:
 *
 * Mocking concepts:
 * - jest.mock('module-path') - replaces entire module with mock
 * - jest.fn() - creates a mock function
 * - mockResolvedValue() - makes async function resolve with value
 * - mockRejectedValue() - makes async function reject with error
 * - mockReturnValue() - makes sync function return value
 *
 * beforeEach / afterEach:
 * - beforeEach() - runs before each test (setup)
 * - afterEach() - runs after each test (cleanup)
 * - beforeAll() - runs once before all tests
 * - afterAll() - runs once after all tests
 *
 * Assertions on mocks:
 * - expect(mockFn).toHaveBeenCalled()
 * - expect(mockFn).toHaveBeenCalledTimes(n)
 * - expect(mockFn).toHaveBeenCalledWith(args)
 * - expect(mockFn).not.toHaveBeenCalled()
 *
 * Why mock external dependencies:
 * - Tests run fast (no real network calls)
 * - Tests are reliable (no external failures)
 * - Tests are isolated (only test your code)
 * - Can simulate error scenarios easily
 * - Don't need test databases or API keys
 *
 * What to mock:
 * - External APIs (Supabase, Stripe, etc.)
 * - Database calls
 * - File system operations
 * - Date/time (for consistent tests)
 * - Random number generators
 *
 * What NOT to mock:
 * - Your own utility functions (test them for real)
 * - Simple libraries (lodash, date-fns, etc.)
 * - Things you want to integration test
 */
