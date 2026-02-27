import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

/**
 * COMPONENT TESTS EXAMPLE
 *
 * Component tests render React components and test their behavior.
 * We use React Testing Library which focuses on testing components
 * the way users interact with them (not implementation details).
 *
 * Key principles:
 * - Test what users see and do
 * - Query by accessible roles/labels (not by class names or IDs)
 * - Simulate user interactions
 */

describe('Button Component', () => {
  it('should render button with text', () => {
    // Arrange & Act: render the component
    render(<Button>Click me</Button>)

    // Assert: find the button by its accessible role and text
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('should handle click events', async () => {
    // Mock function to track if it was called
    const handleClick = jest.fn()

    // Setup user event
    const user = userEvent.setup()

    // Render button with click handler
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })

    // Simulate user clicking the button
    await user.click(button)

    // Assert the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply different variants correctly', () => {
    const { rerender } = render(<Button variant="default">Default</Button>)

    let button = screen.getByRole('button')
    // Check that the button has the primary background class
    expect(button).toHaveClass('bg-primary')

    // Test destructive variant
    rerender(<Button variant="destructive">Destructive</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')

    // Test outline variant
    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('border')
  })

  it('should apply different sizes correctly', () => {
    const { rerender } = render(<Button size="default">Default Size</Button>)

    let button = screen.getByRole('button')
    expect(button).toHaveClass('h-9')

    rerender(<Button size="sm">Small</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-8')

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-10')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)

    const button = screen.getByRole('button')

    // Check that the button is disabled
    expect(button).toBeDisabled()
    // Check that it has the disabled styles
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('should accept custom className', () => {
    render(<Button className="custom-class">Custom</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('should support keyboard interaction', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Press me</Button>)

    const button = screen.getByRole('button')

    // Focus the button and press Enter
    button.focus()
    await user.keyboard('{Enter}')

    expect(handleClick).toHaveBeenCalled()
  })
})

/**
 * LEARNING NOTES:
 *
 * React Testing Library queries (in order of preference):
 * 1. getByRole - most accessible way (e.g., 'button', 'heading', 'textbox')
 * 2. getByLabelText - for form fields
 * 3. getByPlaceholderText - for inputs
 * 4. getByText - for non-interactive elements
 * 5. getByTestId - last resort, requires adding data-testid
 *
 * Query variants:
 * - getBy* - throws error if not found (use for elements that should exist)
 * - queryBy* - returns null if not found (use to check element doesn't exist)
 * - findBy* - async, waits for element to appear (use for async rendering)
 *
 * User Event vs FireEvent:
 * - userEvent.click() - simulates real user interaction (recommended)
 * - fireEvent.click() - directly triggers event (less realistic)
 *
 * Common assertions:
 * - toBeInTheDocument() - element exists in DOM
 * - toBeVisible() - element is visible
 * - toBeDisabled() / toBeEnabled()
 * - toHaveClass() - has CSS class
 * - toHaveTextContent() - has specific text
 * - toHaveAttribute() - has specific attribute
 */
