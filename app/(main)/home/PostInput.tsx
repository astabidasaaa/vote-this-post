"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircledIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
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
    .max(280)
    .regex(/\S.*$/),
  // .max(280, { message: "Post must be 280 or fewer characters long" }),
  candidates: z
    .array(candidateSchema)
    .nonempty({
      message: "Can't be empty!",
    })
    .min(2, "must contain 2 or more items")
    .max(6, "must contain 6 or fewer items"),
});

const PostInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postBody: "",
      candidates: [{ candidateBody: "" }, { candidateBody: "" }],
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
        body: JSON.stringify({ postBody: postBody.trim(), candidates }),
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
        form.reset();
        // document.querySelector('div[data-inputid="postTextArea"]').innerText =
        //   "";
        console.log(test);
      }
    } catch (err: any) {
      alert("Oops! Something went wrong. Please try again later");
    }
  };

  const [content, setContent] = useState("");

  const handleChange = (event: any) => {
    setContent(event.target.innerText);
    form.setValue("postBody", event.target.innerText.toString());
    // console.log(event.target.innerText);
  };

  // useEffect(() => {
  //   console.log(`content: ${content}`);
  // }, [content]);

  // useEffect(() => {
  //   document.get;
  // });

  // =============== NOTES ===============
  // ketika prompt value error (>280), tombol post tidak langsung disabled. cek div onInput

  return (
    <Card className="w-full max-w-xl">
      {/* <CardHeader> */}
      {/* <CardTitle>Create your prompt</CardTitle> */}
      {/* <CardDescription>Post your new prompt in one-click</CardDescription> */}
      {/* </CardHeader> */}
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="postBody"
                render={({ field }) => (
                  <>
                    <div className="relative w-full overflow-auto max-h-[240px] pb-2 mb-2 border-b-[1px]">
                      {/* <div
                        // {...form.register("postBody")}
                        // onChange={(e) =>
                        //   console.log(
                        //     form.setValue("postBody", e.target.innerText)
                        //   )
                        // }
                        // onInput={(e: any) => console.log(field)}
                        onInput={(e: any) => {
                          // form.setValue(
                          //   "postBody",
                          //   e.target.innerText.toString(),
                          //   { shouldValidate: true }
                          // );

                          handleChange(e);

                          // console.log(field.value);
                        }}
                        // onBlur={() => field.onBlur()}
                        // onBlur={() => console.log("blur")}
                        // onChange={() => console.log("change")}
                        // onFocus={() => console.log("focus")}
                        // onInput={(e) => handleChange(e)}
                        tabIndex={0}
                        contentEditable="plaintext-only"
                        role="textbox"
                        // {...field}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        data-inputid="postTextArea"
                        className="focus:outline-none select-text whitespace-pre-wrap break-words"
                      >
                        {/* <span>{form.getValues("postBody")}</span> */}
                      {/* <span>{field.value}</span> */}
                      {/* {form.getValues("postBody")} */}
                      {/* </div> */}
                      {/* {field.value.length <= 0 && (
                        <span className="text-muted-foreground absolute top-0 pointer-events-none select-none">
                          Ask your question
                        </span>
                      )} */}
                      {/* <textarea
                        {...field}
                        className="w-full resize-none focus:outline-none select-text whitespace-pre-wrap break-words min-h-[72px] max-h-[200px] pr-1"
                      ></textarea> */}
                      <Textarea
                        placeholder="Ask your question"
                        className="text-base border-none resize-none min-h-[80px]"
                        {...field}
                      />
                      {/* <Input
                        type="hidden"
                        placeholder="Your question"
                        {...field}
                        // value={content}
                      /> */}
                      <FormDescription
                        className={`${
                          field.value.length <= 280
                            ? "text-muted-foreground"
                            : "text-destructive"
                        } text-xs text-end`}
                      >
                        {280 - field.value.length || "0"}
                      </FormDescription>
                    </div>

                    {/* <FormMessage /> */}
                  </>
                )}
              />

              <ul className="flex flex-col justify-start items-start gap-4">
                {fields.map((item, index) => {
                  return (
                    <li key={item.id} className="w-full flex flex-col gap-1">
                      <FormField
                        control={form.control}
                        name={`candidates.${index}.candidateBody`}
                        render={({ field }) => (
                          <>
                            <div className="flex flex-row w-full justify-end items-start gap-2">
                              <div className="relative flex flex-col w-full gap-1">
                                <FormItem className="relative flex w-full items-center justify-center space-x-2">
                                  <FormControl>
                                    <Input
                                      autoComplete="off"
                                      placeholder={`Choice ${index + 1}`}
                                      maxLength={32}
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                                <FormDescription className="absolute bottom-1 right-2 self-end text-end text-xs">
                                  {field.value.length} / 32
                                </FormDescription>
                                {/* <div className="flex flex-row justify-end items-center w-full">
                                  <FormMessage />
                                  <FormDescription className="self-end text-end text-xs">
                                    {field.value.length} / 32
                                  </FormDescription>
                                </div> */}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={fields.length <= 2}
                                onClick={() => remove(index)}
                              >
                                <TrashIcon />
                              </Button>
                            </div>

                            {/* <FormMessage /> */}
                          </>
                        )}
                      />
                    </li>
                  );
                })}
              </ul>
              <Button
                type="button"
                variant="ghost"
                onClick={() => append({ candidateBody: "" })}
                disabled={fields.length >= 6}
              >
                <PlusCircledIcon className="mr-2" />
                add
              </Button>
              {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Candidate 1</Label>
                <Input id="name" placeholder="Your candidate" />
              </div> */}

              <CardFooter className="flex justify-end p-0">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button
                  type="submit"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  {form.formState.isSubmitting ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Post"
                  )}
                </Button>
                {/* <Button
                  type="button"
                  onClick={() => console.log(form.getValues("postBody"))}
                >
                  test
                </Button>
                <Button
                  type="button"
                  onClick={() => console.log(form.formState.isValid)}
                >
                  valid?
                </Button> */}
              </CardFooter>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PostInput;

// {/* <FormField
//   control={form.control}
//   name="postBody"
//   render={({ field }) => (
//     <FormItem>
//       {/* <FormLabel className="font-bold">Username</FormLabel> */}
//       <FormControl>
//         <div
//           className="w-full min-h-8 max-h-[720px] text-xl break-words focus:outline-none focus:border-none"
//           contentEditable="true"
//           {...field}
//           placeholder="test"
//           onInput={handleChange}
//           onChange={() => field.onChange()}
//           // {...form.register("postBody")}
//           // dangerouslySetInnerHTML={{ __html: content }}
//         >
//           {/* <span
//                           className="w-full"
//                           // contentEditable="true"
//                           placeholder="test"
//                           // {...field}
//                         ></span> */}
//           {/* <span></span> */}
//         </div>
//         {/* <Input
//                         className="text-pretty overflow h-auto max-h-64 break-words"
//                         placeholder="Your question"
//                         {...field}
//                       /> */}
//       </FormControl>
//       <FormLabel className=" text-xs" onClick={() => console.log(field)}>
//         {280 - field.value.length}
//       </FormLabel>
//       {/* <FormMessage /> */}
//     </FormItem>
//   )}
// />; */}
