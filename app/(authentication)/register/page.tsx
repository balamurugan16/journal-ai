"use client";
import googleIcon from '@/assets/icons8-google-50.png'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import Link from 'next/link';
import { supabaseBrowserClient } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email("This is not a valid email"),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    })
  }
})

type FormSchema = z.infer<typeof formSchema>;

export default function Register() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const supabase = supabaseBrowserClient()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(values: FormSchema) {
    setLoading(true)
    const res = await supabase.auth.signUp(values);
    setLoading(false)
    if (res.error) {
      toast({
        title: res.error.message,
        variant: "destructive"
      })
    } else {
      toast({
        title: "Hurray! You have successfully registered 🙌",
      })
      setTimeout(() => {
        router.push("/journals")
      }, 2000)
    }
  }

  async function signInWithGoogle() {
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    })
    if (res.error) {
      toast({
        title: "Something went wrong, please try again!"
      })
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-2" >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="w-full font-semibold">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
            Register
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <p className="bg-background px-2 text-muted-foreground">
            Or continue with
          </p>
        </div>
      </div>
      <Button onClick={() => signInWithGoogle()} className="w-full font-semibold flex justify-center items-center gap-2">
        <Image
          src={googleIcon}
          width={18}
          alt="google icon"
        />
        &nbsp;
        Sign up with Google
      </Button>
      <p className="text-sm">
        Already have an account? &nbsp;
        <Link className="text-[teal] font-semibold" href="/signin">Sign in</Link>
      </p>
      <Toaster />
    </div>
  )
}

