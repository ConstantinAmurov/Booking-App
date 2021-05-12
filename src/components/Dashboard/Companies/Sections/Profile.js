import React, { useState, useRef } from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
import app from "../../../../Firebase";
import { addCompany, addServices } from "../../../../contexts/DatabaseContext";
import { useDispatch, useSelector } from "react-redux";
import { ADDCOMPANY } from "../../../../store/actions/actionTypes";
import { useFormik } from "formik";
import { validateCompanyForm as validate } from "../../../../services/ValidateAddCompanyForm.service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const Profile = () => {
  //States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDownloadURL, setFileDownloadURL] = useState("");
  const imgLabel = useRef();
  // const saveModal = useRef();
  const dispatch = useDispatch();
  const servicesDayWorking = useSelector((state) => state.day);
  const services = useSelector((state) => state.services.services[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const setFile = async (e) => {
    formik.setFieldValue("fileUpload", e.currentTarget.files[0]);
    var file = e.target.files[0];

    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);

    fileRef.put(file).then(async () => {
      console.log("file uploaded succesfully");

      const fileURL = await fileRef.getDownloadURL();

      setFileDownloadURL(fileURL);
    });
  };

  //FORMIK SETUP

  const formik = useFormik({
    initialValues: {
      fileUpload: null,
      companyName: "",
      description: "",
    },
    validate,
    onSubmit: async (values) => {
      const newCompany = {
        name: values.companyName,
        description: values.description,
        imgURL: fileDownloadURL,
        status: false,
      };
      debugger;
      console.log(services);
      if (services === undefined) {
        alert("Are you sure you want to add company without services?");
      }
      const arrayOfServices = [null];

      for (var i = 0; i < services.length; i++) {
        debugger;
        arrayOfServices[i] = {
          serviceDetails: services[i],
          serviceDayWorking: servicesDayWorking[i],
        };
      }
      var AddedServicesIDs = [];

      for (const service of arrayOfServices) {
        const extractedID = await addServices(service);

        AddedServicesIDs.push(extractedID);
      }
      try {
        await addCompany({ newCompany, AddedServicesIDs });
        dispatch({ type: ADDCOMPANY, newCompany });
      } catch (error) {
        console.log("ERROR AT ADDING COMPANY");
      }
    },
  });

  return (
    <div>
      <form className={styles.addCompanyForm} onSubmit={formik.handleSubmit}>
        <div>
          <p>Company logo</p>

          <label ref={imgLabel} for="fileUpload" className={styles.addLogo}>
            {fileDownloadURL ? <img src={fileDownloadURL}></img> : "+"}
          </label>
          <input
            id="fileUpload"
            name="fileUpload"
            type="file"
            onChange={(e) => {
              setFile(e);
            }}
          />
        </div>
        <div>
          <p>Company name</p>
          <input
            type="text"
            id="companyName"
            name="companyName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            placeHolder="Company name"
          ></input>
        </div>
        {formik.touched.companyName && formik.errors.companyName ? (
          <div>{formik.errors.companyName}</div>
        ) : null}
        <div>
          <p>Description</p>
          <input
            type="text"
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeHolder="Company description"
          ></input>
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </div>
        <button type="submit" className={styles.submitForm}>
          Save button
        </button>
      </form>
    </div>
  );
};

export default Profile;
