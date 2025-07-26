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
import { useCreateEmployeeStore } from "../../stores/useCreateEmployeeStore";

// Define the Employee interface
interface Employee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
}

const CreateNewEmployeeDialog = () => {
  const { registerOpen, setRegisterOpen, employeeRow, setEmployeeRow } =
    useCreateEmployeeStore();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Personal Information"];

  const [newEmployee, setNewEmployee] = React.useState<Omit<Employee, "id">>({
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
  });

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="First Name"
                value={newEmployee.firstName}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Middle Name"
                value={newEmployee.middleName}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    middleName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Last Name"
                value={newEmployee.lastName}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  value={newEmployee.sex}
                  label="Sex"
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, sex: e.target.value })
                  }
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    const newId = employeeRow.length + 1;
    const employee: Employee = { id: newId, ...newEmployee };
    setEmployeeRow([...employeeRow, employee]);
    setRegisterOpen(false);
    setActiveStep(0);
    setNewEmployee({
      firstName: "",
      middleName: "",
      lastName: "",
      sex: "",
    });
  };

  return (
    <Dialog open={registerOpen} maxWidth="md" fullWidth>
      <DialogTitle>
        Register Employee
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
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewEmployeeDialog;
