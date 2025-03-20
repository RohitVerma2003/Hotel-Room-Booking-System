import { useState } from "react"
import toast from "react-hot-toast";

const useDeleteBooking = () => {
    const [deleteLoading, setLoading] = useState(false);

    const bookRoomDelete = async (id) => {
        setLoading(true);

        try {
            const res = await fetch("/api/hotel/bookRoomDelete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id})
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            toast.success(data.message);
            return data;
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { bookRoomDelete, deleteLoading };
}

export default useDeleteBooking