"use client"
import { useFormik } from "formik"
import Link from "next/link";
import axios from "axios";
import * as Yup from 'yup';
import { useState } from "react";
import { useRouter } from 'next/navigation'

function Home() {
  const router = useRouter()
  const [response, setResponse] = useState()
  const [submitError, setSubmitError] = useState()
  const initialValues = {
    username: '',
    password: '',
  };
  const { handleChange, handleSubmit, values, touched, errors } = useFormik({

    initialValues: initialValues,
    validationSchema: Yup.object({
      username: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {

      try {
        const response = await axios.post(
          'http://0.tcp.in.ngrok.io:17193/api/v1/login/',
          values
        );
        console.log(response.data.message, "response data");
        setResponse(response.data.message)
        if (response.data.data.access) {
          router.push("/chatpage")
        }
      } catch (error) {
        console.log('Error submitting form:', error.response.data.non_field_errors);
        setSubmitError(error.response.data.non_field_errors);

      }
    },
  })



  return (
    <form className=" flex flex-col justify-center items-center  mx-auto mt-[10%] w-[40%]  bg-white shadow-md rounded px-5 pt-4 pb-5 mb-4 " onSubmit={handleSubmit}>
      <h3 className="text-bold">Login to ChatApp </h3>
      <h4 className="text-bold text-blue-600">{response} </h4>
      <h4 className="text-bold text-red-600">{submitError} </h4>

      <div className="mb-1 w-[70%]">
        <label htmlFor="email" className="block text-gray-700 text-xs  mb-2">
          Email
        </label>
        <input
          type="email"
          name="username"
          id="email"
          className=" border rounded w-full  px-3 text-gray-700  "
          onChange={handleChange}

        />
        {errors.username && touched.username ? <div className="text-red-600 w-full text-xs">{errors.username}</div> : null}
      </div>

      <div className="mb-2 w-[70%]">
        <label htmlFor="password" className="block text-gray-700 text-xs  mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className=" border rounded w-full  px-3 text-gray-700  "
          onChange={handleChange}

        />
        {errors.password && touched.password ? <div className="text-red-600 text-xs w-full">{errors.password} </div> : null}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white   px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>

      <Link href="/signup">
        <span className="text-xs">Don't have account Sign up</span>
        <hr className="border" />
      </Link>

    </form>

  )
}
export default Home