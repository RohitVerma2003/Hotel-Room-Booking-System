import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/dataSlice";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const login = async (username, password) => {
        const success = handleInputErrors({ username, password });

        if (!success) return;

        setLoading(true);
        console.log({ username, password });
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data));
            dispatch(setUser(data));

        } catch (error) {
            console.log(error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { login, loading };
}

export default useLogin

const handleInputErrors = ({ username, password }) => {
    if (!username || !password) {
        toast.error("Please fill in all fields.");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return false;
    }

    return true
}