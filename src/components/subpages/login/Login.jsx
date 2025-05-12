import React, { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../context/LoginContext";
import { Button } from "../../shared/Button";
import PageTitle from "../../shared/PageTitle";

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
    <div className="w-[50%]">
      <PageTitle>Zaloguj się</PageTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto"
      >
        <div className="dark:bg-zinc-700 bg-zinc-100">
          <input
            {...register("name")}
            placeholder="Imię"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="dark:bg-zinc-700 bg-zinc-100">
          <input
            type="password"
            {...register("password")}
            placeholder="Hasło"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <Button type={"submit"}>Zaloguj</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
