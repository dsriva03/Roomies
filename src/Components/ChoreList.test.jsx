import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import apiFetch from '../apiFetch.js';
import ChoreList from './ChoreList';

/* JEST FETCH MOCK */
//https://www.codementor.io/@chihebnabil/complete-guide-to-mocking-fetch-in-jest-2lejnjl4bs
// describe("API Tests", () => {
//     beforeEach(() => {
//       global.fetch = jest.fn();
//     });
  
//     afterEach(() => {
//       jest.clearAllMocks();
//     });
//   });

//   it("handles successful API calls", async () => {
//     // Setup mock response
//     const mockData = { success: true, data: "test" };
//     global.fetch = jest.fn().mockResolvedValue({
//       ok: true,
//       json: () => Promise.resolve(mockData)
//     });
  
//     // Make API call
//     const response = await fetch('/api/data');
//     const data = await response.json();
  
//     // Verify results
//     expect(data).toEqual(mockData);
//   });

//   it("handles API errors", async () => {
//     // Mock network error
//     global.fetch = jest.fn().mockRejectedValue(
//       new Error("Network error")
//     );
  
//     // Verify error handling
//     await expect(fetch('/api/data'))
//       .rejects
//       .toThrow("Network error");
//   });

// it("chores are got when we get them", async () => {
//     const response = await apiFetch.getChores();
//     expect(response).toBe([{id: 1,
//         task_name: 'walk the dishes',
//         type: 'daily',
//         assigned_to: null,
//         status: 'pending',
//         due_date: null,
//         created_at: new Date()}]);
    
// it('the fetch fails with an error', async () => {
//     expect.assertions(1);
//     try {
//         await apiFetch.getChores();
//     } catch (error) {
//         expect(error).toMatch('error');
//     }
//     });
// });
test("chores are got when we get them", async () => {
    const response = await apiFetch.getChores();
    expect(response).toBeTruthy();
});


/**
   * test('the data is peanut butter', async () => {
        const data = await fetchData();
        expect(data).toBe('peanut butter');
     });

    test('the fetch fails with an error', async () => {
        expect.assertions(1);
        try {
        await fetchData();
        } catch (error) {
            expect(error).toMatch('error');
        }
    });
*/