import { getCustomerByEmail, createCustomer } from "./customerService";
import { auth } from "../firebase"; // Asegúrate de tener esta referencia


export const syncWithBackend = async (user, setCustomer, navigate) => {
    try {
        const token = await auth.currentUser.getIdToken();
        const photoURL = user.photoURL;
        const name = user.displayName || "Usuario";
        const email = user.email;
        const phone = user.phoneNumber || "";

        const baseInfo = {
            name: name,
            email: email,
            phone: phone,
            photo: photoURL,
            token: token,
        };

        const existingCustomer = await getCustomerByEmail(user.email, token);

        if (existingCustomer) {
            const updatedCustomer = { ...existingCustomer, photo: photoURL, token };
            setCustomer(updatedCustomer);
            localStorage.setItem("customer", JSON.stringify(updatedCustomer));
            console.log("Cliente ya existe:", updatedCustomer);
        } else {
            const createdCustomer = await createCustomer(baseInfo, token);
            const newCustomer = { ...createdCustomer, photo: photoURL, token };
            setCustomer(newCustomer);
            localStorage.setItem("customer", JSON.stringify(newCustomer));
            console.log("Nuevo cliente guardado:", newCustomer);
        }

        navigate("/clientes");

    } catch (error) {
        console.error("Error sincronizando con el backend:", error);
    }
};
