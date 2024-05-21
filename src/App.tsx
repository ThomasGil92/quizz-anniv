import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./components/ui/carousel";

const enigmes = [
  {
    question:
      "Quel est le nom du café où nous nous sommes rencontrés pour la première fois ?",
    answers: ["L'avenue", "Leffe", "Café Leffe"],
  },
  {
    question: "Quelle est la date exacte de notre premier voyage ensemble ?",
    type: "date",
    answers: ["12/11/2018"],
  },
  {
    question: "Dans quelle rue à eu lieu notre premier baiser ?",
    answers: ["Rue des frères lumière", "Avenue Albert 1er"],
  },
  {
    question:
      "Où étions-nous quand nous avons pris notre premier selfie ensemble ?",
    answers: ["Paris"],
  },
  {
    question: "Quel est le jour où nous nous sommes dit 'oui' pour la vie ?",
    type: "date",
    answers: ["03/04/2023"],
  },
  {
    question:
      "Quelle est la première ligne du premier message que tu m'as envoyé ?",
    type: "date",
    answers: ["Re (re) hello!"],
  },
];

const App = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const formSchema = z.object({
    response: z.string().min(2, {
      message: "Vous devez répondre!",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      response: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(
      typeof enigmes[step].answers,
      enigmes[step].answers,
      values.response.toLowerCase(),
    );
    // console.log(
    //   enigmes[step]
    //     .answers!.map((answer) => {
    //       return answer.toLowerCase();
    //     })
    //     .includes(values.response.toLowerCase()),
    // );
    if (typeof enigmes[step].answers === "object")
      if (
        enigmes[step].answers
          .map((answer) => {
            return answer.toLowerCase();
          })
          .includes(values.response.toLowerCase())
      ) {
        setError("");
        setShowModal(true);
        form.reset();
      } else {
        setError("Mauvaise réponse, essaie encore.");
      }
  }
  /* const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userAnswer.toLowerCase() === enigmes[step].answer.toLowerCase()) {
      setError("");
      setShowModal(true);
    } else {
      setError("Mauvaise réponse, essaie encore.");
    }
  }; */

  const handleCloseModal = () => {
    setShowModal(false);
    if (step + 1 < enigmes.length) {
      setStep(step + 1);
      api?.scrollNext();
    }
  };

  return (
    <>
      <div className='relative w-screen h-screen flex justify-center items-center'>
        <Carousel setApi={setApi} className='w-full max-w-xs'>
          <CarouselContent>
            {enigmes.map((enigme) => {
              return (
                <CarouselItem key={enigme.question}>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='mx-auto drop-shadow-xl bg-white p-3 rounded-lg rounded-t-none'
                    >
                      <FormField
                        control={form.control}
                        name='response'
                        render={({ field }) => (
                          <FormItem>
                            <Label>{enigme.question}</Label>
                            <FormControl>
                              <Input
                                className='my-6'
                                {...field}
                                /* {...form.register(field.name, {
                                  onChange: (e) => console.log(e.target,field),
                                })} */
                                id={field.name}
                              />
                            </FormControl>
                            <FormMessage className='mb-6' />
                          </FormItem>
                        )}
                      />
                      <div className='text-right'>
                        <Button type='submit' className='align-middle'>
                          Soumettre
                        </Button>
                      </div>

                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                  </Form>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {showModal && (
          <div className='modal'>
            <div className='modal-content'>
              <p>Félicitations ! Indice supplémentaire.</p>
              <button onClick={handleCloseModal}>Fermer</button>
            </div>
          </div>
        )}

        {step === enigmes.length && (
          <p>Félicitations ! Regarde par la fenêtre de notre chambre.</p>
        )}
      </div>
    </>
  );
};

export default App;
