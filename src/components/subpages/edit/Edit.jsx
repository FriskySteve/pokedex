import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { darkBG } from "../../../utils/stringUtils";

const Edit = () => {
  const { darkMode } = useContext(LoginContext);

  return (
    <div className={`dark ${darkMode ? darkBG : ""}`}>
      <h1>edit</h1>
    </div>
  );
};

export default Edit;
