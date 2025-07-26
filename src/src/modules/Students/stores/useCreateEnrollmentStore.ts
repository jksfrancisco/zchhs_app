import { create } from "zustand";


interface Student {
  id: number;
  name: string;
  grade: string;
  gender: string;
  status: string;
  imageProfile: string;
}

interface CreateEnrollment {
  registerOpen: boolean;
  setRegisterOpen: (registerOpen: boolean) => void;
  studentRows: Student[];
  setStudentRows: (studentRows: Student[]) => void;
}

export const useCreateEnrollmentStore = create<CreateEnrollment>()(
  (set) => ({
    registerOpen: false,
    studentRows: [],
    setRegisterOpen: (registerOpen: boolean) => {
      set({ registerOpen });
    },
    setStudentRows: (studentRows: Student[]) => {
      set({ studentRows });
    },
  })
);
