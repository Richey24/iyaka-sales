import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/utils/validation";

interface UserStore {
    user: User | null;
    isHydrated: boolean;
    setUser: (user: User | null) => void;
    setIsHydrated: (isHydrated: boolean) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isHydrated: false,
            setUser: (user: User | null) => set({ user }),
            setIsHydrated: (isHydrated: boolean) => set({ isHydrated }),
        }),
        { 
            name: "user-store",
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setIsHydrated(true)
                }
            }
        }
    )
);