import { api } from "./client";
import type { User } from "../types";

type RawUser = { _id: string; name: string; email: string; phone: string; address: string };

const toUser = (u: RawUser): User => ({
  id: u._id,
  name: u.name,
  email: u.email,
  phone: u.phone,
  address: u.address,
});

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}) => {
  const res = await api.post<{ message: string }>("/auth/register", data);
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post<{ message: string; token: string; user: User }>(
    "/auth/login",
    { email, password }
  );
  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await api.get<{ user: RawUser }>("/auth/profile");
  return toUser(res.data.user);
};
