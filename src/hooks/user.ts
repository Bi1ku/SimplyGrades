import { Student, Teacher } from '@prisma/client';
import { useState, useEffect } from 'react';

export type User = Teacher | Student;

export const dummyUser = {
  firstName: '',
  lastName: '',
  email: '',
  id: '',
  avatar: '',
};

const useUser = (): User => {
  const [user, setUser] = useState(dummyUser);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) setUser(JSON.parse(user));
  }, []);

  return user as User;
};

export default useUser;
