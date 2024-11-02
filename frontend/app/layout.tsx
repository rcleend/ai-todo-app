import React from 'react';
import Providers from './providers';

export const metadata = {
  title: 'Interactive To-Do List',
  description: 'A simple interactive to-do list application.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 