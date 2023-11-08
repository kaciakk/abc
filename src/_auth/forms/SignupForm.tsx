
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount } from "@/lib/react-query/queriesAndMutations"

const SignupForm = () => {
    const { toast } = useToast()
    const  {mutateAsync: createUserAccount, isLoading: isCreatingUser} = userCreateUserAccount();
        // 1. Define your form.
        const form = useForm<z.infer<typeof SignupValidation>>({
          resolver: zodResolver(SignupValidation),
          defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
          },
        })
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof SignupValidation>) {
            const newUser = await createUserAccount(values);
           if(!newUser) {
            return toast({
                title: "Sign up failed. Please try again",
              });
           }
        }
     
      return (
        <div>
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
            <img src="/assets/images/logo.svg"/>

            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12"> Create a new account</h2>
            <p className="text-ligth-3 small-medium md:base-regular mt-2">To use Snapgram, please enter your details</p>


            
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"
            className="shad-button_primary">
                {isLoading ? (
                    <div className="flex-center gap-2">
                        <Loader /> Loading...
                    </div>
                ): "Sing up"}
                </Button>
                <p className="text-samall-regular text-ligth-2 text-center mt-2">Already have an accoutn?
                <Link to="/sing-in" className="text-primary-500">Log in</Link></p>
          </form>
          </div>
        </Form>
        </div>
      )
}

export default SignupForm

function userCreateUserAccount(): { mutateAsync: any; isLoading: any } {
    throw new Error("Function not implemented.")
}
