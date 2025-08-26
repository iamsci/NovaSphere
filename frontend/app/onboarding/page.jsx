'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingEntry() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/onboarding/step1');
  }, [router]);

  return null;
}
