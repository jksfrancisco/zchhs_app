import { create } from "zustand";


interface Employee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
}

interface CreateEnrollment {
  registerOpen: boolean;
  setRegisterOpen: (registerOpen: boolean) => void;
  employeeRow: Employee[];
  setEmployeeRow: (employeeRow: Employee[]) => void;
}

export const useCreateEmployeeStore = create<CreateEnrollment>()(
  (set) => ({
    registerOpen: false,
    employeeRow: [],
    setRegisterOpen: (registerOpen: boolean) => {
      set({ registerOpen });
    },
    setEmployeeRow: (employeeRow: Employee[]) => {
      set({ employeeRow });
    },
  })
);
