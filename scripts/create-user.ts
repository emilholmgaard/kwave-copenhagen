/**
 * Script to create a test user in Supabase
 * 
 * Usage:
 *   npx tsx scripts/create-user.ts <email> <password> [name]
 * 
 * Example:
 *   npx tsx scripts/create-user.ts test@example.com password123 "Test User"
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables!')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file')
  process.exit(1)
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createUser(email: string, password: string, fullName?: string) {
  console.log(`\n🔐 Creating user: ${email}...`)

  try {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email so user can login immediately
      user_metadata: {
        full_name: fullName || email.split('@')[0]
      }
    })

    if (authError) {
      console.error('❌ Error creating user:', authError.message)
      return
    }

    if (!authData.user) {
      console.error('❌ No user data returned')
      return
    }

    console.log('✅ User created successfully!')
    console.log(`   User ID: ${authData.user.id}`)
    console.log(`   Email: ${authData.user.email}`)
    console.log(`   Name: ${authData.user.user_metadata.full_name}`)
    console.log(`\n📝 You can now login at: http://localhost:3000/login`)
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${password}`)
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Get command line arguments
const args = process.argv.slice(2)

if (args.length < 2) {
  console.log('Usage: npx tsx scripts/create-user.ts <email> <password> [name]')
  console.log('\nExample:')
  console.log('  npx tsx scripts/create-user.ts test@example.com password123 "Test User"')
  process.exit(1)
}

const [email, password, fullName] = args

// Validate email
if (!email.includes('@')) {
  console.error('❌ Invalid email address')
  process.exit(1)
}

// Validate password
if (password.length < 6) {
  console.error('❌ Password must be at least 6 characters')
  process.exit(1)
}

createUser(email, password, fullName)

