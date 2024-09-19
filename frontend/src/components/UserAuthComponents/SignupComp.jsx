import { useState } from "react";
import authService from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

function SignupComp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation(["user"]);

  const create = async (data) => {
    setError("");
    try {
      console.log(data);
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`mx-auto w-full bg-gray-100 rounded-xl  flex justify-center items-center`}
    >
      <div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label={t("labels.name")}
              placeholder={t("placeholders.name")}
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label={t("labels.email")}
              placeholder={t("placeholders.email")}
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label={t("labels.password")}
              type="password"
              placeholder={t("placeholders.password")}
              {...register("password", {
                required: true,
              })}
            />
            <button
              type="submit"
              className="w-full py-1 rounded-md bg-blue-500 text-white font-bold"
            >
              {t("btns.b1")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupComp;
