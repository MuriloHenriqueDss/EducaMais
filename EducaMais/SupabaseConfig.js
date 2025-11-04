// SupabaseConfig.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eckxyybipqwqafndxsrk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVja3h5eWJpcHF3cWFmbmR4c3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNDMzOTUsImV4cCI6MjA3NzgxOTM5NX0.pwUk_-vvs6U-Xe6OyGRpdKo7VzD4myGUNQ0QnylRdxE'

export const supabase = createClient(supabaseUrl, supabaseKey)
