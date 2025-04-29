import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SnackbarProvider, useSnackbar } from "notistack";

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
      enqueueSnackbar("Wystąpił błąd podczas rejestracji", {
        variant: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <div>
        <label>Imię</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Hasło</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Powtórz hasło</label>
        <input type="password" {...register("repeatPassword")} />
        {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
      </div>
      <button type="submit">Zarejestruj</button>
    </form>
  );
};

const RegisterWrapper = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
    <Register />
  </SnackbarProvider>
);

export default RegisterWrapper;
