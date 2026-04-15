import { hasUpdates } from '@utils/has-updates'
import type { Todo, UpdateTodo } from '@shared/index'
import { describe, expect, test } from 'vitest'

describe("utility function: hasUpdates()", () => {
   // Failure: 'false'
   test("should return false if both fields are identical", () => {
      const incoming: UpdateTodo = {
         id: 245,
         title: "Buy milk",
         desc: "Get sugar from Walmart"
      }
      const existing: Todo = {
         id: 245,
         title: "Buy milk",
         desc: "Get sugar from Walmart"
      }

      const result = hasUpdates(incoming, existing)

      expect(result).toBeFalsy()
   })

   test("should return false if a single specified field is identical", () => {
      const incoming: UpdateTodo = {
         id: 245,
         title: "OLD",
      }
      const existing: Todo = {
         id: 245,
         title: "OLD",
         desc: "OLDER"
      }

      const result = hasUpdates(incoming, existing)

      expect(result).toBeFalsy()
   })

   // Failed test:
   test("should return false if sent a partial update (new title, identical desc included)", () => {
      const incoming: UpdateTodo = {
         id: 245,
         title: "NEW",
         desc: "OLD"
      }
      const existing: Todo = {
         id: 245,
         title: "OLD",
         desc: "OLD"
      }

      const result = hasUpdates(incoming, existing)

      expect(result).toBeFalsy()
   })

   // Success: 'true'
   test('should return true if both fields are unique', () => {
      const incoming: UpdateTodo = {
         id: 245,
         title: "NEW",
         desc: "NEWER"
      }
      const existing: Todo = {
         id: 245,
         title: "OLD",
         desc: "OLDER"
      }

      const result = hasUpdates(incoming, existing)

      expect(result).toBeTruthy()
   })

   test('should return true if one specified field is unique', () => {
      const incoming: UpdateTodo = {
         id: 245,
         title: "NEW",
      }
      const existing: Todo = {
         id: 245,
         title: "OLD",
         desc: "OLDER"
      }

      const result = hasUpdates(incoming, existing)

      expect(result).toBeTruthy()
   })
})