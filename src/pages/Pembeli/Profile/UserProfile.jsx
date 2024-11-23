import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState("/assets/default-photo.jpg");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    alert("Profile saved!");
    navigate("/home-pembeli");
    // Logic for saving profile details can be added here
  };

  const handleBack = () => {
    navigate(-1);
    // Logic for navigating back to the previous page can be added here
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-yellow-400 p-4 flex justify-between items-center rounded-br-full mr-3.5">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-xl font-bold text-white">PERSTAN</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />
            <label
              htmlFor="imageUpload"
              className="mt-3 bg-blue-500 text-white text-sm px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
            >
              Unggah Foto
            </label>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* Form */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Alamat
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masukkan alamat"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Nomor Telepon
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Masukkan nomor telepon"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-400 text-white text-sm rounded hover:bg-gray-500"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-400 border-t p-4 text-left text-gray-800">
        &copy; 2024 Your Company. All Rights Reserved.
      </footer>
    </div>
  );
};

export default EditProfile;