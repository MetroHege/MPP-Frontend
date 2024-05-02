import UploadForm from "../components/UploadForm";

// This component is the upload view of the application.
const Upload = () => {
    return (
        <>
            <h1 className="text-4xl mb-4 mt-4">Luo uusi ilmoitus</h1>
            {/* This component is used to render an upload form. */}
            <UploadForm />
        </>
    );
};

export default Upload;
