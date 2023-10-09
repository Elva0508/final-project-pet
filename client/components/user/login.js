import { useEffect } from "react";
import { useRouter } from "next/router"; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
// import {Icon} from 'react-icons-kit';
// import {eyeOff} from 'react-icons-kit/feather/eyeOff';
// import {eye} from 'react-icons-kit/feather/eye'

import { useAuth } from "@/context/fakeAuthContext";

export default function Login() {

 // const [icon, setIcon] = useState(eyeOff);
  
  const { login, isAuthenticated } = useAuth();
  const router = useRouter(); 

  // const handleToggleEye=()=>{
  //   if(type === "password"){
  //     setIcon(eye)
  //     setType("text")
  // }else{
  //     setIcon(eyeOff)
  //     setType("password")
  // }

  useEffect(
    function () {
      if (isAuthenticated) router.replace("/member/profile"); 
    },
    [isAuthenticated, router]
  );


  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("email格式不正確").required("帳號不能為空"),
    password: Yup.string().required("密碼不能為空")
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:3005/api/auth-jwt/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const u = decodedToken.id;
        localStorage.setItem('data',  JSON.stringify(decodedToken));
        localStorage.setItem('id', u);

        login(token);
        //router.push('/member/profile');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="email-signup">
          <div className="u-form-group mb-3">
            <Field
              className="form-input center-input"
              type="email"
              id="email"
              name="email"
              placeholder="請輸入email"
            />
            <ErrorMessage name="email" component="div" className="error form-alert" />
          </div>

          <div className="u-form-group mb-3">
            <Field
              className="form-input center-input"
              type="password"
              id="password"
              name="password"
              placeholder="請輸入密碼"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error form-alert"
            />
          </div>

          <div className="u-form-group">
            <button
              type="submit"
              className="btn-brown py-2 mt-4"
              disabled={isSubmitting}
            >
              登入
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}