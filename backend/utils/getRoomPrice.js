const getRoomPrice = (rooms) => {
    const totalRooms = 50;
    const availabilityPercentage = ((50 - rooms.length) / totalRooms) * 100;
    console.log(availabilityPercentage)

    if (availabilityPercentage > 75) return 1000;  
    if (availabilityPercentage > 50) return 1500;  
    if (availabilityPercentage > 25) return 2000;  
    return 2500; 
};

export default getRoomPrice;