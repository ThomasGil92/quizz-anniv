import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

interface SlideProps {
  enigme: { question: string; answers: string[]; type?: string };
  onSubmit: (values: { response: string }) => void;
}

const Slide = ({ enigme, onSubmit }: SlideProps) => {
  const [date, setDate] = useState<Date>();

  const formSchema = z.object({
    response:
      enigme.type === "date"
        ? z
            .string()
            .refine(
              () => {
                const val = new Date(date!);
                //console.log(date && format(date,"dd/MM/yyyy"))
                return date && !isNaN(val.getTime());
              },
              { message: "Mauvaise date" },
            )
            .refine(
              () => {
                return enigme.answers.includes(
                  format(new Date(date!), "dd/MM/yyyy"),
                );
              },
              {
                message: "Pas du tout!",
              },
            )
        : z
            .string()
            .refine(
              (val) =>
                enigme.answers
                  .map((answer) => answer.toLowerCase())
                  .includes(val.toLowerCase().trim()),
              {
                message: "FAUX!",
              },
            ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      response: "",
    },
  });
  return (
    <CarouselItem draggable='false' key={enigme.question}>
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
                <Label >{enigme.question}</Label>
                <FormControl>
                  {enigme.type === "date" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal mt-3",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {date ? (
                            format(date, "dd/MM/yyy")
                          ) : (
                            <span>Choisir une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        {/* <PopoverClose> */}
                        <Calendar
                          locale={fr}
                          mode='single'
                          captionLayout='dropdown-buttons'
                          selected={date}
                          onSelect={setDate}
                          fromYear={1960}
                          toYear={2030}
                          initialFocus
                         
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Input className='my-6' {...field} id={field.name} />
                  )}
                </FormControl>
                <FormMessage className='mb-3 text-center text-xl font-extrabold' />
              </FormItem>
            )}
          />
          <div className='text-center'>
            <Button type='submit' className='align-middle text-white mt-3'>
              Soumettre
            </Button>
          </div>
        </form>
      </Form>
    </CarouselItem>
  );
};
export default Slide;
