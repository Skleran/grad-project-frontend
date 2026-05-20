'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export type FormState = {
  status: 'idle' | 'pending' | 'success' | 'error';
  message: string;
};

export async function submitInquiry(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name') as string;
  const company = formData.get('company') as string;
  const email = formData.get('email') as string;
  const specifics = formData.get('specifics') as string;

  if (!name || !company || !email || !specifics) {
    return {
      status: 'error',
      message: 'All fields are required.',
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('contact_inquiries').insert({
    name,
    company,
    email,
    specifics,
  });

  if (error) {
    console.error('Database insertion error:', error);
    return {
      status: 'error',
      message: 'Could not submit inquiry. Please try again.',
    };
  }

  return {
    status: 'success',
    message: 'Inquiry received successfully.',
  };
}

export async function logIn(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      status: 'error',
      message: 'Email and password are required.',
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }

  redirect('/dashboard');
}

export async function signUp(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  if (!email || !password || !confirmPassword) {
    return {
      status: 'error',
      message: 'All fields are required.',
    };
  }

  if (password !== confirmPassword) {
    return {
      status: 'error',
      message: 'Passwords do not match.',
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }

  redirect('/dashboard');
}

export async function logOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
