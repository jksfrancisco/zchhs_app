import { create } from "zustand";

interface Employee {
  idNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  staffChiName: string;
  birthDate: string;
  birthPlace: string;
  sex: string;
  address: string;
  telNumber: string;
  cellNumber: string;
  contactPerson: string;
  contactAddress: string;
  contactNumber: string;
  sssNumber: string;
  philHealth: string;
  tin: string;
  sssCoverage: string;
}

interface CreateEmployeeState {
  registerOpen: boolean;
  setRegisterOpen: (open: boolean) => void;
  employeeRow: Employee[];
  setEmployeeRow: (rows: Employee[]) => void;
}

export const useCreateEmployeeStore = create<CreateEmployeeState>((set) => ({
  registerOpen: false,
  employeeRow: [],
  setRegisterOpen: (open) => set({ registerOpen: open }),
  setEmployeeRow: (rows) => set({ employeeRow: rows }),
}));
