import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";
import PageTitle from "./PageTitle";
import postNewPokemon from "../../services/postNewPokemon";

const schema = z.object({
  name: z.string().min(5, "Nazwa musi mieć minimum 5 znaków"),
  ability: z.string().min(5, "Ability musi mieć minimum 5 znaków"),
  height: z
    .string()
    .min(1, "Height musi mieć przynajmniej 1 cyfrę")
    .regex(/[0-9]/, "Height musi być liczbą.")
    .max(1000, "Height nie moe być większe od 1000 "),
  weight: z
    .string()
    .min(1, "Weight musi mieć przynajmniej 1 cyfrę")
    .regex(/[0-9]/, "Weight musi być liczbą.")
    .max(1000, "Weight nie moe być większe od 1000 "),
  base_experience: z
    .string()
    .min(1, "Base_experience musi mieć przynajmniej 1 cyfrę")
    .regex(/[0-9]/, "Base_experience musi być liczbą.")
    .max(1000, "Base_experience nie moe być większe od 1000 "),
});

const NewPokemonForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    const newPokemon = {
      name: data.name,
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg",
      stats: {
        height: data.height,
        base_experience: data.base_experience,
        weight: data.weight,
        ability: data.ability,
      },
    };
    postNewPokemon(newPokemon);
    reset();
  };

  return (
    <div className="">
      <PageTitle>Stwórz własnego Pokemona</PageTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto"
      >
        <div>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("height")}
            placeholder="Height"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.height.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("base_experience")}
            placeholder="Base_experience"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">
              {errors.base_experience.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("weight")}
            placeholder="Weight"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.weight.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("ability")}
            placeholder="Ability"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.ability.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <Button type="submit">Stwórz</Button>
        </div>
      </form>
    </div>
  );
};

export default NewPokemonForm;
