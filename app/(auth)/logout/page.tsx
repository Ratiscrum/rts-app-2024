'use client';

import { useUserContext } from '@/lib/providers/user-provider';
import { useEffect } from 'react';

export default function Logout() {
  const { logout } = useUserContext();

  useEffect(() => {
    logout();
  });
}
