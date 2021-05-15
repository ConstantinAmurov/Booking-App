import React, { useState, useRef } from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
import app from "../../../../Firebase";
import { editCompany } from "../../../../contexts/DatabaseContext";
import { useDispatch, useSelector } from "react-redux";
import { ADDCOMPANY, EDITCOMPANY } from "../../../../store/actions/actionTypes";
import { useFormik } from "formik";
import { validateCompanyForm as validate } from "../../../../services/ValidateAddCompanyForm.service";
import SaveModal from "../../Modals/SaveModal";
import { saveCompany } from "../../../../contexts/ProfileContext";
import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
const Profile = ({ mode, company }) => {
  //States
  const [status, setStatus] = useState(
    company != undefined ? company.status : false
  );
  const [fileDownloadURL, setFileDownloadURL] = useState(
    mode == "edit-company" ? company.imgURL : null
  );
  const imgLabel = useRef();

  const dispatch = useDispatch();
  const servicesDayWorking = useSelector((state) => state.day);
  const services = useSelector((state) => state.services.services[0]);

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
  const confirmSave = () => {
    formik.handleSubmit();
  };
  //FORMIK SETUP

  const formik = useFormik({
    initialValues: {
      fileUpload: mode == "edit-company" ? company.imgURL : null,
      companyName: mode == "edit-company" ? company.name : "",
      description: mode == "edit-company" ? company.description : "",
    },
    validate,
    onSubmit: async (values) => {
      if (mode === "add-company") {
        const newCompany = {
          name: values.companyName,
          description: values.description,
          imgURL: fileDownloadURL,
          status: false,
        };
        try {
          await saveCompany(newCompany, services, servicesDayWorking);
          dispatch({ type: ADDCOMPANY, newCompany });
        } catch (error) {
          console.log(error);
        }
      }

      if (mode === "edit-company") {
        const editedCompany = {
          id: company.id,
          name: values.companyName,
          description: values.description,
          imgURL: fileDownloadURL,
          status: status,
          services: company.services,
        };

        try {
          await editCompany(company.id, editedCompany);

          dispatch({
            type: EDITCOMPANY,
            id: company.id,
            editedCompany: editedCompany,
          });
        } catch (error) {
          console.log(error);
        }
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
        {mode === "edit-company" && (
          <div>
            <p>Status</p>
            <DragSwitch
              checked={status}
              onColor="#F29F57"
              handleColor={status ? "#EF6313" : "#4F4F4F"}
              onChange={(e) => setStatus(e)}
            />
          </div>
        )}
        {mode === "add-company" && (
          <SaveModal
            services={services}
            errors={formik.errors}
            touched={formik.touched}
            confirmSave={confirmSave}
          ></SaveModal>
        )}
        {mode === "edit-company" && (
          <button className={styles.submitForm} type="submit">
            {" "}
            Edit Company
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
