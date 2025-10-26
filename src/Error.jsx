import { useRouteError, Link } from "react-router-dom";
import img from "../public/404-error.jpg";

const Error = () => {
  const error = useRouteError();
  return (
    <div className="error-page">
      <div className="error-container">
        <img src={img} alt="404 Error" className="error-image" />
        <h1 className="error-title">Ohhh!</h1>
        <p className="error-message">
          Sorry, an unexpected error has occurred.
        </p>
        <Link to="/dashboard" className="error-link">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default Error;
