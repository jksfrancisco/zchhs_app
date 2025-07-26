import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useCreateEnrollmentStore } from "../../stores/useCreateEnrollmentStore";

const CreateEnrollmentDialog = () => {
  const { registerOpen, setRegisterOpen, studentRows, setStudentRows  } = useCreateEnrollmentStore();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Basic Info", "Family Info", "Learning Preference"];

  const [newStudent, setNewStudent] = React.useState({
    name: "",
    birthDate: "",
    gender: "",
    grade: "",
    previousSchool: "",
    parentName: "",
    contactNumber: "",
    track: "",
    strand: "",
    modeOfLearning: "",
    status: "Pending",
    imageProfile: "",
  });
  
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Student Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Birth Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newStudent.birthDate}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, birthDate: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={newStudent.gender}
                  label="Gender"
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, gender: e.target.value })
                  }
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Grade Level"
                value={newStudent.grade}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, grade: e.target.value })
                }
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Parent/Guardian Name"
                value={newStudent.parentName}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, parentName: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Contact Number"
                value={newStudent.contactNumber}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    contactNumber: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Previous School"
                value={newStudent.previousSchool}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    previousSchool: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Track (SHS only)"
                value={newStudent.track}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, track: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Strand (SHS only)"
                value={newStudent.strand}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, strand: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Mode of Learning</InputLabel>
                <Select
                  value={newStudent.modeOfLearning}
                  label="Mode of Learning"
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      modeOfLearning: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Face-to-Face">Face-to-Face</MenuItem>
                  <MenuItem value="Modular">Modular</MenuItem>
                  <MenuItem value="Online">Online</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={registerOpen} maxWidth="md" fullWidth>
      <DialogTitle>
        Register Student
        <IconButton
          onClick={() => setRegisterOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={3}>{renderStepContent(activeStep)}</Box>
      </DialogContent>
      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={() => setActiveStep((prev) => prev - 1)}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button
            onClick={() => setActiveStep((prev) => prev + 1)}
            variant="contained"
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              const newId = studentRows.length + 1;
              setStudentRows([...studentRows, { id: newId, ...newStudent }]);
              setRegisterOpen(false);
              setActiveStep(0);
              setNewStudent({
                name: "",
                birthDate: "",
                gender: "",
                grade: "",
                previousSchool: "",
                parentName: "",
                contactNumber: "",
                track: "",
                strand: "",
                modeOfLearning: "",
                status: "Pending",
                imageProfile: "",
              });
            }}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateEnrollmentDialog;
