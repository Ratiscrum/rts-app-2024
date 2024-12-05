'use client';

import { useUserContext } from '@/lib/providers/user-provider';
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return <></>;
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-full max-w-md rounded-lg bg-secondary p-6 shadow-md">
        <div className="mb-4 flex items-center justify-center">
          <Avatar className="cursor-pointer border-2 border-white">
            <AvatarImage
              src="https://placekitten.com/40/40"
              alt="User Avatar"
            />
            <AvatarFallback>{user.fullName.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="mb-2 text-center text-2xl font-semibold">
          {user.fullName}
        </h1>
        <p className="mb-4 text-center text-secondary-foreground">
          {user.email}
        </p>
        <div className="flex justify-center">
          <Button className="ml-2">Miam du fromage...</Button>
        </div>
      </div>
    </div>
  );
}
