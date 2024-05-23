import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "./components/ui/carousel";

import Slide from "./presentation/Slide";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

const enigmes: {
  question: string;
  answers: string[];
  type?: string;
  indice?: string;
}[] = [
  {
    question:
      "Quel est le nom du café où nous nous sommes rencontrés pour la première fois ?",
    answers: ["L'avenue", "Leffe", "Café Leffe"],
    indice: "Tu peux te rendre dans la cuisine.",
  },
  {
    question: "Quelle est la date exacte de notre premier voyage ensemble ?",
    type: "date",
    answers: ["12/11/2018"],
    indice: "Tu peux te rendre dans le garage.",
  },
  {
    question: "Dans quelle rue a eu lieu notre premier baiser ?",
    answers: ["Rue des frères lumière", "Avenue Albert 1er"],
    indice: "Tu peux te rendre dans mon bureau.",
  },
  {
    question:
      "Tu dois retrouver le code gardé précieusement par le dragon. Une fois récupéré, indique le code:",
    answers: ["260523"],
    indice: "Tu peux te rendre dans TON bureau.",
  },
  {
    question:
      "Trouve l'indice caché dans la boite de pandore. Pour résoudre cette énigme, tu as le droit de retourner dans le salon. Puis indique le code:",
    answers: ["jtm"],
    indice: "Tu peux te rendre dans la chambre du petit.",
  },
  {
    question:
      "Où étions-nous quand nous avons pris notre premier selfie ensemble ?",
    answers: ["Paris"],
    indice: "Tu peux te rendre dans la chambre du petit.",
  },
  {
    question:
      "Dans l'endroit dans lequel rien ne tient, tu trouveras un code. Une fois récupéré, indique le code:",
    type: "date",
    answers: ["060818"],
    indice:
      "Tu peux te rendre dans les toilettes ... je plaisante. Vas dans la salle de bain.",
  },
  {
    question: "Quel est le jour où nous nous sommes dit 'oui' pour la vie ?",
    type: "date",
    answers: ["03/04/2023"],
    indice: "Tu peux te rendre dans notre chambre.",
  },
  {
    question:
      "Quelle est la première ligne du premier message que tu m'as envoyé ?",
    answers: ["Re (re) hello!"],
    indice: "Tu peux regarder par la fenêtre et découvrir une surprise",
  },
];

const App = () => {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [begin, setBegin] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  const handleSubmit = () => {
   
    setShowModal(true);
    
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (step + 1 < enigmes.length) {
      setStep(step + 1);
      api?.scrollTo(step + 1);
    }
  };

  return (
    <>
      <div className='relative w-dvw h-dvh flex justify-center items-center'>
        {!begin && (
          <Card className='w-4/5'>
            <CardHeader>
              <CardTitle>Joyeux anniversaire de mariage Marie-Lys*!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-3'>
                Aujourd'hui est un jour spécial pour nous deux, et comme nous
                n'avons pas encore d'argent à claquer, je me suis servi de mon
                temps pour te faire ce petit jeu.
              </p>
              <p className='mb-3'>
                Tu vas devoir répondre à plusieurs questions nous concernant, si
                tu te trompes (la honte!!!) tu ne pourras pas passer à l'étape
                suivante.
              </p>
              <p>Bonne chance</p>
            </CardContent>

            <CardFooter className='block text-center'>
              <Button onClick={() => setBegin(true)} className='text-white'>
                Commencer le jeu
              </Button>
              <small className='block text-left mt-3'>
                * Vaut pour un déchipsage
              </small>
            </CardFooter>
          </Card>
        )}
        {begin && (
          <Carousel setApi={setApi} className='w-full max-w-xs'>
            <CarouselContent draggable='false'>
              {enigmes.map((enigme, index) => (
                <Slide key={index} enigme={enigme} onSubmit={handleSubmit} />
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {showModal && (
          <div className='modal'>
            <div className='modal-content text-left'>
              <div className='flex justify-between items-center'>
                <p>Bravo !</p>
                <Button onClick={handleCloseModal} className='mb-5 text-white'>
                  <i
                    className='fa-solid fa-xmark'
                    style={{ color: "white", width: "100%" }}
                  ></i>
                </Button>
              </div>
              <hr />
              <p className='mt-5'>{enigmes[step].indice}</p>
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
