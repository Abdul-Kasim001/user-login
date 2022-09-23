import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Employee.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Employee() {
  useEffect(() => {
    addDataList();
  }, []);

  const addDataList = (id) => {
    axios.get(`http://localhost:8000/employee/api/get`).then((resp) => {
      
      setDetails(resp.data);
    });
  };

  const deleteData = (id) => {
    axios.delete(`http://localhost:8000/employee/delete/users/${id}`).then((res) => {
      addDataList();
    });
  };

  const updateData = async () => {
    const userDetails = {
      id: id,
      Name: Name,
      Emailid: Emailid,
      Technology: Technology,
      Range: Range,
      DateofJoining: DateofJoining,
      DateofRelieving: DateofRelieving,
      Designation: Designation,
    };
    axios
      .put(`http://localhost:8000/employee/api/users/${id}`, userDetails)
      .then((res) => {
        addDataList(id);
        handleOff();
      });
  };

  const handleEditSubmit = async () => {
    const userDetails = {
      id: id,
      Name: Name,
      Emailid: Emailid,
      Technology: Technology,
      Range: Range,
      DateofJoining: DateofJoining,
      DateofRelieving: DateofRelieving,
      Designation: Designation,
    };

    await axios
      .post(`http://localhost:8000/employee/api/create`, userDetails)
      .then((res) => {
        console.log('test :>> ', res.data);
        addDataList();
        handleOff();
      });
  };
  const submit = (id) => {
    confirmAlert({
      title: "Be Alert",
      buttons: [
        {
          label: "yes",
          onClick: () => {
            deleteData(id);
          },
        },
        {
          label: "no",
        },
      ],
    });
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [dailogval, setDailogval] = useState([]);
  const [view, setView] = useState(false);
  const handleOpen = () => {
    setView(true);
  };
  const Close = () => {
    setView(false);
  };
  const [inputList, setInputList] = useState([{ Technology: "", range: "" }]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    const add = [...inputList, {}];
    setInputList(add);
  };

  const handleModalProps = (id) => {
    const filterVal = details.filter((e) => {
      return e.id === id;
    });

    setDailogval(filterVal[0]);
  };

  const [details, setDetails] = useState("");
  const [Name, setName] = useState("");
  const [Emailid, setEmailid] = useState("");
  const [Technology, setTechnology] = useState("");
  const [Range, setRange] = useState("");
  const [DateofJoining, setDateofJoining] = useState(new Date());
  const [DateofRelieving, setDateofRelieving] = useState(new Date());
  const [Designation, setDesignation] = useState("");
  const [id, setId] = useState(null);

  const handleOff = () => {
    setOpen(false);
    setName("");
    setEmailid("");
    setTechnology("");
    setRange("");
    setDateofJoining();
    setDateofRelieving();
    setDesignation("");
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const columns = [
    { field: "Name", headerName: "Name", width: 140 },
    { field: "Emailid", headerName: "Email-id", width: 140 },
    { field: "Technology", headerName: "Technology", width: 140 },
    { field: "Range", headerName: "Range", width: 140 },
    { field: "DateofJoining", headerName: "Date of Joining", width: 140 },
    { field: "DateofRelieving", headerName: "Date of Relieving", width: 140 },
    { field: "Designation", headerName: "Designation", width: 140 },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      renderCell: () => {
        return (
          <div>
            <Switch {...label} defaultChecked />
          </div>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            <button
              onClick={() => {
                setId(params.row.id);
                setName(params.row.Name);
                setEmailid(params.row.Emailid);
                setTechnology(params.row.Technology);
                setRange(params.row.Range);
                setDateofJoining(params.row.DateofJoining);
                setDateofRelieving(params.row.DateofRelieving);
                setDesignation(params.row.Designation);
                handleClickOpen();
              }}
            >
              <ModeIcon variant="contained" color="success" />
            </button>
            &nbsp;
            <button
              onClick={() => {
                submit(params.row.id);
              }}
            >
              <DeleteIcon variant="contained" color="error" />
            </button>
          </div>
        );
      },
    },
    {
      field: "View",
      headerName: "View",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            <button
              variant="contained"
              color="primary"
              onClick={() => {
                handleOpen();
                handleModalProps(params.row.id);
              }}
            >
              <VisibilityIcon variant="contained" color="primary" />
            </button>

            <Modal
              open={view}
              onClose={Close}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2} columns={16}>
                    <Grid
                      item
                      xs={5}
                      className="heading"
                      style={{ BorderRadius: "none" }}
                    >
                      <Item>Name:</Item>
                      <Item>Emailid:</Item>
                      <Item>Technology:</Item>
                      <Item>Range:</Item>
                      <Item>DateofJoining:</Item>
                      <Item>DateofRelieving:</Item>
                      <Item>Designation:</Item>
                    </Grid>

                    <Grid
                      item
                      xs={7}
                      className="values"
                      style={{ borderRadius: "none" }}
                    >
                      <Item>{dailogval.Name}</Item>
                      <Item> {dailogval.id}</Item>
                      <Item>{dailogval.Technology}</Item>
                      <Item> {dailogval.Range}</Item>
                      <Item> {dailogval.DateofJoining}</Item>
                      <Item>{dailogval.DateofRelieving}</Item>
                      <Item> {dailogval.Designation}</Item>
                    </Grid>
                  </Grid>
                  <Button
                    className="view-button"
                    style={{ float: "top" }}
                    onClick={Close}
                  >
                    <b>X</b>
                  </Button>
                </Box>
              </Box>
            </Modal>
          </div>
        );
      },
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const validationSchema = Yup.object({
    Name: Yup.string().required("Required"),
    Emailid: Yup.string().required("Required"),
    Technology: Yup.string().required("Required"),
    DateofJoining: Yup.string().required("Required"),
    DateofRelieving: Yup.string().required("Required"),
    Designation: Yup.string().required("Required"),
    Range: Yup.string().required("Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Name: Name,
      Emailid: Emailid,
      Technology: Technology,
      DateofJoining: DateofJoining,
      DateofRelieving: DateofRelieving,
      Range: Range,
      Designation: Designation,
    },
    validationSchema,
    onSubmit() {
      if (id === null) {
        handleEditSubmit();
      } else {
        updateData();
      }
    },
  });
  return (
    <div
      className="header"
      style={{
        height: "60vh",
        marginLeft: "20%",
        backgroundColor: "#f0f2f5",
        marginTop: "-3%",
        marginRight: "1%",
      }}
    >
      <h3
        style={{
          padding: "15px",
          marginLeft: "2%",
          fontSize: "20px",
          fontFamily: "Times New Roman",
          position: "relative",
          top: "25px",
        }}
      >
        Employee Details :
      </h3>
      <Button
        variant="outlined"
        style={{ marginLeft: "85%", marginTop: "-5%" }}
        onClick={handleClickOpen}
      >
        + Add Employee
      </Button>

      <Dialog open={open} onClose={handleOff}>
        <DialogTitle variant="contained" color="primary">
          Employee Details
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="Name"
            autoComplete="off"
            type="text"
            fullWidth
            variant="standard"
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            onChange={(e) => {
              setName(e.target.value);
              formik.setFieldValue("Name", e.target.value);
            }}
          />
          {formik.touched.Name && formik.errors.Name && (
            <p className="mb-0" style={{ color: "#df5757", marginTop: "0px" }}>
              {formik.errors.Name}
            </p>
          )}
          <TextField
            margin="dense"
            label="Email-id"
            name="Emailid"
            fullWidth
            variant="standard"
            onBlur={formik.handleBlur}
            value={formik.values.Emailid}
            onChange={(e) => {
              setEmailid(e.target.value);
              formik.setFieldValue("Emailid", e.target.value);
            }}
          />
          {formik.touched.Emailid && formik.errors.Emailid && (
            <p className="mb-0" style={{ color: "#df5757", marginTop: "0px" }}>
              {formik.errors.Emailid}
            </p>
          )}
          <br />
          {inputList.map((x, i) => {
            return (
              <div>
                <br />
                <TextField
                  id="outlined-basic"
                  name="Technology"
                  label="Technology"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  value={formik.values.Technology}
                  onChange={(e) => {
                    formik.setFieldValue("Technology", e.target.value);
                    setTechnology(e.target.value);
                  }}
                />
                {formik.touched.Technology && formik.errors.Technology && (
                  <p
                    className="mb-0"
                    style={{ color: "#df5757", marginTop: "0px" }}
                  >
                    {formik.errors.Technology}
                  </p>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl>
                  <InputLabel
                    id="demo-simple-select-label"
                    value={x.firstName}
                    onChange={(e) => handleInputChange(e, i)}
                  >
                    {" "}
                    Range
                  </InputLabel>
                  <Select
                    style={{ width: "180px" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="Range"
                    label="Range"
                    onBlur={formik.handleBlur}
                    value={formik.values.Range}
                    onChange={(e) => {
                      setRange(e.target.value);
                      formik.setFieldValue("Range", e.target.value);
                    }}
                  >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.Range && formik.errors.Range && (
                  <p
                    className="mb-0"
                    style={{ color: "#df5757", marginTop: "0px" }}
                  >
                    {formik.errors.Range}
                  </p>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {inputList.length !== 1 && (
                  <button
                    style={{
                      width: "14%",
                      padding: "10px",
                      backgroundColor: "#ff0000ad",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                    }}
                    onClick={() => handleRemoveClick(i)}
                  >
                    Remove
                    <br />{" "}
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button
                    style={{
                      width: "14%",
                      padding: "10px",
                      backgroundColor: "#008000b5",
                      marginTop: "5px",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                    }}
                    onClick={handleAddClick}
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Joining"
              name="DateofJoining"
              value={DateofJoining}
              onChange={(newValue) => {
                setDateofJoining(newValue);
              }}
              renderInput={(ele) => <TextField {...ele} />}
            />
          </LocalizationProvider>
          &nbsp;
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Relieving"
              value={DateofRelieving}
              onChange={(newValue) => {
                setDateofRelieving(newValue);
              }}
              renderInput={(e) => <TextField {...e} />}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            name="Designation"
            label="Designation"
            fullWidth
            variant="standard"
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.Designation}
            onChange={(e) => {
              setDesignation(e.target.value);
              formik.setFieldValue("Designation", e.target.value);
            }}
          />
          {formik.touched.Designation && formik.errors.Designation && (
            <p className="mb-0" style={{ color: "#df5757", marginTop: "0px" }}>
              {formik.errors.Designation}
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button open={handleClose} onClick={handleOff}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              formik.handleSubmit();
              handleClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={details}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
