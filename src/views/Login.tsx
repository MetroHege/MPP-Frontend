import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { getRandomEncouragementMessage } from "../components/EncouragementMessages";

// This component is the login view of the application.
const Login = () => {
    // This function is used to get a random encouragement message.
    const message = getRandomEncouragementMessage();

    return (
        <>
            <h1 className="mb-5 text-4xl">
                Hienoa, että otat vanhojen tavaroiden kierrätyksen vakavasti!
            </h1>
            <p className="mb-10 text-l">{message}</p>
            <div className="flex flex-col md:flex-row justify-center">
                <div className="w-full md:w-1/2">
                    {/* This component is used to render a login form. */}
                    <LoginForm />
                    <hr className="w-2/3 mt-2 mb-3 border-gray-300 md:hidden" />
                </div>
                <div className="w-full md:w-1/2">
                    {/* This component is used to render a register form. */}
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Login;
