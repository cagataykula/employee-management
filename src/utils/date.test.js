import { describe, it, expect } from 'vitest'
import { formatDate, isValidDate } from './date.js'

describe('Date Utils', () => {
	describe('formatDate', () => {
		it('should format YYYY-MM-DD date to DD/MM/YYYY', () => {
			expect(formatDate('2023-01-15')).toBe('15/01/2023')
			expect(formatDate('1990-05-20')).toBe('20/05/1990')
			expect(formatDate('2022-08-01')).toBe('01/08/2022')
			expect(formatDate('1992-11-30')).toBe('30/11/1992')
		})

		it('should handle single digit dates and months', () => {
			expect(formatDate('2023-01-05')).toBe('05/01/2023')
			expect(formatDate('2023-12-01')).toBe('01/12/2023')
			expect(formatDate('2023-09-09')).toBe('09/09/2023')
		})

		it('should return empty string for empty input', () => {
			expect(formatDate('')).toBe('')
			expect(formatDate(null)).toBe('')
			expect(formatDate(undefined)).toBe('')
		})

		it('should handle invalid dates gracefully', () => {
			expect(formatDate('invalid-date')).toBe('invalid-date')
			expect(formatDate('2023-13-45')).toBe('2023-13-45')
		})

		it('should handle Date object input', () => {
			const date = new Date(2023, 0, 15) // January 15, 2023
			expect(formatDate(date.toISOString())).toBe('15/01/2023')
		})
	})

	describe('isValidDate', () => {
		it('should return true for valid dates', () => {
			expect(isValidDate('2023-01-15')).toBe(true)
			expect(isValidDate('1990-12-31')).toBe(true)
		})

		it('should return false for invalid dates', () => {
			expect(isValidDate('invalid-date')).toBe(false)
			expect(isValidDate('2023-13-45')).toBe(false)
			expect(isValidDate('')).toBe(false)
			expect(isValidDate(null)).toBe(false)
			expect(isValidDate(undefined)).toBe(false)
		})
	})
})
