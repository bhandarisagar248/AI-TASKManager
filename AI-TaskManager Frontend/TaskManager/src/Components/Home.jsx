import { useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useContext } from "react";
import { update } from "./Controller/UserController";
import '../CSS/Home.css';
import { useAuth } from "../ContextAPI/AuthContext";

const Home=()=>{
    const navigate=useNavigate();

  const location = useLocation();
  const host='http://localhost:8080/api/user';

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Country, setCountry] = useState("Nepal");
  const [City, setCity] = useState("");
  const [PostalCode, setPostalCode] = useState("");

  // profile image (Base64)
  // const [profileImage, setProfileImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  // edit state toggles
  const [isPersonalEditable, setIsPersonalEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);

  // user from location state
  const User = location?.state;

const { isLogin ,setIsLogin }=useAuth();



useEffect(() => {
//   const storedUser = location.state || JSON.parse(localStorage.getItem("user"));
  const storedUser = location.state || JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    // Not logged in → redirect
    setIsLogin(false);
    navigate("/login");
  } else {
    // Logged in → populate profile
    setName(storedUser.name);
    setEmail(storedUser.email);
    setPhone(storedUser.phone || "NA");
    setCountry(storedUser.country || "NA");
    setCity(storedUser.city || "NA");
    setPostalCode(storedUser.postcode || "NA");
    setIsLogin(true);

    // Save to localStorage if coming from login
    if (location.state) localStorage.setItem("user", JSON.stringify(storedUser));
  }
}, [location.state]);

useEffect(() => {
  if (email) {
    fetch(`${host}/profile/${email}/image`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch image");
        return res.blob();
      })
      .then((blob) => {
        setProfileImageUrl(URL.createObjectURL(blob));
      })
      .catch((err) => {
        console.error("Image fetch error:", err);
        setProfileImageUrl("https://via.placeholder.com/150"); // fallback
      });
  }
}, [email]);


// Handle file select + upload
const handleImageChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setProfileImageFile(file);
  setProfileImageUrl(URL.createObjectURL(file)); // instant preview

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${host}/upload/${email}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    alert("Image uploaded successfully");
  } catch (error) {
    console.error("Image upload error:", error);
    alert("Failed to upload image");
  }
};


  const handleSave = () => {
    const payload = {
      name:name,
      email:email,
      phone:isNaN(Number(phone)) ? null : Number(phone),
      country: Country,
      city: City,
      postcode: PostalCode,
    };

    update(payload)
      .then((response) => {
        alert("Update Success");
        navigate("/home", { state: response.data });
        localStorage.setItem("user",JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error(error);
        alert("Unable to Update");
      });
  };

  const handlePersonalEdit = () => {
    if (isPersonalEditable) handleSave();
    setIsPersonalEditable(!isPersonalEditable);
  };

  const handleAddressEdit = () => {
    if (isAddressEditable) handleSave();
    setIsAddressEditable(!isAddressEditable);
  };

  return (
    <div className="container_container h-fit">
      <fieldset className="border p-3 rounded" >
        <legend className="float-none w-auto px-2 ms-4">Profile</legend>

        {/* Profile Header */}
        <div className="profile-header mb-4 text-center">
          <div className="flex justify-center items-center relative">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="rounded-circle border border-3 shadow-sm"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />

            <span
              type="button"
              onClick={() => document.getElementById("imageUpload").click()}
              className="absolute bottom-0 right-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                fill="white"
                className="rounded-full shadow-lg bg-green-600 p-2 border-4 border-white cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7
                      a7 7 0 0 0-5.468 11.37C3.242 11.226 
                      4.805 10 8 10s4.757 1.225 
                      5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </span>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="imageUpload"
              onChange={handleImageChange}
            />
          </div>
          <div className="mt-3 text-start">
            <h4 className="fw-bold">{name || "User Name"}</h4>
            <p className="text-muted text-center">admin</p>
          </div>
        </div>

        {/* Personal Info */}
        <div id="personal_info" className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Personal Information</h3>
            <button
              type="button"
              className="btn btn-success"
              onClick={handlePersonalEdit}
            >
              {isPersonalEditable ? "Save" : "Edit"}
            </button>
          </div>
          <hr />
          <div className="row g-4">
            <div className="col-md">
              <span className="fw-semibold">Name</span>
              <input
                className="form-control border-0 bg-transparent"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isPersonalEditable}
              />
            </div>
            <div className="col-md">
              <span className="fw-semibold">Email</span>
              <input
                className="form-control border-0 bg-transparent"
                type="email"
                value={email}
                  disabled
                  readOnly
              />
            </div>
            <div className="col-md">
              <span className="fw-semibold">Phone</span>
              <input
                className="form-control border-0 bg-transparent"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isPersonalEditable}
              />
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div id="address" className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Address</h3>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddressEdit}
            >
              {isAddressEditable ? "Save" : "Edit"}
            </button>
          </div>
          <hr />
          <div className="row g-4 text-left">
            <div className="col-md">
              <span className="fw-semibold">Country</span>
              <select
                className="form-select border-0 bg-transparent"
                value={Country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={!isAddressEditable}
              >
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="col-md">
              <span className="fw-semibold">City</span>
              <input
                className="form-control border-0 bg-transparent"
                type="text"
                value={City}
                onChange={(e) => setCity(e.target.value)}
                disabled={!isAddressEditable}
              />
            </div>
            <div className="col-md">
              <span className="fw-semibold">Postal Code</span>
              <input
                className="form-control border-0 bg-transparent"
                type="text"
                value={PostalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                disabled={!isAddressEditable}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );

}

export default Home;