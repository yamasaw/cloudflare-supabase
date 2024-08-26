import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { User } from '../types/users'
import { ClientErrorStatusCode } from 'hono/utils/http-status'
import { createClient } from '@supabase/supabase-js'


type Bindings = {
  DB: D1Database
  SUPABASE_URL: string
  SUPABASE_KEY: string
}
const app = new Hono<{Bindings: Bindings}>()


app.use('*', cors({
  origin: ['http://localhost:3000'],
}))

app.get('/', async (c) => {
  return c.json({ message: 'Hello World' })
})

app.post('/login/', async(c) => {
  const body = await c.req.json()
  const supabaseUrl = c.env.SUPABASE_URL
  const supabaseKey = c.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } =  await supabase.auth.signInWithPassword(body)
  if (error) {
    return c.json({ message: error.message }, error.status as ClientErrorStatusCode)
  }
  return c.json(data.session)
})

app.post('/logout/', async(c) => {
  const supabaseUrl = c.env.SUPABASE_URL
  const supabaseKey = c.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { error } =  await supabase.auth.signOut()
  if (error) {
    return c.json({ message: error.message }, error.status as ClientErrorStatusCode)
  }
  return c.json({ message: 'Logged out' })
})

app.post('/signup/', async(c) => {
  const body = await c.req.json()
  const supabaseUrl = c.env.SUPABASE_URL
  const supabaseKey = c.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.auth.signUp(body)

  if (error) {
    return c.json({ message: error.message }, error.status as ClientErrorStatusCode)
  }

  return c.json(data)
})

// TODO 認証ユーザの一覧を取得
app.get('/users/', async (c) => {
  const supabaseUrl = c.env.SUPABASE_URL
  const supabaseKey = c.env.SUPABASE_KEY
  const supabase = createClient<Array<User>>(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.from('users').select('*')

  return c.json(data)
})

// TODO 認証ユーザの詳細情報を取得
app.get('/users/:id', async (c) => {
  const supabaseUrl = c.env.SUPABASE_URL
  const supabaseKey = c.env.SUPABASE_KEY
  const supabase = createClient<User>(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.from('users').select('*')
  return c.json(data)
})

app.notFound((c) => {
  return c.json({ message: 'Not Found' }, 404)
})

export default app
