import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useCreateEnrollmentStore } from "./stores/useCreateEnrollmentStore";
import { mockElementaryStudents } from "./stores/useMockElementaryStudents";
import { mockJuniorHighStudents } from "./stores/useMockJuniorHighStudents";
import { mockPreSchoolStudents } from "./stores/useMockPreSchoolStudents";
import { mockSeniorHighStudents } from "./stores/useMockSeniorHighStudents";
import CreateEnrollmentDialog from "./components/Dialogs/CreateEnrollmentDialog";
import { useStudentsHooks } from "./hooks/useStudentsHooks";

type StudentsStatus = "Enrolled" | "Pending" | "Not Enrolled";

const Students = () => {
  const StudentsStatus: StudentsStatus = "Not Enrolled";
  const router = useRouter();

  const getStatusColor = (
    status: StudentsStatus
  ): "success" | "warning" | "default" => {
    const colors: Record<StudentsStatus, "success" | "warning" | "default"> = {
      Enrolled: "success",
      Pending: "warning",
      "Not Enrolled": "default",
    };
    return colors[status];
  };
  const { students } = useStudentsHooks();
  console.log("students: ", students);

  const getActionLabel = (status: StudentsStatus): string => {
    const actions: Record<StudentsStatus, string> = {
      Enrolled: "Application Approved",
      Pending: "View Application",
      "Not Enrolled": "Begin Enrollment",
    };
    return actions[status];
  };

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const { registerOpen, setRegisterOpen, studentRows, setStudentRows } =
    useCreateEnrollmentStore();
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  React.useEffect(() => {
    if (!level) return;

    switch (level) {
      case "preschool":
        setStudentRows(mockPreSchoolStudents);
        break;
      case "elementary":
        setStudentRows(mockElementaryStudents);
        break;
      case "junior-high":
        setStudentRows(mockJuniorHighStudents);
        break;
      case "senior-high":
        setStudentRows(mockSeniorHighStudents);
        break;
      default:
        setStudentRows([]);
    }
  }, [level, setStudentRows]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Student Name", width: 200, flex: 1 },
    { field: "gender", headerName: "Gender", width: 80, flex: 1 },
    { field: "grade", headerName: "Grade Level", width: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value as StudentsStatus)}
        />
      ),
    },
  ];

  const schoolYears = ["2024-2025", "2023-2024"];
  const [selectedYear, setSelectedYear] = React.useState("2024-2025"); // set current school year

  return (
    <>
      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {level && (
          <Button variant="outlined" onClick={() => router.push(`/students`)}>
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </Button>
        )}

        <Typography variant="h4" fontWeight={600}>
          {level ? `${level.toUpperCase()}` : "Select a Student Level"}
        </Typography>

        {level && (
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
            <Button variant="contained" onClick={() => setRegisterOpen(true)}>
              {getActionLabel(StudentsStatus)}
            </Button>
          </Box>
        )}
      </Box>

      {!level ? (
        <>
          {/* Description */}
          <Typography variant="body2" gutterBottom mt={1}>
            View and manage students based on their current academic level —
            from Preschool to Senior High School.
          </Typography>

          <Grid container spacing={3} mt={3}>
            {[
              {
                label: "Preschool",
                avatar: "/assets/images/icons/pre.png",
              },
              {
                label: "Elementary",
                avatar: "/assets/images/icons/elem.png",
              },
              {
                label: "Junior High",
                avatar: "/assets/images/icons/jhs.png",
              },
              {
                label: "Senior High",
                avatar: "/assets/images/icons/shs.png",
              },
            ].map((levelCard, index) => (
              <Grid size={{ xs: 12, md: 3 }} key={index}>
                <Box
                  onClick={() =>
                    router.push(
                      `?level=${levelCard.label.toLowerCase().replace(" ", "-")}`
                    )
                  }
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    height: "100%",
                    boxShadow: 4,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: "background.paper",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: 8,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={levelCard.avatar}
                    alt={levelCard.label}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" fontWeight={700}>
                    {levelCard.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tap to view {levelCard.label.toLowerCase()} students
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            height: "calc(100vh - 168px)",
            width: "100%",
            position: "relative",
          }}
        >
          <DataGrid
            rows={studentRows}
            columns={columns}
            page={paginationModel.page}
            onPageChange={(newPage) =>
              setPaginationModel((prev) => ({ ...prev, page: newPage }))
            }
            pageSize={paginationModel.pageSize}
            onPageSizeChange={(newPageSize) =>
              setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }))
            }
            rowsPerPageOptions={[10, 25, 50]}
            pagination
            onRowClick={(params) => {
              router.push(`/students/${params.id}?level=${level}`);
            }}
            sx={{ borderRadius: 2, position: "absolute", width: "100%" }}
          />
        </Box>
      )}

      {registerOpen && <CreateEnrollmentDialog />}
    </>
  );
};

export default Students;
