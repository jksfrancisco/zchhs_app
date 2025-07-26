"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { useCreateEmployeeStore } from "../stores/useCreateEmployeeStore";
import CreateNewEmployeeDialog from "./Dialogs/CreateNewEmployeeDialog";

const employees = [
  {
    id: 1,
    name: "Alice Chen",
    role: "HR Manager",
    year: "2024-2025",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Software Engineer",
    year: "2023-2024",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Project Manager",
    year: "2024-2025",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: 4,
    name: "David Lee",
    role: "UI/UX Designer",
    year: "2023-2024",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
  },
  {
    id: 5,
    name: "Emma Davis",
    role: "QA Specialist",
    year: "2024-2025",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 6,
    name: "James Bond",
    role: "DevOps Engineer",
    year: "2024-2025",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 7,
    name: "Sophie Turner",
    role: "Marketing Lead",
    year: "2023-2024",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    id: 8,
    name: "Michael Scott",
    role: "Regional Manager",
    year: "2024-2025",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
  },
];

const schoolYears = ["All", "2024-2025", "2023-2024"];

const Employees = () => {
  const [selectedYear, setSelectedYear] = useState("All");
  const [pageSize, setPageSize] = useState(5);
  const { registerOpen, setRegisterOpen } = useCreateEmployeeStore();

  const filteredEmployees =
    selectedYear === "All"
      ? employees
      : employees.filter((e) => e.year === selectedYear);

  const columns = [
    {
      field: "image",
      headerName: "Photo",
      width: 100,
      sortable: false,

      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={params.value as string}
          alt="Employee"
          width={56}
          height={56}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "year", headerName: "School Year", flex: 1 },
  ];

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Employee Master List
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
          <FormControl size="small">
            <InputLabel>School Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="School Year"
              sx={{ minWidth: 160 }}
            >
              {schoolYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRegisterOpen(true)}
          >
            + Create New Employee
          </Button>
        </Box>
      </Box>
      {/* Description */}
      <Typography variant="body2" gutterBottom>
        Meet the dedicated professionals behind Zamboanga Chong Hua High School.
      </Typography>
      {/* DataGrid */}
      <Box
        sx={{
          height: "calc(100vh - 220px)",
          width: "100%",
          position: "relative",
          mt: 3,
        }}
      >
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          pagination
          disableSelectionOnClick
          sx={{
            // "& .MuiDataGrid-columnHeaders": {
            //   backgroundColor: "primary.main",
            //   color: "white",
            // },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />
      </Box>

      {registerOpen && <CreateNewEmployeeDialog />}
    </Box>
  );
};

export default Employees;
