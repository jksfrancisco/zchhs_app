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
import SignatureCanvas from "react-signature-canvas";

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
  profileImage?: string;
}

const CreateNewEmployeeDialog = () => {
  const { registerOpen, setRegisterOpen, employeeRow, setEmployeeRow } =
    useCreateEmployeeStore();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    "Personal Information",
    "Contact Information",
    "Government Information",
  ];

  const [newEmployee, setNewEmployee] = React.useState<Employee>({
    idNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    staffChiName: "",
    birthDate: "",
    birthPlace: "",
    sex: "",
    address: "",
    telNumber: "",
    cellNumber: "",
    contactPerson: "",
    contactAddress: "",
    contactNumber: "",
    sssNumber: "",
    philHealth: "",
    tin: "",
    sssCoverage: "",
    profileImage: "",
  });

  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const generateId = () => {
    const newId = `EMP-${Date.now()}`;
    setNewEmployee({ ...newEmployee, idNumber: newId });
  };

  // Inside state
  const [signatureImage, setSignatureImage] = React.useState<
    string | undefined
  >(undefined);
  const sigPadRef = React.useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    sigPadRef.current?.clear();
    setSignatureImage(undefined);
  };

  const saveSignature = () => {
    if (!sigPadRef.current || sigPadRef.current.isEmpty()) return;

    try {
      const dataURL = sigPadRef.current.getCanvas().toDataURL("image/png");
      setSignatureImage(dataURL);
      setNewEmployee((prev) => ({
        ...prev,
        signature: dataURL,
      }));
      console.log("dataURL: ", dataURL)
    } catch (error) {
      console.error("Signature save failed:", error);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setSignatureImage(reader.result as string);
    setNewEmployee((prev) => ({
      ...prev,
      signature: reader.result as string,
    }));

    // reset input value so same file can be selected again
    if (e.target) e.target.value = "";
  };
  reader.readAsDataURL(file);
};

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview locally
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to backend that saves to /assets/images/employees
    const formData = new FormData();
    formData.append("profileImage", file);

    // try {
    //   const res = await fetch("http://localhost:8000/api/upload-employee-image", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!res.ok) throw new Error("Image upload failed");

    //   const data = await res.json();
    //   // Assuming backend returns { filePath: '/assets/images/employees/filename.jpg' }
    //   setNewEmployee((prev) => ({
    //     ...prev,
    //     profileImage: data.filePath,
    //   }));
    // } catch (error) {
    //   console.error("Upload error:", error);
    // }
  };
  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return (
          newEmployee.idNumber.trim() !== "" &&
          newEmployee.firstName.trim() !== "" &&
          newEmployee.lastName.trim() !== "" &&
          newEmployee.birthDate.trim() !== "" &&
          newEmployee.birthPlace.trim() !== "" &&
          newEmployee.sex.trim() !== ""
        );
      case 1:
        return (
          newEmployee.address.trim() !== "" &&
          newEmployee.cellNumber.trim() !== "" &&
          newEmployee.contactPerson.trim() !== "" &&
          newEmployee.contactAddress.trim() !== "" &&
          newEmployee.contactNumber.trim() !== ""
        );
      case 2:
        return (
          newEmployee.sssNumber.trim() == "" &&
          newEmployee.philHealth.trim() == "" &&
          newEmployee.tin.trim() == "" &&
          newEmployee.sssCoverage.trim() == ""
        );
      default:
        return false;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            {/* Profile Image Upload */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    style={{
                      width: "100%",
                      maxHeight: 250,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                ) : (
                  <Box
                    width="100%"
                    height={250}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px dashed gray"
                    borderRadius={2}
                    mb={1}
                  >
                    No image selected
                  </Box>
                )}
                <Button variant="outlined" component="label" size="small">
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
            </Grid>
            {/* Signature Capture */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
              >
                {signatureImage ? (
                  <img
                    src={signatureImage}
                    alt="Signature Preview"
                    style={{
                      width: "100%",
                      maxHeight: 250,
                      objectFit: "contain",
                      border: "1px solid gray",
                      borderRadius: 4,
                      marginBottom: 8,
                      background: "white",
                    }}
                  />
                ) : (
                  <SignatureCanvas
                    ref={sigPadRef}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 250,
                      className: "sigCanvas",
                      style: { border: "1px dashed gray", borderRadius: 4 },
                    }}
                  />
                )}
                <Box mt={1} display="flex" gap={1}>
                  {!signatureImage && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={saveSignature}
                    >
                      Save Signature
                    </Button>
                  )}
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={clearSignature}
                  >
                    Clear
                  </Button>
                  <Button variant="outlined" component="label" size="small">
                    Upload Signature
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleSignatureUpload}
                    />
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="ID Number"
                value={newEmployee.idNumber}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={generateId}
                      size="small"
                      variant="outlined"
                    >
                      Generate
                    </Button>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Staff ChiName"
                value={newEmployee.staffChiName}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    staffChiName: e.target.value,
                  })
                }
              />
            </Grid>
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
                label="Middle Name (Optional)"
                value={newEmployee.middleName}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, middleName: e.target.value })
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
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="Birthdate"
                InputLabelProps={{ shrink: true }}
                value={newEmployee.birthDate}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, birthDate: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Birth Place"
                value={newEmployee.birthPlace}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, birthPlace: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
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
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                value={newEmployee.address}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, address: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Tel Number"
                value={newEmployee.telNumber}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, telNumber: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Cell Number"
                value={newEmployee.cellNumber}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, cellNumber: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Contact Person"
                value={newEmployee.contactPerson}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    contactPerson: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="Contact Address"
                value={newEmployee.contactAddress}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    contactAddress: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Contact Number"
                value={newEmployee.contactNumber}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    contactNumber: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="SSS Number"
                value={newEmployee.sssNumber}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, sssNumber: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="Phil Health"
                value={newEmployee.philHealth}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, philHealth: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="TIN"
                value={newEmployee.tin}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, tin: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="SSS Coverage"
                value={newEmployee.sssCoverage}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    sssCoverage: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    setEmployeeRow([...employeeRow, newEmployee]);
    setRegisterOpen(false);
    setActiveStep(0);
    setNewEmployee({
      idNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      staffChiName: "",
      birthDate: "",
      birthPlace: "",
      sex: "",
      address: "",
      telNumber: "",
      cellNumber: "",
      contactPerson: "",
      contactAddress: "",
      contactNumber: "",
      sssNumber: "",
      philHealth: "",
      tin: "",
      sssCoverage: "",
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
            disabled={!isStepValid()}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isStepValid()}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewEmployeeDialog;
