import React, { useState } from "react";
import styles from "../../../../css/Dashboard/Dashboard.module.css";
import app from "../../../../Firebase";
import { addCompany } from "../../../../contexts/DatabaseContext";
import { useDispatch } from "react-redux";
import { ADDCOMPANY } from "../../../../store/actions/actionTypes";

const Profile = () => {
  //States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDownloadURL, setFileDownloadURL] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCompany = {
      name: name,
      description: description,
      imgURL: fileDownloadURL,
      status: false,
    };

    const successfulAdd = await addCompany(newCompany);
    debugger;

    if (successfulAdd) {
      dispatch({ type: ADDCOMPANY, company: newCompany });
    }
  };
  const setFile = async (e) => {
    var file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);

    fileRef.put(file).then(() => console.log("file uploaded succesfully"));
    const fileURL = await fileRef.getDownloadURL();
    setFileDownloadURL(fileURL);
    console.log(fileDownloadURL);
    debugger;
  };

  return (
    <div>
      <form className={styles.addCompanyForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p>Company logo</p>

          <label for="file-upload" className={styles.addLogo}>
            +
          </label>
          <input
            id="file-upload"
            type="file"
            value={selectedFile}
            onChange={(e) => setFile(e)}
          />
        </div>
        <div>
          <p>Company name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeHolder="Company name"
            name="name"
          ></input>
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeHolder="Company description"
            name="description"
          ></input>
        </div>
        <button className={styles.submitForm}>Save button</button>
      </form>
    </div>
  );
};

export default Profile;
