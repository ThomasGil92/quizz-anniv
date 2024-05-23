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
  type CarouselApi,
} from "./components/ui/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "./lib/utils";
import { Calendar } from "./components/ui/calendar";
import Slide from "./presentation/Slide";

const enigmes:{question:string,answers:string[],type?:string}[] = [
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
    question: "Dans quelle rue a eu lieu notre premier baiser ?",
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
    answers: ["Re (re) hello!"],
  },
];

const App = () => {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const [api, setApi] = useState<CarouselApi>();
  

  const handleSubmit = (values) => {
    console.log(values)
    // const currentEnigme = enigmes[step];
    
    // const userResponse =
    //   currentEnigme.type === "date" && date
    //     ? format(date, "dd/MM/yyyy")
    //     : values.response;

    // if (
    //   currentEnigme.answers
    //     .map((answer) => answer.toLowerCase())
    //     .includes(userResponse.toLowerCase())
    // ) {
      setShowModal(true);
    // } else {
    //   form.setError("response", {
    //     type: "custom",
    //     message: "Mauvaise réponse",
    //   });
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (step + 1 < enigmes.length) {
      setStep(step + 1);
      // form.reset();
      // setDate(undefined); // Reset the date if it was a date question
      api?.scrollTo(step+1);
    }
  };

  return (
    <>
      <div className='relative w-screen h-screen flex justify-center items-center'>
        
        <Carousel setApi={setApi} className='w-full max-w-xs'>
          <CarouselContent draggable="false">
            {enigmes.map((enigme, index) => (
              <Slide key={index} enigme={enigme} onSubmit={handleSubmit}/>
            ))}
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
