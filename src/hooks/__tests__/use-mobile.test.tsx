import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '../use-mobile'

/**
 * TESTING CUSTOM HOOKS EXAMPLE
 *
 * React hooks can't be called outside of components, so we use
 * renderHook() from React Testing Library to test them.
 *
 * This example also shows how to mock browser APIs like window.matchMedia.
 */

describe('useIsMobile hook', () => {
  // Store original window properties to restore after tests
  let originalInnerWidth: number
  let matchMediaMock: jest.Mock

  beforeEach(() => {
    // Save original window.innerWidth
    originalInnerWidth = window.innerWidth

    // Create a mock for window.matchMedia
    matchMediaMock = jest.fn()

    // Default mock implementation
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    // Replace window.matchMedia with our mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    })
  })

  afterEach(() => {
    // Restore original window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    })
  })

  it('should return true when window width is less than 768px', () => {
    // Mock window.innerWidth to be mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 500, // Mobile width
    })

    // Render the hook
    const { result } = renderHook(() => useIsMobile())

    // Assert that isMobile is true
    expect(result.current).toBe(true)
  })

  it('should return false when window width is 768px or greater', () => {
    // Mock window.innerWidth to be desktop size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024, // Desktop width
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it('should return false when window width is exactly 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 768, // Breakpoint
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it('should update when window is resized', () => {
    // Start with desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    })

    let eventListener: ((event: any) => void) | null = null

    // Capture the event listener that the hook registers
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn((event, listener) => {
        if (event === 'change') {
          eventListener = listener
        }
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    const { result } = renderHook(() => useIsMobile())

    // Initially should be false (desktop)
    expect(result.current).toBe(false)

    // Simulate window resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 500,
      })
      // Trigger the event listener if it was registered
      if (eventListener) {
        eventListener({})
      }
    })

    // After resize, should be true (mobile)
    expect(result.current).toBe(true)
  })

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerMock = jest.fn()

    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    }))

    const { unmount } = renderHook(() => useIsMobile())

    // Unmount the hook
    unmount()

    // Verify that removeEventListener was called (cleanup)
    expect(removeEventListenerMock).toHaveBeenCalled()
  })

  it('should handle edge case at breakpoint - 1', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767, // Just below breakpoint
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })
})

/**
 * LEARNING NOTES:
 *
 * Testing custom hooks:
 * - Use renderHook() to render the hook in a test component
 * - Access hook's return value via result.current
 * - Use act() to wrap state updates
 * - Test cleanup functions (returned from useEffect)
 *
 * renderHook() returns:
 * - result.current - the current return value of the hook
 * - rerender() - to re-render the hook with new props
 * - unmount() - to unmount and test cleanup
 *
 * Mocking browser APIs:
 * - Use Object.defineProperty() to mock window properties
 * - Use jest.fn() for methods like addEventListener
 * - Remember to restore original values in afterEach()
 *
 * act() function:
 * - Wrap code that causes state updates
 * - Ensures React finishes processing updates
 * - Used for: setState calls, user events, async operations
 *
 * Common hook testing patterns:
 * - Test initial state
 * - Test state changes
 * - Test side effects (API calls, subscriptions)
 * - Test cleanup (useEffect return functions)
 * - Test with different prop values
 * - Test error cases
 *
 * Why test hooks:
 * - Hooks contain business logic
 * - Easy to test in isolation
 * - Reused across components
 * - Complex hooks can have subtle bugs
 */
