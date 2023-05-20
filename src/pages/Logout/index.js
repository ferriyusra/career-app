import * as React from "react";
import { useHistory } from "react-router-dom";
import { LayoutOne } from "upkit";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { userLogout } from "../../features/Auth/actions";
import { logout } from "../../api/auth";
export default function Logout() {
  let history = useHistory();
  let dispatch = useDispatch();
  React.useEffect(() => {
    logout()
      .then(() => dispatch(userLogout()))
      .then(() => history.push("/"));
  }, [history, dispatch]);
  return (
    <LayoutOne size="small">
      <div className="text-center flex flex-col justify-center itemscenter">
        <ClipLoader color="indigo" />
        <br />
        Logging out ...
      </div>
    </LayoutOne>
  );
}
