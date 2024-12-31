import React from 'react';
import clsx from 'clsx';
import Sheet from '../feature/Sheet/Sheet';


export default function Workspace ({
  children,
  className,
  selectedItem,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
    selectedItem?: string;
}>) {
    
  return (
    <main
      className={clsx(
        'flex flex-col gap-4 p-4',
        className,
      )}
    >
        <h1>{selectedItem}</h1>
      {selectedItem === 'Sheet' && <Sheet>{children}</Sheet>}
    </main>
  );
}