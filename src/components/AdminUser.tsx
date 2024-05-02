import React, { useEffect, useState } from "react";
import { User } from "mpp-api-types";
import { useUser } from "../hooks/UserHooks";
import AdminUserForm from "./AdminUserForm";

const AdminUser: React.FC = () => {
    const { getAllUsers, getUserById, deleteUser, putUser } = useUser();
    const [users, setUsers] = useState<User[]>([]);
    const token = localStorage.getItem("token");
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState<UserWithId | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId: number) => {
        const token = localStorage.getItem("token");
        if (token) {
            await deleteUser(userId, token);
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {users.map(user => (
                    <div key={user.id} className="p-4 border border-gray-200 rounded shadow-sm">
                        <p className="mb-2">Käyttäjä: {user.username}</p>
                        <p className="mb-2">Etunimi: {user.firstName}</p>
                        <p className="mb-2">Sukunimi: {user.lastName}</p>
                        <p className="mb-2">Puhelinnumero: {user.phone}</p>
                        <p className="mb-2">Sähköposti: {user.email}</p>
                        <p className="mb-2">Kaupunki: {user.city}</p>
                        <button
                            className="w-1/2 p-2 bg-yellow-gradient font-bold mb-2 rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                            type="submit"
                            onClick={() => setShowForm(true)}
                        >
                            Muokkaa tietoja
                        </button>
                        <AdminUserForm showForm={showForm} setShowForm={setShowForm} user={user} />
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Poista
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminUser;