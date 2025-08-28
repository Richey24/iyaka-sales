import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Company, User } from "@/utils/validation";

interface UserStore {
    user: User & { companyId: Company } | null;
    isHydrated: boolean;
    setUser: (user: User & { companyId: Company } | null) => void;
    setIsHydrated: (isHydrated: boolean) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isHydrated: false,
            setUser: (user: User & { companyId: Company } | null) => set({ user }),
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