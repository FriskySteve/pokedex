import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSnackbar } from "notistack";
import { Button } from "../../shared/Button";
import PageTitle from "../../shared/PageTitle";

const schema = z
  .object({
    firstName: z.string().min(3, "Imię musi mieć minimum 3 znaki"),
    email: z.string().email("Nieprawidłowy adres email"),
    password: z
      .string()
      .min(8, "Hasło musi mieć minimum 8 znaków")
      .regex(/[A-Z]/, "Hasło musi zawierać dużą literę")
      .regex(/[0-9]/, "Hasło musi zawierać cyfrę")
      .regex(/[^a-zA-Z0-9]/, "Hasło musi zawierać znak specjalny"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Hasła muszą być takie same",
    path: ["repeatPassword"],
  });

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${data.email}`
      );

      if (response.data.length > 0) {
        enqueueSnackbar("Użytkownik o takim emailu już istnieje", {
          variant: "warning",
        });
      } else {
        await axios.post("http://localhost:3000/users", {
          firstName: data.firstName,
          email: data.email,
          password: data.password,
        });
        enqueueSnackbar("Rejestracja zakończona sukcesem", {
          variant: "success",
        });
        reset();
      }
    } catch (error) {
      enqueueSnackbar(`Wystąpił błąd podczas rejestracji: ${error}`, {
        variant: "error",
      });
    }
  };

  return (
    <div className="">
      <PageTitle>Formularz rejestracyjny</PageTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto"
      >
        <div>
          <input
            {...register("firstName")}
            placeholder="Imię"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Hasło"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("repeatPassword")}
            placeholder="Powtórz hasło"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.repeatPassword && (
            <p className="text-red-600 text-sm">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <Button type="submit">Zarejestruj</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
