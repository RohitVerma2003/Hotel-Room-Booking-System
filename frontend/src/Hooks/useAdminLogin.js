import { useState } from "react"
import toast from "react-hot-toast";

const useAdminLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        const success = handleInputErrors({ username, password });

        if (!success) return;

        setLoading(true);
        console.log({ username, password });
        try {
            const res = await fetch("/api/auth/admin/login", {
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

            return data;

        } catch (error) {
            console.log(error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { login, loading };
}

export default useAdminLogin

const handleInputErrors = ({ username, password }) => {
    if (!username || !password) {
        toast.error("Please fill in all fields.");
        return false;
    }

    return true
}