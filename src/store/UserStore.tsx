import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { fetchCurrentUser, fetchUsers } from "../api/api";

interface UserState {
  setAuthenticated: (value: boolean) => void;
  authenticated: boolean | null;
  users: { id: string; email: string }[];
  currentUser: { id: string; username: string };
  fetchUsers: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  addUser: (newUser: { id: string; email: string }) => void;
  removeUser: (userId: string) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        currentUser: { id: "", username: "" },
        authenticated: null,
        fetchUsers: async () => {
          try {
            const users = await fetchUsers();
            set({ users });
          } catch (error) {}
        },
        fetchCurrentUser: async () => {
          try {
            const currentUser = await fetchCurrentUser();
            set({ currentUser });
          } catch (error) {}
        },
        setAuthenticated: (value) => set({ authenticated: value }),
        addUser: (newUser) => {
          set((state) => ({
            users: [...state.users, newUser],
          }));
        },
        removeUser: (userId) => {
          set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
          }));
        },
      }),
      { name: "userStore" }
    )
  )
);
