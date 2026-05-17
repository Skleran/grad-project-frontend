'use server';

export type FormState = {
  status: 'idle' | 'pending' | 'success' | 'error';
  message: string;
};

export async function submitInquiry(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name');
  const company = formData.get('company');
  const email = formData.get('email');
  const specifics = formData.get('specifics');

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    status: 'success',
    message: 'Inquiry received successfully.',
  };
}
