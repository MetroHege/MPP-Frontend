import React, { useEffect, useState } from "react";
import { User } from "mpp-api-types";
import { useUser } from "../hooks/UserHooks";
import UserForm from "./UserForm";
import Modal from "react-modal";

const AdminUser: React.FC = () => {
    const { getAllUsers, deleteUser, putUser } = useUser();
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const token = localStorage.getItem("token");

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

    const handleModifyUser = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveChanges = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedUser) {
            await putUser(selectedUser.id, selectedUser);
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers);
            setIsModalOpen(false);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUser({
            ...selectedUser,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {users.map(user => (
                    <div key={user.id} className="p-4 border border-gray-200 rounded shadow-sm">
                        <p className="mb-2">User: {user.username}</p>
                        <p className="mb-2">
                            Names: {user.firstName} {user.lastName}
                        </p>
                        <p className="mb-2">
                            Phone number: {typeof user.phone === "number" ? user.phone : user.phone}
                        </p>
                        <p className="mb-2">Email: {user.email}</p>
                        <p className="mb-2">City: {user.city}</p>
                        <button
                            onClick={() => handleModifyUser(user.id)}
                            className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
                        >
                            Muokkaa
                        </button>
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Poista
                        </button>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: {
                        width: "400px",
                        height: "auto",
                        backgroundColor: "#333",
                        color: "#fff"
                    }
                }}
            >
                {selectedUser && (
                    <form onSubmit={handleSaveChanges} className="space-y-4">
                        <label className="block">
                            <span className="text-white">Username:</span>
                            <input
                                type="text"
                                name="userName"
                                value={selectedUser.username}
                                onChange={handleInputChange}
                                placeholder="New category name"
                                className="bg-transparent"
                            />
                        </label>
                        <label className="block">
                            <span className="text-white">First Name:</span>
                            <input
                                type="text"
                                name="firstName"
                                value={selectedUser.firstName}
                                onChange={handleInputChange}
                                placeholder="New category name"
                                className="bg-transparent"
                            />
                        </label>
                        <label className="block">
                            <span className="text-white">Last Name:</span>
                            <input
                                type="text"
                                name="lastName"
                                value={selectedUser.lastName}
                                onChange={handleInputChange}
                                placeholder="New category name"
                                className="bg-transparent"
                            />
                        </label>
                        <label className="block">
                            <span className="text-white">City:</span>
                            <input
                                type="text"
                                name="city"
                                value={selectedUser.city}
                                onChange={handleInputChange}
                                placeholder="New category name"
                                className="bg-transparent"
                            />
                        </label>
                        <label className="block">
                            <span className="text-white">Phone Number:</span>
                            <input
                                type="text"
                                name="phone"
                                value={selectedUser.phone}
                                onChange={handleInputChange}
                                placeholder="New category name"
                                className="bg-transparent"
                            />
                        </label>
                        <label className="block">
                            <span className="text-white">Email:</span>
                            <input
                                type="text"
                                name="email"
                                value={selectedUser.email}
                                onChange={handleInputChange}
                                placeholder="New category name"
                                className="bg-transparent"
                            />
                        </label>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default AdminUser;
