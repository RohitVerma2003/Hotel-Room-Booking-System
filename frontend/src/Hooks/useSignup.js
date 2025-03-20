import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/dataSlice";

const useSignup = () => {
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();

    const signup = async ({ fullName, username, password, confirmPassword }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword });

        if (!success) return;
        setLoading(true);

        try {
            console.log({ fullName, username, password, confirmPassword })
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, username, password, confirmPassword })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data));
            dispatch(setUser(data))
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { signup, loading };
}

export default useSignup

const handleInputErrors = ({ fullName, username, password, confirmPassword }) => {
    if (!fullName || !username || !password || !confirmPassword) {
        toast.error("Please fill in all fields.");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return false;
    }

    return true
}
