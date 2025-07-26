"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

import NotFound from "@/pages/404";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import VerifiedIcon from "@mui/icons-material/Verified";
import { mockJuniorHighStudents } from "../stores/useMockJuniorHighStudents";
import { mockPreSchoolStudents } from "../stores/useMockPreSchoolStudents";
import { mockElementaryStudents } from "../stores/useMockElementaryStudents";
import { mockSeniorHighStudents } from "../stores/useMockSeniorHighStudents";
import React from "react";

type Props = {
  id: string;
};

const mockScores = [
  { term: "Q1", score: 87 },
  { term: "Q2", score: 90 },
  { term: "Q3", score: 85 },
  { term: "Q4", score: 92 },
];

const mockSubjects = [
  { subject: "Math", teacher: "Mr. Reyes", grade: "A" },
  { subject: "Science", teacher: "Ms. Tan", grade: "B+" },
  { subject: "English", teacher: "Mr. Lee", grade: "A-" },
  { subject: "Filipino", teacher: "Mrs. Santos", grade: "B" },
];

export default function StudentProfile({ id }: Props) {
  const searchParams = useSearchParams();
  const level = searchParams.get("level") ?? "";

  const getStudentDataByLevel = () => {
    switch (level) {
      case "preschool":
        return mockPreSchoolStudents;
      case "elementary":
        return mockElementaryStudents;
      case "junior-high":
        return mockJuniorHighStudents;
      case "senior-high":
        return mockSeniorHighStudents;
      default:
        return [];
    }
  };

  const router = useRouter();
  const studentId = parseInt(id, 10);
  const student = getStudentDataByLevel().find((s) => s.id === studentId);

  const trimmedName = student?.name.replace(/\s*\([^)]*\)/g, "");

  const [showTrimmed, setShowTrimmed] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowTrimmed(window.scrollY > 150); // adjust threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!student) return NotFound();

  const statusChip = (
    <Chip
      label={student.status}
      icon={
        student.status === "Enrolled" ? (
          <VerifiedIcon />
        ) : student.status === "Pending" ? (
          <PendingIcon />
        ) : (
          <CancelIcon />
        )
      }
      color={
        student.status === "Enrolled"
          ? "success"
          : student.status === "Pending"
            ? "warning"
            : "default"
      }
      variant="outlined"
    />
  );

  return (
    <Box>
      {/* Sticky Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 85.1,
          zIndex: 1,
        }}
      >
        <Button
          onClick={() => router.push(`/students?level=${level}`)}
          variant="outlined"
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} />
        </Button>

        <AnimatePresence mode="wait">
          <motion.div
            key={showTrimmed ? "trimmed" : "full"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "1.25rem",
                  sm: "1.5rem",
                  md: "2rem",
                },
              }}
            >
              {showTrimmed ? trimmedName : student?.name}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Profile Card */}
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4, mt: 3 }}>
        <Grid container spacing={4}>
          {/* Avatar + Name + Status */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                sx={{
                  width: "80%",
                  height: "80%",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Image
                    src={student.imageProfile}
                    alt="Student Photo"
                    width={300}
                    height={300}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    priority
                  />
                </Box>
              </Box>

              <Typography variant="h6" mt={1}>
                {student?.name}
              </Typography>
              {statusChip}
            </Box>
          </Grid>

          {/* Profile Details */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={2}>
              {/* Column 1 */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  LRN
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  123456789012
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Birthdate
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  January 15, 2010
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Citizenship
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  Filipino
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Religion
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  Roman Catholic
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Home Address
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  123 Mabini St., Cebu City, Philippines
                </Typography>
              </Grid>

              {/* Column 2 */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Gender
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {student.gender}
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Grade Level
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {student.grade}
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Date of Enrollment
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  July 1, 2025
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Adviser
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  Mrs. Anna Mendoza
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Email Address
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  student@example.com
                </Typography>
              </Grid>

              {/* Column 3 */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Parent/Guardian
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  Mr. Zhang Wei
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Contact Number
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  0917-123-4567
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Emergency Contact
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  0918-999-8888
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Blood Type
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  O+
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Medical Notes
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  Allergic to peanuts. Uses asthma inhaler.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Chart Section */}
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Academic Performance
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mockScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="term" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#1976d2"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Table Section */}
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Subjects Enrolled
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSubjects.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.teacher}</TableCell>
                <TableCell>{row.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
