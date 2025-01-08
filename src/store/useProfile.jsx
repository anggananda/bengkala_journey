import { create } from "zustand";

const useProfile = create((set) => ({
  profile: {
    photoProfile: "./upload/default-profile.jpg",
  },
  updatePhotoProfile: (photo) =>
    set((state) => ({
      profile: {
        ...state.profile,
        photoProfile: photo,
      },
    })),
}));

export default useProfile;
