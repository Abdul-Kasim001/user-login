import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./Client.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { confirmAlert } from "react-confirm-alert";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css";
import { TextareaAutosize } from "@mui/material";
import Api from "../Api";

function Client() {
  // database function

  useEffect(() => {
    addClient();
  }, []);

  const handleFormSubmit = async () => {
    const userDetails = {
      companyname: companyname,
      companyaddress: companyaddress,
      PanNumber: PanNumber,
      GSTNo: GSTNo,
      contactPersonnumber: contactPersonnumber,
      contactpersonname: contactpersonname,
      purpose: purpose,
      projectstatus: projectstatus,
      description: description,
    };
    await Api.post(`/client/api/create`, userDetails)
      .then((resp) => {
        addClient();
        handleoff();
      });
  };
  
  const addClient = () => {
    Api.get(`/client/api/get`).then((test) => {
      console.log("test.data :>> ", test.data);
      setDetails(test.data);
      handleoff();
    });
  };

  const deleteClientdata = (id) => {
    Api
      .delete(`/client/delete/users/${id}`)
      .then((test) => {
        addClient();
      });
  };

  const ClientEdit = async () => {
    const updatedetails = {
      id: id,
      companyname: companyname,
      companyaddress: companyaddress,
      PanNumber: PanNumber,
      GSTNo: GSTNo,
      contactPersonnumber: contactPersonnumber,
      contactpersonname: contactpersonname,
      purpose: purpose,
      projectstatus: projectstatus,
      description: description,
    };
    Api
      .put(`/client/api/users/${id}`, updatedetails)
      .then((test) => {
        addClient();
        handleoff();
      });
  };

  // -----------------Add Client button click Dialogbox open Condition--------------
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [dialogval, setDialogval] = useState([]);

  const [show, setShow] = useState(false);
  const handleOpen = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  // ----------------------------
  const submit = (id) => {
    confirmAlert({
      title: "Are You Sure",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteClientdata(id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  // view option style------------
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    border: "2px solid black",
    p: 4,
  };

  const handleModalProps = (id) => {
    const filtervalue = details.filter((ele) => {
      return ele.id === id;
    });
    setDialogval(filtervalue[0]);
  };

  // --------------------------------------------------------
  // Edit button function
  const [details, setDetails] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [companyaddress, setcompanyaddress] = useState("");
  const [PanNumber, setPanNumber] = useState("");
  const [GSTNo, setGSTNo] = useState("");
  const [contactpersonname, setcontactpersonname] = useState("");
  const [contactPersonnumber, setcontactPersonnumber] = useState("");
  const [purpose, setpurpose] = useState("");
  const [projectstatus, setprojectstatus] = useState("");
  const [description, setdescription] = useState("");
  const [id, setId] = useState(null);

  const handleoff = () => {
    setOpen(false);
    setcompanyname("");
    setcompanyaddress("");
    setPanNumber("");
    setGSTNo("");
    setcontactpersonname("");
    setcontactPersonnumber("");
    setpurpose("");
    setprojectstatus("");
    setdescription("");
  };

  // const handleClickopen = () =>{
  //   setButton(true);
  // };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // mapping method----------

  const data = [
    {
      name: "Company Name:",
      value: dialogval.companyname,
    },
    {
      name: "Company Address:",
      value: dialogval.companyaddress,
    },
    {
      name: "Pan.No:",
      value: dialogval.PanNumber,
    },
    {
      name: "GST.No:",
      value: dialogval.GSTNo,
    },
    {
      name: "Contact Person Name:",
      value: dialogval.contactpersonname,
    },
    {
      name: "Contact Person.No:",
      value: dialogval.contactPersonnumber,
    },

    {
      name: "purpose:",
      value: dialogval.purpose,
    },
    {
      name: "Project Status:",
      value: dialogval.projectstatus,
    },
    {
      name: "Description:",
      value: dialogval.description,
    },
  ];
  const columns = [
    { field: "companyname", headerName: "Company Name", width: 140 },
    { field: "companyaddress", headerName: "Company Address", width: 200 },

    {
      field: "PanNumber",
      headerName: "Pan.No",
      type: "string",
      width: 100,
    },
    {
      field: "GSTNo",
      headerName: "GST.No",
      type: "string",
      width: 140,
    },
    {
      field: "contactpersonname",
      headerName: "Contact Person Name",
      width: 160,
    },
    {
      field: "contactPersonnumber",
      headerName: "Contact Person.No",
      type: "number",
      width: 160,
    },

    {
      field: "purpose",
      headerName: "Purpose",
      width: 120,
    },
    {
      field: "projectstatus",
      headerName: "Project Status",
      width: 140,
      courser: "pointer",
      renderCell: (params) => {
        const data = params.row.projectstatus;
        return (
          <div
            className={
              data === "Completed"
                ? "Completed-style"
                : data === "Current"
                ? "Current-style"
                : "Cancelled-style"
            }
          >
            {data}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 140,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 120,
      courser: "pointer",

      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="Edit">
              <IconButton
                variant="contained"
                color="primary"
                style={{ border: "transparent" }}
                className="editbutton"
                onClick={() => {
                  setId(params.row.id);
                  setcompanyname(params.row.companyname);
                  setcompanyaddress(params.row.companyaddress);
                  setPanNumber(params.row.PanNumber);
                  setGSTNo(params.row.GSTNo);
                  setcontactpersonname(params.row.contactpersonname);
                  setcontactPersonnumber(params.row.contactPersonnumber);
                  setpurpose(params.row.purpose);
                  setprojectstatus(params.row.projectstatus);
                  setdescription(params.row.description);
                  handleClickOpen();
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            &nbsp;
            <Tooltip title="Delete">
              <IconButton
                variant="contained"
                color="primary"
                // onClick={submit}
                style={{ border: "transparent" }}
                className="deletebutton"
                onClick={() => {
                  submit(params.row.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },

    {
      field: "view",
      headerName: "view",
      width: 50,
      courser: "pointer",
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="View">
              <IconButton
                style={{ border: "none" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleOpen();
                  handleModalProps(params.id);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Modal
              open={show}
              onClose={close}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Tooltip title="Close">
                  <Button
                    style={{ marginLeft: "90%" }}
                    className="viewclose"
                    onClick={close}
                  >
                    x
                  </Button>
                </Tooltip>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <Box sx={{ flexGrow: 1 }}>
                  {data.map((list) => (
                    <Grid container spacing={2} columns={16}>
                      <Grid className="gridbot" item xs={8}>
                        <Item>{list.name}</Item>
                      </Grid>
                      <Grid className="gridbot" item xs={8}>
                        <Item> {list.value}</Item>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Modal>
          </div>
        );
      },
    },
  ];
  //   {
  //     id: 1,
  //     companyname: "Snow",
  //     companyaddress:
  //       "22, MK Reddy St, Tambaram West, Tambaram, Chennai, Tamil Nadu 600045",
  //     PanNumber: 1234567,
  //     GSTNo: 12345678901234,
  //     contactpersonname: "gdsyvyewv",
  //     contactPersonnumber: 8072992108,
  //     purpose: "oehcoqeh#",
  //     projectstatus: "Completed",
  //     description: "kdhkhdoiodj2ioji",
  //   },

  //   {
  //     id: 2,
  //     companyname: "john",
  //     companyaddress:
  //       "22, MK Reddy St, Tambaram West, Tambaram, Chennai, Tamil Nadu 600045",
  //     PanNumber: 1234567,
  //     GSTNo: 12345678901234,
  //     contactpersonname: "gdsyvyewv",
  //     contactPersonnumber: 8072992108,
  //     purpose: "pohdohdoe",
  //     projectstatus: "Current",
  //     description: "kdhkjjbksqjhxqkj",
  //   },

  //   {
  //     id: 3,
  //     companyname: "Snow",
  //     companyaddress:
  //       "22, MK Reddy St, Tambaram West, Tambaram, Chennai, Tamil Nadu 600045",
  //     PanNumber: 1234567,
  //     GSTNo: 12345678901234,
  //     contactpersonname: "gdsyvyewv",
  //     contactPersonno: "8072992108",
  //     purpose: "ehffehjoffk#",
  //     projectstatus: "Cancelled",
  //     description: "kdhkjjwhhwbhqwbh"
  //   },
  // ];

  // Table and Forms comments-----------------

  const validationSchema = Yup.object({
    companyname: Yup.string().required("Required"),
    companyaddress: Yup.string().required("Required"),
    PanNumber: Yup.string().required("Required"),
    GSTNo: Yup.string().required("Required"),
    contactPersonnumber: Yup.number().required("Required"),
    contactpersonname: Yup.string().required("Required"),
    purpose: Yup.string().required("Required"),
    projectstatus: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      companyname: companyname,
      companyaddress: companyaddress,
      PanNumber: PanNumber,
      GSTNo: GSTNo,
      contactPersonnumber: contactPersonnumber,
      contactpersonname: contactpersonname,
      purpose: purpose,
      projectstatus: projectstatus,
      description: description,
    },
    validationSchema,
    onSubmit() {
      if (id === null) {
        handleFormSubmit();
      } else {
        ClientEdit();
      }
    },
  });

  return (
    <div
      className="client-header"
      style={{
        height: "60vh",
        marginLeft: "20%",
        backgroundColor: "#f0f2f5",
        marginTop: "-3%",
        marginRight: "1%",
      }}
    >
      <h1
        className="heading"
        style={{
          padding: "15px",
          marginLeft: "2%",
          fontSize: "20px",
          fontFamily: "Times New Roman",
          position: "relative",
          top: "25px",
        }}
      >
        CLIENT LOGIN:
      </h1>
      <Button
        className="add-button"
        variant="outlined"
        style={{ marginLeft: "85%", marginTop: "-5%" }}
        onClick={handleClickOpen}
      >
        <b> + </b>&nbsp; Add Client
      </Button>
      <Dialog className="clientloginform" open={open} onClose={handleoff}>
        <DialogTitle>
          <span>Client Details:</span>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="companyname"
            name="companyname"
            label="Company Name"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            onBlur={formik.handleBlur}
            value={formik.values.companyname}
            onChange={(e) => {
              formik.setFieldValue("companyname", e.target.value);
              setcompanyname(e.target.value);
            }}
          />
          {formik.touched.companyname && formik.errors.companyname && (
            <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
              {formik.errors.companyname}
            </p>
          )}

          <TextareaAutosize
            className="Address"
            margin="dense"
            id="companyaddress"
            name="companyaddress"
            placeholder="CompanyAddress"
            type="text"
            style={{ width: "99%", height: "50px" }}
            autoComplete="off"
            // defaultValue={"At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies."}
            onBlur={formik.handleBlur}
            value={formik.values.companyaddress}
            onChange={(e) => {
              formik.setFieldValue("companyaddress", e.target.value);
              setcompanyaddress(e.target.value);
            }}
          />
          {formik.touched.companyaddress && formik.errors.companyaddress && (
            <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
              {formik.errors.companyaddress}
            </p>
          )}

          <TextField
            margin="dense"
            id="PanNumber"
            name="PanNumber"
            label="Pan Number"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            onBlur={formik.handleBlur}
            value={formik.values.PanNumber}
            onChange={(e) => {
              formik.setFieldValue("PanNumber", e.target.value);
              setPanNumber(e.target.value);
            }}
          />
          {formik.touched.PanNumber && formik.errors.PanNumber && (
            <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
              {formik.errors.PanNumber}
            </p>
          )}
          <TextField
            margin="dense"
            id="GSTNo"
            name="GSTNo"
            label="Gst Number"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            onBlur={formik.handleBlur}
            value={formik.values.GSTNo}
            onChange={(e) => {
              formik.setFieldValue("GSTNo", e.target.value);
              setGSTNo(e.target.value);
            }}
          />
          {formik.touched.GSTNo && formik.errors.GSTNo && (
            <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
              {formik.errors.GSTNo}
            </p>
          )}

          <TextField
            className="cntperno"
            margin="dense"
            id="contactPersonnumber"
            name="contactPersonnumber"
            label="Contact person Number"
            type="number"
            fullWidth
            variant="standard"
            autoComplete="off"
            onBlur={formik.handleBlur}
            value={formik.values.contactPersonnumber}
            onChange={(e) => {
              formik.setFieldValue("contactPersonnumber", e.target.value);
              setcontactPersonnumber(e.target.value);
            }}
          />
          {formik.touched.contactPersonnumber &&
            formik.errors.contactPersonnumber && (
              <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
                {formik.errors.contactPersonnumber}
              </p>
            )}

          <TextField
            margin="dense"
            id="contactpersonname"
            name="contactpersonname"
            label="Contact person Name"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            onBlur={formik.handleBlur}
            value={formik.values.contactpersonname}
            onChange={(e) => {
              formik.setFieldValue("contactpersonname", e.target.value);
              setcontactpersonname(e.target.value);
            }}
          />
          {formik.touched.contactpersonname && formik.errors.contactpersonname && (
            <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
              {formik.errors.contactpersonname}
            </p>
          )}

          <TextField
            margin="dense"
            name="purpose"
            id="purpose"
            label="Purpose"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            onBlur={formik.handleBlur}
            value={formik.values.purpose}
            onChange={(e) => {
              formik.setFieldValue("purpose", e.target.value);
              setpurpose(e.target.value);
            }}
          />
          {formik.touched.purpose && formik.errors.purpose && (
            <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
              {formik.errors.purpose}
            </p>
          )}
          <br />
          <br />
          {/* Project status list condition status description */}
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Project Status
            </InputLabel>
            <Select
              style={{ width: "180px" }}
              labelId="demo-simple-select-label"
              id="projectstatus"
              name="projectstatus"
              label="Projectstatus"
              onBlur={formik.handleBlur}
              value={formik.values.projectstatus}
              onChange={(e) => {
                formik.setFieldValue("projectstatus", e.target.value);
                setprojectstatus(e.target.value);
              }}
            >
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Current"}>Current</MenuItem>
              <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.projectstatus && formik.errors.projectstatus && (
            <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
              {formik.errors.projectstatus}
            </p>
          )}

          <TextareaAutosize
            className="description"
            margin="dense"
            id="description"
            name="description"
            label="Description"
            placeholder="Description"
            type="text"
            style={{ width: "99%", height: "50px" }}
            autoComplete="off"
            onBlur={formik.handleBlur}
            value={formik.values.description}
            onChange={(e) => {
              formik.setFieldValue("description", e.target.value);
              setdescription(e.target.value);
            }}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="mb-0" style={{ color: "red", marginTop: "0px" }}>
              {formik.errors.description}
            </p>
          )}
          {/* -------------------------- */}
        </DialogContent>
        <DialogActions>
          <Button open={handleClose} onClick={handleoff}>
            Cancel
          </Button>
          <Button onClick={formik.handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {/* </div> */}
      {/* </formik> */}
      <DataGrid
        rows={details}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}

export default Client;
