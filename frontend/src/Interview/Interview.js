import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert } from "react-confirm-alert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "react-confirm-alert/src/react-confirm-alert.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Api from "../Api";
import "./Interview.css";
import { Grid } from "@mui/material";
import moment from "moment";

function Interview() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [dailogVal, setDailogVal] = useState([]);
  const [button, setButton] = useState(false);
  const [time, setTime] = useState("");
  const [resource, setResource] = useState("");
  const [technology, setTechnology] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState([]);
  const [values, setValues] = useState(null);
  const [valuee, setValuee] = useState(null);
  const [id, setid] = useState("");

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    addDataList();
  }, []);

  const addDataList = () => {
    Api.get(`/interview/`).then((resp) => {
      setDetails(resp.data.data);
    });
  };

  const deleteInterviewData = (id) => {
    Api.delete(`interview/delete/${id}`).then((resp) => {
      addDataList();
    });
  };

  const handleFormSubmit = async () => {
    const userDetails = {
      Time: time,
      Date: date,
      ResourseName: resource,
      Technology: technology,
      Experience: experience,
      Description: description,
      Link: link,
      Status: status,
    };

    await Api.post(`interview/create`, userDetails).then((resp) => {
      // console.log('test :>> ', resp.data);
        addDataList();
        handleOff();
      });
  };

  const updateDetails = async () => {
    const userDetails = {
      id: id,
      Time: time,
      Date: date,
      ResourseName: resource,
      Technology: technology,
      Experience: experience,
      Description: description,
      Link: link,
      Status: status,
    };

    await Api.put(`interview/update`, userDetails).then((resp) => {
      addDataList();
      handleOff();
      // if (resp.data.statusCode === 200) {
      //   addDataList();
      //   handleOff();
      // }
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "rgb(240, 242, 245)",
    border: "3px solid #000",
    p: 4,
    backgroundSize: "cover",
  };

  const Item = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    fontSize: "15px",
  }));

  const handleOff = () => {
    setButton(false);
    setTime("");
    setResource("");
    setTechnology("");
    setExperience("");
    setDescription("");
    setLink("");
    setStatus("");
    setValuee("");
    setValues("");
  };

  const handleClickOpen = () => {
    setButton(true);
  };

  const submit = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      buttons: [
        {
          label: "yes",
          onClick: () => {
            deleteInterviewData(id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const columns = [
    { field: "Date", headerName: "Date", width: 110, type: "number" },
    { field: "Time", headerName: "Time", width: 110, type: "number" },
    {
      field: "ResourseName",
      headerName: "ResourseName",
      type: "string",
      width: 170,
    },
    {
      field: "Technology",
      headerName: "Technology",
      type: "string",
      width: 150,
    },
    {
      field: "Experience",
      headerName: "Experience",
      type: "string",
      width: 150,
    },
    {
      field: "Description",
      headerName: "Description",
      type: "string",
      width: 150,
    },
    {
      field: "Link",
      headerName: "Link",
      type: "string",
      width: 150,
    },
    {
      field: "Status",
      headerName: "Status",
      type: "string",
      width: 130,
      renderCell: (params) => {
        const data = params.row.Status;
        return (
          <div
            className={
              data === "completed"
                ? "completed-Styles"
                : data === "rejected"
                ? "rejected-style"
                : "postponed-style"
            }
          >
            {data}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <button
              style={{ border: "none", cursor: "pointer" }}
              variant="outlined"
              onClick={() => {
                // setDate(params.row.date);
                const newDate = moment(params.row.Date, "L").format();
                const newTime = moment(params.row.Time, "LT").format();
                console.log("first", newDate, newTime);

                setValuee(newDate);
                setValues(newTime);
                setid(params.row.id);
                setTime(params.row.Time);
                setDate(params.row.Date);
                setResource(params.row.ResourseName);
                setTechnology(params.row.Technology);
                setExperience(params.row.Experience);
                setDescription(params.row.Description);
                setLink(params.row.Link);
                setStatus(params.row.Status);
                handleClickOpen();
              }}
            >
              <EditIcon />
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => {
                submit(params.row.id);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },

    {
      field: "View",
      headerName: "View",
      type: "string",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={() => {
                handleOpen();
                handleModalprops(params.row.id);
              }}
            >
              <RemoveRedEyeIcon />
            </Button>
            <Modal
              open={show}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <button className="first" onClick={handleClose}>
                    X
                  </button>

                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <Item style={{ textAlign: "right", fontSize: "17px" }}>
                        Time:
                      </Item>
                    </Grid>
                    <Grid item xs={7}>
                      <Item style={{ fontSize: "17px" }}>{dailogVal.Time}</Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <Item style={{ textAlign: "right", fontSize: "17px" }}>
                        Date:
                      </Item>
                    </Grid>
                    <Grid item xs={7}>
                      <Item style={{ fontSize: "17px" }}>{dailogVal.Date}</Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <Item style={{ textAlign: "right", fontSize: "17px" }}>
                        ResourseName:
                      </Item>
                    </Grid>
                    <Grid item xs={7}>
                      <Item
                        style={{ fontSize: "17px", overflowWrap: "break-word" }}
                      >
                        {dailogVal.ResourseName}
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <Item style={{ textAlign: "right", fontSize: "17px" }}>
                        Technology:
                      </Item>
                    </Grid>
                    <Grid item xs={7}>
                      <Item
                        style={{ fontSize: "17px", overflowWrap: "break-word" }}
                      >
                        {dailogVal.Technology}
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <Item style={{ textAlign: "right", fontSize: "17px" }}>
                        Experience:
                      </Item>
                    </Grid>
                    <Grid item xs={7}>
                      <Item
                        style={{ fontSize: "17px", overflowWrap: "break-word" }}
                      >
                        {dailogVal.Experience}
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <Item
                        style={{
                          textAlign: "right",
                          fontSize: "17px",
                        }}
                      >
                        Description:
                      </Item>
                    </Grid>
                    <Grid item xs={7}>
                      <Item
                        style={{ fontSize: "17px", overflowWrap: "break-word" }}
                      >
                        {dailogVal.Description}
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <Item style={{ textAlign: "right", fontSize: "17px" }}>
                        Link:
                      </Item>
                    </Grid>
                    <Grid item xs={7}>
                      <Item
                        style={{ fontSize: "17px", overflowWrap: "break-word" }}
                      >
                        {dailogVal.Link}
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <Item style={{ textAlign: "right", fontSize: "17px" }}>
                        Status:
                      </Item>
                    </Grid>
                    <Grid item xs={7}>
                      <Item style={{ fontSize: "17px" }}>
                        {dailogVal.Status}
                      </Item>
                    </Grid>
                  </Grid>
                </Typography>
              </Box>
            </Modal>
          </div>
        );
      },
    },
  ];
  const rows = [
    {
      id: 1,
      Time: "08.03",
      Date: "10.02.2000",
      ResourseName: "gowtham",
      Technology: "JAVA",
      Experience: "10years",
      Description: "this is the best one",
      Link: "http://af.com",
      Status: "completed",
    },
    {
      id: 2,
      Time: "09.32",
      Date: "12.02.2000",
      ResourseName: "Rajan",
      Technology: "ReactNative",
      Experience: "8years",
      Description: "waht is this",
      Link: "http://ffff.com",
      Status: "rejected",
    },
    {
      id: 3,
      Time: "09.32",
      Date: "12.02.2000",
      ResourseName: "bharani",
      Technology: "React",
      Experience: "7years",
      Description: "what a karuvad",
      Link: "http://fhsfl.com",
      Status: "postponed",
    },
    {
      id: 4,
      Time: "08.32",
      Date: "12.02.1999",
      ResourseName: "velan",
      Technology: "Reactjs",
      Experience: "7years",
      Description:
        "Green is the color between cyan and yellow on the visible spectrum. It is evoked by light which has a dominant wavelength of roughly 495–570 nm.",
      Link: "http://fhsfl.com",
      Status: "completed",
    },
  ];

  const handleModalprops = (id) => {
    const filterdVal = details.filter((ele) => {
      return ele.id === id;
    });
    setDailogVal(filterdVal[0]);
    return;
  };

  const validationSchema = Yup.object({
    resoursename: Yup.string().required("Required"),
    technology: Yup.string().required("Required"),
    experience: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    link: Yup.string().required("Required"),
    Status: Yup.string().required("Required"),
  });

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      resoursename: resource,
      technology: technology,
      experience: experience,
      description: description,
      link: link,
      Status: status,
      date: date,
      time: time,
    },
    validationSchema,
    onSubmit() {
      if (id === "") {
        handleFormSubmit();
      } else {
        updateDetails();
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
        INTERVIEW :
      </h3>
      <div className="second-content">
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={{ marginTop: "-38%" }}
        >
          + ADD Interview
        </Button>
      </div>

      <Dialog open={button} onClose={handleOff}>
        <DialogTitle>Interview</DialogTitle>
        <DialogContent>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={valuee}
                name="Date"
                onChange={(newValue) => {
                  const formatedDate = moment(newValue).format("L");
                  setValuee(newValue);
                  setDate(formatedDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            &nbsp;
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                name="Time"
                value={values}
                onChange={(newValue) => {
                  setValues(newValue);
                  const formatedTime = moment(newValue).format("LT");
                  setTime(formatedTime);
                  // Time(e.target.value);
                  // setValuee(newValue);
                  // setTimee(newValue.target.value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <TextField
              margin="dense"
              name="resoursename"
              id="resoursename"
              label="ResourseName"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.resoursename}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setResource(e.target.value);
                // formik.setFieldValue("resoursename", e.target.value);
                // setResources(e.target.value);
              }}
            />
            {formik.touched.resoursename && formik.errors.resoursename && (
              <p
                className="mb-0"
                style={{ color: "#df5757", marginTop: "0px" }}
              >
                {formik.errors.resoursename}
              </p>
            )}
          </div>
          <div>
            <TextField
              margin="dense"
              id="technology"
              label="Technology"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.technology}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setTechnology(e.target.value);
                // formik.setFieldValue("technology", e.target.value);
                // setTechnologyy(e.target.value);
              }}
            />
            {formik.touched.technology && formik.errors.technology && (
              <p
                className="mb-0"
                style={{ color: "#df5757", marginTop: "0px" }}
              >
                {formik.errors.technology}
              </p>
            )}
          </div>
          <div>
            <TextField
              margin="dense"
              id="experience"
              label="Experience"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.experience}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setExperience(e.target.value);
                // formik.setFieldValue("experience", e.target.value);
                // setExperiencee(e.target.value);
              }}
            />
            {formik.touched.experience && formik.errors.experience && (
              <p
                className="mb-0"
                style={{ color: "#df5757", marginTop: "0px" }}
              >
                {formik.errors.experience}
              </p>
            )}
          </div>
          <div>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setDescription(e.target.value);
                // formik.setFieldValue("description", e.target.value);
                // setDescriptionn(e.target.value);
              }}
            />
            {formik.touched.description && formik.errors.description && (
              <p
                className="mb-0"
                style={{ color: "#df5757", marginTop: "0px" }}
              >
                {formik.errors.description}
              </p>
            )}
          </div>
          <div>
            <TextField
              margin="dense"
              id="link"
              label="Link"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.link}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setLink(e.target.value);
                // formik.setFieldValue("link", e.target.value);
                // setLinkk(e.target.value);
              }}
            />
            {formik.touched.link && formik.errors.link && (
              <p className="mb-0" style={{ color: "#df5757" }}>
                {formik.errors.link}
              </p>
            )}
          </div>
          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>
              <Select
                name="Status"
                label="Status"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formik.values.Status}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  // formik.setFieldValue("Status", e.target);
                  setStatus(e.target.value);
                  // setStatuss(e.target.value);
                }}
              >
                <MenuItem value={"completed"}>Completed</MenuItem>
                <MenuItem value={"rejected"}>Rejected</MenuItem>
                <MenuItem value={"postponed"}>Postponed</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.Status && formik.errors.Status && (
              <p className="mb-0" style={{ color: "#df5757", marginTop: "o" }}>
                {formik.errors.Status}
              </p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button open={button} onClick={handleOff}>
            Cancel
          </Button>
          <Button
            onClick={formik.handleSubmit}
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
export default Interview;
