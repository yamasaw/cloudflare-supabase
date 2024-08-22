import { Hono } from 'hono'
import { createClient } from '@supabase/supabase-js'



type Bindings = {
  DB: D1Database
  SUPABASE_URL: string
  SUPABASE_KEY: string
}
const app = new Hono<{Bindings: Bindings}>()


app.get('/', async (c) => {
  const supabaseUrl = c.env.SUPABASE_URL
  const supabaseKey = c.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.from('sample').select('*')
  return c.json({ message: 'Hello World' })
})

app.get('/users/', async (c) => {
  const supabaseUrl = c.env.SUPABASE_URL
  const supabaseKey = c.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.from('users').select('*')
  return c.json(data)
})

app.notFound((c) => {
  return c.json({ message: 'Not Found' }, 404)
})

export default app
