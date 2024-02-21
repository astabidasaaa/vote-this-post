import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const candidateSchema = z.object({
  candidateBody: z
    .string()
    .min(1, { message: "Candidate must have content" })
    .max(32, { message: "Candidate must be 32 or fewer characters long" }),
});

const formSchema = z.object({
  postBody: z
    .string()
    .min(1, { message: "Post must have content" })
    .max(280, { message: "Post must be 280 or fewer characters long" }),
  candidates: z.array(candidateSchema),
});

const PostInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postBody: "",
      candidates: [],
    },
  });

  const { fields, append, remove } = useFieldArray<z.infer<typeof formSchema>>({
    control: form.control,
    name: "candidates",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { postBody, candidates } = values;

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postBody, candidates }),
      });

      if (res.ok) {
        const test = await res.json();
        //   await signIn("credentials", {
        //     username,
        //     password,
        //     redirect: true,
        //     callbackUrl: "/home",
        //   });

        //     // await fetch("/api/auth/login", {
        //     //   method: "POST",
        //     //   headers: {
        //     //     "Content-Type": "application/json",
        //     //   },
        //     //   body: JSON.stringify({ username, password }),
        //     // });
        console.log(test);
      }
    } catch (err: any) {
      alert("Oops! Something went wrong. Please try again later");
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="postBody"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="font-bold">Username</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Your vote prompt" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <FormField
                        control={form.control}
                        name={`candidates.${index}.candidateBody`}
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel className="font-bold">Username</FormLabel> */}
                            <FormControl>
                              <Input placeholder="Your candidate" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <button type="button" onClick={() => remove(index)}>
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={() => append({ candidateBody: "" })}
              >
                append
              </button>
              {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Candidate 1</Label>
                <Input id="name" placeholder="Your candidate" />
              </div> */}

              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Post"
                  )}
                </Button>
              </CardFooter>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PostInput;
