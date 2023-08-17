import React from 'react';

export default function Exist({
  data,
  placeholder,
  children,
}: {
  data: boolean;
  placeholder: React.ReactNode;
  children: React.ReactNode;
}) {
  console.log(data);
  return data ? placeholder : children;
}
