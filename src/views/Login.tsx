import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
    return (
        <>
            <h1 className=" mb-10 text-4xl">
                Hienoa, että otat vanhojen tavaroiden kierrätyksen vakavasti!
            </h1>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <LoginForm />
                </div>
                <div className="w-1/2">
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Login;
