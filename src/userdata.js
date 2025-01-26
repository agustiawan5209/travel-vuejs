const userData = localStorage.getItem("user");
let user = null;
if (userData) {
    try {
        // Parse the user data if it exists
        user = JSON.parse(userData);
    } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
    }
}

export default user