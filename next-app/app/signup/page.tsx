import BgGradient from '@/components/bg-gradient';
import ReturnButton from '@/components/return-button';
import { SignupForm } from '@/components/signup-form';

export default function SignupPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <BgGradient />

      <div className="absolute top-0 left-0 m-6 flex z-1">
        <ReturnButton />
      </div>

      <div className="w-full max-w-sm md:max-w-4xl z-1">
        <SignupForm />
      </div>
    </div>
  );
}
