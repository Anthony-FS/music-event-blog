import { supabase } from '../lib/supabase'

function getSupabase() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.',
    )
  }

  return supabase
}

export async function getProfile(userId) {
  const { data, error } = await getSupabase()
    .from('profiles')
    .select('id, name, username, bio, avatar_url, role')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateProfile(userId, profile) {
  const { data, error } = await getSupabase()
    .from('profiles')
    .update({
      name: profile.name,
      username: profile.username,
      bio: profile.bio,
      avatar_url: profile.avatarUrl,
    })
    .eq('id', userId)
    .select('id, name, username, bio, avatar_url, role')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateEmail(email) {
  const { data, error } = await getSupabase().auth.updateUser({
    email: email.trim().toLowerCase(),
  })

  if (error) {
    throw new Error(error.message)
  }

  return data.user
}

export function mapProfileToMember(profile, user) {
  const metadata = user.user_metadata ?? {}

  return {
    id: user.id,
    name: profile?.name ?? metadata.name ?? '',
    username: profile?.username ?? metadata.username ?? '',
    email: user.email ?? '',
    role: profile?.role ?? 'member',
    bio: profile?.bio ?? '',
    avatarUrl: profile?.avatar_url ?? '',
  }
}
