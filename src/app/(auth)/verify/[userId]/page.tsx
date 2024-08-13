"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { verifySchema } from "@/schemas/varifySchema";

interface ApiResponse {
  success: boolean;
  message: string;
}

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  console.log(params)
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    console.log(data)
    try {
      const response = await axios.patch<ApiResponse>(`/api/users/verify-otp`, {
        fullname: params.userId,
        code: data.code,
      });

      toast.success("OTP verified successfully!");

      router.replace("/login");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
