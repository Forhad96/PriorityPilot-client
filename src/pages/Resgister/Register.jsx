import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useXiosSecure from "../../hooks/secure/useXiosSecure";
import useAuth from "../../hooks/Auth/UseAuth";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;
export function Register() {
  const axiosSecure = useXiosSecure(baseURL);
  const { createUser } = useAuth();
  const goTo = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;

      // Step 1: Create the user
      const userRes = await createUser(email, password);
      console.log(userRes);
      if (userRes.user) {
        // Step 2: Update user profile
        //  await updateProfile(name);

        // Step 3: Notify success
        toast.success("Account created successfully");

        // Step 4: Make a POST request to the '/users' endpoint
        const res = await axiosSecure.post("/users", data);
        goTo(location.pathname ? location.state : "/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    }
  };

  // console.log(watch("example")); // watch input value by passing the name of it
  return (
    <Card
      className="flex items-center justify-center h-screen"
      color="transparent"
      shadow={false}
    >
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            {...register("name", { required: true })}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            {...register("email", { required: true })}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            {...register("password", { required: true })}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />

        <Button type="submit" className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Login
          </a>
        </Typography>
      </form>
      <SocialLogin />
    </Card>
  );
}
