import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setRooms } from "../redux/dataSlice";

const useCheckAvailability = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const checkAvailability = async (date) => {
        setLoading(true);

        if(Date.now() > new Date(date).getTime()){
            toast.error("Invalid date. Please select a future date.");
            return;
        }

        try {
            const res = await fetch("/api/hotel/checkAvailability", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ date })
            });

            const data = await res.json();
            dispatch(setRooms(data));

            if (data.error) {
                throw new Error(data.error);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { checkAvailability, loading };
}

export default useCheckAvailability