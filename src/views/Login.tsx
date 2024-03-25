import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { getRandomEncouragementMessage } from "../components/encouragementMessages";

const Login = () => {
    const message = getRandomEncouragementMessage();

    return (
        <>
            <h1 className=" mb-5 text-4xl">
                Hienoa, että otat vanhojen tavaroiden kierrätyksen vakavasti!
            </h1>
            <p className="mb-10 text-l">{message}</p>
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
