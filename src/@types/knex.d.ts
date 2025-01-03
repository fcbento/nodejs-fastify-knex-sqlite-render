/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      age: number
      created_at: string
      session_id?: string
    },
    meals: {
      id: string
      name: string
      description: string,
      on_diet: boolean,
      created_at: string
      user_id: string
    }
  }
}
