import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <div className="error-page">
      <div className="error-container">
        <i className="las la-exclamation-triangle error-icon"></i>
        <h1 className="error-title">Ohhh!</h1>
        <p className="error-message">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="error-details">
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/dashboard" className="error-button">
          <i className="las la-home"></i>
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default Error;
