import React, { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoginContext, LoginProvider } from "../../../context/LoginContext";

const loginSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setIsUserLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?firstName=${data.name}`
      );
      const user = response.data[0];

      if (!user || user.password !== data.password) {
        enqueueSnackbar("Nieprawidłowy imię lub hasło", { variant: "error" });
        return;
      }

      enqueueSnackbar("Zalogowano pomyślnie", { variant: "success" });
      localStorage.setItem("user", data.name);
      setIsUserLoggedIn(true);
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Wystąpił błąd podczas logowania", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <div>
        <label>Imię</label>
        <input {...register("name")} />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label>Hasło</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Zaloguj
      </button>
    </form>
  );
};

export default Login;
