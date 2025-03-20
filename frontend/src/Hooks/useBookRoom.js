import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setRooms } from "../redux/dataSlice";

const useBookRoom = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const bookRoom = async (date, price) => {
        setLoading(true);

        try {
            const res = await fetch("/api/hotel/bookRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ date, price })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            toast.success(data.message);
            dispatch(setRooms(null));
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { bookRoom, loading };
}

export default useBookRoom