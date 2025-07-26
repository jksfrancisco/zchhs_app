import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const gradeData = [
    { name: "Grade 1", students: 120 },
    { name: "Grade 2", students: 98 },
    { name: "Grade 3", students: 86 },
    { name: "Grade 4", students: 99 },
    { name: "Grade 5", students: 110 },
  ];

  const enrollmentData = [
    { month: "Jan", enrollments: 30 },
    { month: "Feb", enrollments: 45 },
    { month: "Mar", enrollments: 60 },
    { month: "Apr", enrollments: 55 },
    { month: "May", enrollments: 70 },
  ];

  const performanceData = [
    { term: "Q1", average: 85 },
    { term: "Q2", average: 82 },
    { term: "Q3", average: 88 },
    { term: "Q4", average: 91 },
  ];

  const genderData = [
    { name: "Male", value: 400 },
    { name: "Female", value: 300 },
    { name: "Others", value: 50 },
  ];

  const COLORS = ["#4e73df", "#1cc88a", "#f6c23e"];

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={4}>
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={4} mb={4}>
        {[
          { title: "Pre-School", query: "level=preschool" },
          { title: "Elementary", query: "level=elementary" },
          { title: "Junior High School", query: "level=junior-high" },
          { title: "Senior High School", query: "level=senior-high" },
        ].map(({ title}) => (
          <Grid key={title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{title}</Typography>
                  <Typography color="text.secondary">
                    View {title.toLowerCase()} student data.
                  </Typography>
                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Visualizations */}
      <Grid container spacing={4}>
        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Students per Grade
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#4e73df" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Gender Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Line Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Enrollments
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="enrollments" stroke="#1cc88a" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Area Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <XAxis dataKey="term" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
