import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";
import PageTitle from "./PageTitle";
import postNewPokemon from "../../services/postNewPokemon";
import PokemonCarousel from "./PokemonCarousel";

const schema = z.object({
  name: z.string().min(5, "Nazwa musi mieć minimum 5 znaków"),
  ability: z.string().min(5, "Ability musi mieć minimum 5 znaków"),
  height: z
    .number()
    .min(1, "Height musi mieć przynajmniej 1 cyfrę")
    .max(1000, "Height nie może być większe od 1000 "),
  weight: z
    .number()
    .min(1, "Weight musi mieć przynajmniej 1 cyfrę")
    .max(1000, "Weight nie może być większe od 1000 "),
  base_experience: z
    .number()
    .min(1, "Base_experience musi mieć przynajmniej 1 cyfrę")
    .max(1000, "Base_experience nie może być większe od 1000 "),
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

  const [selectedImgUrl, setSelectedImgUrl] = useState("");

  const onSubmit = (data) => {
    const newPokemon = {
      name: data.name,
      imgUrl: selectedImgUrl,
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
    <div className="dark:bg-zinc-800 rounded-lg py-10 px-10 flex flex-col gap-5">
      <PageTitle>Stwórz własnego Pokemona</PageTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto"
      >
        <div className="dark:bg-zinc-700 bg-zinc-100">
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="dark:bg-zinc-700 bg-zinc-100">
          <input
            {...register("height", { valueAsNumber: true })}
            placeholder="Height"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.height && (
            <p className="text-red-600 text-sm">{errors.height.message}</p>
          )}
        </div>
        <div className="dark:bg-zinc-700 bg-zinc-100">
          <input
            {...register("base_experience", { valueAsNumber: true })}
            placeholder="Base_experience"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.base_experience && (
            <p className="text-red-600 text-sm">
              {errors.base_experience.message}
            </p>
          )}
        </div>
        <div className="dark:bg-zinc-700 bg-zinc-100">
          <input
            {...register("weight", { valueAsNumber: true })}
            placeholder="Weight"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.weight && (
            <p className="text-red-600 text-sm">{errors.weight.message}</p>
          )}
        </div>
        <div className="dark:bg-zinc-700 bg-zinc-100">
          <input
            {...register("ability")}
            placeholder="Ability"
            className="w-full border p-2 rounded dark:placeholder-yellow-500 placeholder-gray-400"
          />
          {errors.ability && (
            <p className="text-red-600 text-sm">{errors.ability.message}</p>
          )}
        </div>
        <div>
          <PokemonCarousel onImageChange={setSelectedImgUrl} />
        </div>
        <div className="flex justify-center mt-5">
          <Button type="submit">Stwórz</Button>
        </div>
      </form>
    </div>
  );
};

export default NewPokemonForm;
