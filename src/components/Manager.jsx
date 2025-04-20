import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    // to load password if already exists
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copytext = (text) => {
    toast("🦄 Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showpassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("/icons/hidden.png")) {
      ref.current.src = "/icons/eye.png";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "/icons/hidden.png";
      passwordref.current.type = "password";
    }
  };

  const savePassword = () => {
    const { site, username, password } = form;
    if (site === "" || username === "" || password === "") {
    toast.error("Please enter all required fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        closeButton: true,
      });
    } else {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
      toast("Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
    }
  };
  const deletePassword = (id) => {
    console.log("Deleting password through ID", id);
    let c = confirm("Do you want to Delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("👀 Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const editPassword = (id) => {
    console.log("Editing password through ID", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="mycontainer md:max-w-[65vw] p-2 pt-6 ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Password
          <span className="text-green-500">Manager/ &gt;</span>
        </h1>
        <p className="text-green-900 font-bold text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-10/10 justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full min-w-[15vw] p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 top-2 bottom-1 cursor-pointer "
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className=""
                  width={18}
                  src="./public/icons/eye.png"
                  alt="show"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit font-bold border-green-900 border"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-3">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to how</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden mb-10 rounded-md">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blanck">
                            {item.site}
                          </a>
                          <div
                            className="copybtn size-7 p-1 "
                            onClick={() => {
                              copytext(item.site);
                            }}
                          >
                            <img
                              className="cursor-pointer "
                              width={25}
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="copybtn size-7 p-1 "
                            onClick={() => {
                              copytext(item.username);
                            }}
                          >
                            <img
                              className="cursor-pointer "
                              width={25}
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="copybtn size-7 p-1 "
                            onClick={() => {
                              copytext(item.password);
                            }}
                          >
                            <img
                              className="cursor-pointer "
                              width={25}
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
