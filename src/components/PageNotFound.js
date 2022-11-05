const PageNotFound = () => {
    return ( 
        <div className="d-flex align-items-center justify-content-center bg-primary px-4 py-5 px-md-5" style={{height:"90vh"}} >
        <div className="text-center text-white">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="fw-bold text-dark">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <a href="/" className="btn btn-danger">Go Home</a>
            </div>
        </div>
     );
}
 
export default PageNotFound;