import { createClient, SupabaseClient, User, UserAttributes } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

interface UserData {
  id: string;
  [key: string]: any;
}

interface ContentData {
  user_id: string;
  [key: string]: any;
}

// 1. Get User Data
export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// 2. Save User Data
export const saveUserData = async (userId: string, userData: Partial<UserData>): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase.from('users').upsert({ id: userId, ...userData });
    if (error) throw error;
    if (!data) throw new Error('No data returned');
    return data[0];
  } catch (error) {
    console.error('Error saving user data:', error);
    return null;
  }
};

// 3. Try Update User Data
export const tryUpdateUserData = async (userId: string, newData: Partial<UserData>): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase.from('users').update(newData).eq('id', userId);
    if (error) throw error;
    if (!data) throw new Error('No data returned');
    return data[0];
  } catch (error) {
    console.error('Error updating user data:', error);
    return null;
  }
};

// 4. Try Change Tier Status
export const tryChangeTierStatus = async (userId: string, newTier: string): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase.from('users').update({ tier_status: newTier }).eq('id', userId);
    if (error) throw error;
    if (!data) throw new Error('No data returned');
    return data[0];
  } catch (error) {
    console.error('Error changing tier status:', error);
    return null;
  }
};

// 5. Try Change Password
export const tryChangePassword = async (userId: string, newPassword: string): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error changing password:', error);
    return false;
  }
};

// 6. Get User Activity by User
export const getUserActivityByUser = async (userId: string): Promise<any[] | null> => {
  try {
    const { data, error } = await supabase.from('user_activity').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    return null;
  }
};

// 7. Get All Content by User
export const getAllContentByUser = async (userId: string): Promise<ContentData[] | null> => {
  try {
    const { data, error } = await supabase.from('content').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user content:', error);
    return null;
  }
};

// 8. Save Content by User
export const saveContentByUser = async (userId: string, contentData: Partial<ContentData>): Promise<ContentData | null> => {
  try {
    const { data, error } = await supabase.from('content').insert({ user_id: userId, ...contentData });
    if (error) throw error;
    if (!data) throw new Error('No data returned');
    return data[0];
  } catch (error) {
    console.error('Error saving content:', error);
    return null;
  }
};

// 9. Pull Template by User Tier Status
export const pullTemplateByUserTierStatus = async (tier: string): Promise<any[] | null> => {
  try {
    const { data, error } = await supabase.from('templates').select('*').eq('tier_status', tier);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return null;
  }
};

// 10. Check if User Can Generate Content
export const checkCanUserGenerateContent = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('users').select('tier_status').eq('id', userId).single();
    if (error) throw error;
    return data?.tier_status !== 'free';
  } catch (error) {
    console.error('Error checking user content generation ability:', error);
    return false;
  }
};

// 11. Register User
export const registerUser = async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { user: data.user, error }
};

// 12. Insert Default Settings
const insertDefaultSettings = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase.from('settings').insert({
      user_id: userId,
      theme: 'light',
      language: 'en',
      tier: 'free'
    });
    if (error) throw error;
  } catch (error) {
    console.error('Error inserting default settings:', error);
  }
};

// 13. Get All User Contents
export const getAllUserContents = async (userId: string): Promise<any[] | null> => {
  try {
    const { data, error } = await supabase
      .from('user_contents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user contents:', error);
    return null;
  }
};

// 14. Get Current User
export const setupAuthListener = () => {
  let currentUser: User | null = null;
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      currentUser = session.user;
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
    }
  });
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Add this new function
export const saveGeneratedContent = async (userId: string, content: string, prompt: string, contentType: string, style: string): Promise<ContentData | null> => {
  try {
    const { data, error } = await supabase.from('user_contents').insert({
      user_id: userId,
      content,
      prompt,
      content_type: contentType,
      style,
      created_at: new Date().toISOString(),
    }).select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.error('No data returned from insert operation');
      return null;
    }

    return data[0];
  } catch (error) {
    console.error('Error saving generated content:', error);
    return null;
  }
};

// Sign In User
export const signInUser = async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { user: data.user, error }
};

// Sign Out User
export const signOutUser = async (): Promise<{ error: any }> => {
  const { error } = await supabase.auth.signOut()
  return { error }
};

// Update User
export const updateUser = async (updates: UserAttributes): Promise<{ user: User | null; error: any }> => {
  const { data, error } = await supabase.auth.updateUser(updates)
  return { user: data.user, error }
};

// Change Password
export const changePassword = async (newPassword: string): Promise<{ user: User | null; error: any }> => {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword })
  return { user: data.user, error }
};

// Delete User Content
export const deleteUserContent = async (contentId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_contents')
      .delete()
      .eq('id', contentId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting user content:', error);
    return false;
  }
};

// Update User Content
export const updateUserContent = async (contentId: string, updates: Partial<ContentData>): Promise<ContentData | null> => {
  try {
    const { data, error } = await supabase
      .from('user_contents')
      .update(updates)
      .eq('id', contentId)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      console.error('No data returned from update operation');
      return null;
    }
    return data[0];
  } catch (error) {
    console.error('Error updating user content:', error);
    return null;
  }
};