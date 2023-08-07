import { Student, Teacher } from '@prisma/client';
import { useState, useEffect } from 'react';

export type User = Teacher | Student;

export const dummyUser = {
  firstName: '',
  lastName: '',
  email: '',
  id: '',
  avatar: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const useUser = () => {
  const [user, setUser] = useState(dummyUser);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) setUser(JSON.parse(user));
  }, []);

  return user;
};

export default useUser;
