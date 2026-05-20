'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';
import { FormState, submitInquiry } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialState: FormState = {
  status: 'idle',
  message: '',
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState,
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();

      const successTimer = setTimeout(() => {
        setShowSuccess(true);
      }, 0);

      const hideTimer = setTimeout(() => {
        setShowSuccess(false);
      }, 4500);

      return () => {
        clearTimeout(successTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [state.status]);

  if (showSuccess) {
    // success state
    return (
      <div className="w-full max-w-2xl min-h-140 mx-auto flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500">
        <div className="relative flex items-center justify-center size-24 mb-8">
          <div className="absolute inset-0 rounded-full border border-helion-green/20 animate-[ping_3s_ease-in-out_infinite]" />
          <div className="absolute inset-2 rounded-full border border-helion-green/40 animate-[ping_3s_ease-in-out_infinite] delay-1500" />
          <div className="absolute inset-4 rounded-full border border-helion-green/60 flex items-center justify-center bg-helion-green/10">
            <Check className="size-6 text-helion-green stroke-3" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Inquiry Received.
        </h2>
        <p className="text-muted-foreground text-lg">
          Our engineers will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Initialize Deployment
        </h2>
        <p className="text-muted-foreground">
          Connect with our engineering team to spec a tracking solution for your
          next utility-scale project.
        </p>
      </div>

      <form
        ref={formRef}
        action={formAction}
        className="w-full flex flex-col gap-6"
      >
        {/* name and company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2.5">
            <Label
              htmlFor="name"
              className="text-xs text-muted-foreground uppercase tracking-wider"
            >
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="h-12"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label
              htmlFor="company"
              className="text-xs text-muted-foreground uppercase tracking-wider"
            >
              Company
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              required
              placeholder="Acme Energy"
              className="h-12"
            />
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col gap-2.5">
          <Label
            htmlFor="email"
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Work Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@acme.com"
            className="h-12"
          />
        </div>

        {/* project specifics */}
        <div className="flex flex-col gap-2.5">
          <Label
            htmlFor="specifics"
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Project Specifics
          </Label>
          <Textarea
            id="specifics"
            name="specifics"
            required
            rows={4}
            placeholder="Estimated MW capacity, location, timeline..."
            className="min-h-30 resize-none"
          />
        </div>

        {/* button */}
        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-helion-green text-black font-semibold hover:bg-helion-green/90 focus-visible:ring-helion-green/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all text-base"
        >
          {isPending ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Submit Inquiry
              <Send className="size-4 ml-1" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
