import { cn, CombineUserName } from '../utils'
import { User } from '@supabase/supabase-js'

/**
 * UNIT TESTS EXAMPLE
 *
 * Unit tests test individual functions in isolation.
 * They are fast, simple, and should test edge cases.
 *
 * Test Structure (AAA Pattern):
 * - Arrange: Set up test data
 * - Act: Execute the function
 * - Assert: Check the result
 */

describe('cn utility function', () => {
  // describe() groups related tests together

  it('should merge class names correctly', () => {
    // it() or test() defines a single test case

    // Arrange: prepare test data
    const result = cn('text-red-500', 'bg-blue-500')

    // Assert: check the expected outcome
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle conflicting Tailwind classes', () => {
    // Tailwind-merge should keep the last conflicting class
    const result = cn('p-4', 'p-8')

    expect(result).toBe('p-8')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')

    expect(result).toBe('base-class active-class')
  })

  it('should handle empty inputs', () => {
    const result = cn()

    expect(result).toBe('')
  })
})

describe('CombineUserName utility function', () => {
  it('should combine first and last name from user metadata', () => {
    // Mock a User object with user_metadata
    const mockUser = {
      id: '123',
      user_metadata: {
        first_name: 'John',
        last_name: 'Doe',
      },
    } as User

    const result = CombineUserName(mockUser)

    expect(result).toBe('John Doe')
  })

  it('should combine first and last name from direct properties', () => {
    // Test the other branch where user_metadata doesn't exist
    const mockUser = {
      first_name: 'Jane',
      last_name: 'Smith',
    }

    const result = CombineUserName(mockUser)

    expect(result).toBe('Jane Smith')
  })

  it('should handle undefined user_metadata', () => {
    const mockUser = {
      id: '123',
      user_metadata: undefined,
    } as User

    const result = CombineUserName(mockUser)

    // This will return undefined - you might want to add a fallback in the actual code
    expect(result).toBeUndefined()
  })
})

/**
 * LEARNING NOTES:
 *
 * Common Jest matchers:
 * - expect(value).toBe(expected) - strict equality (===)
 * - expect(value).toEqual(expected) - deep equality (for objects/arrays)
 * - expect(value).toBeTruthy() / toBeFalsy()
 * - expect(value).toBeNull() / toBeUndefined()
 * - expect(value).toContain(item) - for arrays/strings
 * - expect(fn).toThrow() - for functions that should throw errors
 *
 * Running tests:
 * - npm test - runs all tests
 * - npm test utils.test - runs specific test file
 * - npm test -- --watch - runs tests in watch mode
 * - npm test -- --coverage - shows code coverage
 */
