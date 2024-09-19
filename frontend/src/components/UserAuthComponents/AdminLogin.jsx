import { useForm } from "react-hook-form";
import Input from "./Input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import conf from "../../conf/conf.js";

function AdminLogin() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLogin = async (data) => {
    const username = data.userName;
    const password = data.password;
    if (username === "" || password === "") {
      alert("fill the blanks");
    } else {
      const bodyjson = {
        userName: username,
        password: password,
      };
      axios
        .post(`${conf.backendURL}/admin/verify`, bodyjson)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          dispatch(
            login({
              name: username,
              isAdmin: true,
            })
          );
          navigate(`/adminpanel?username=${username}`);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div className="max-w-[230px] sm:max-w-lg">
      <h2 className="text-center text-xl sm:text-2xl font-bold">Admin Login</h2>
      {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
      <form onSubmit={handleSubmit(adminLogin)} className="mt-3">
        <div className="space-y-5 w-full">
          <Input
            label="Username: "
            placeholder="Enter your username"
            type="text"
            {...register("userName", {
              required: true,
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <button
            type="submit"
            className="w-full py-1 rounded-md bg-blue-500 text-white font-bold"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
