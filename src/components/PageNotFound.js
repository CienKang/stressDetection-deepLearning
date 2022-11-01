const PageNotFound = () => {
    return ( 
        <div class="d-flex align-items-center justify-content-center bg-primary px-4 py-5 px-md-5" style={{height:"90vh"}} >
        <div class="text-center text-white">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="fw-bold text-dark">Opps!</span> Page not found.</p>
                <p class="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <a href="/" class="btn btn-danger">Go Home</a>
            </div>
        </div>
     );
}
 
export default PageNotFound;