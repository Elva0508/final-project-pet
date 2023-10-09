import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
  const initialValues = {
    userName: "",
    signupEmail: "",
    signupPassword: "",
    rePassword: "",
    confirm: false,
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("請輸入姓名"),
    signupEmail: Yup.string()
      .email("請輸入有效的電子信箱")
      .required("請輸入電子信箱"),
    signupPassword: Yup.string()
      .min(6, "密碼至少需要 6 個字元")
      .required("請輸入密碼"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("signupPassword"), null], "密碼不一致")
      .required("請再次輸入密碼"),
    confirm: Yup.boolean().oneOf([true], "請閱讀並同意使用規範"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="email-signup">
          <div className="u-form-group mb-3">
          
            <Field
              className="form-input"
              type="text"
              name="userName"
              id="userName"
              placeholder="請輸入姓名"
            />
            <ErrorMessage
              className="form-alert"
              name="userName"
              component="div"
            />
          </div>
          <div className="u-form-group mb-3">
        
            <Field
              className="form-input"
              type="email"
              name="signupEmail"
              id="signupEmail"
              placeholder="請輸入信箱"
            />
            <ErrorMessage
              className="form-alert"
              name="signupEmail"
              component="div"
            />
          </div>
          <div className="u-form-group mb-3">
    
            <Field
              className="form-input"
              type="password"
              name="signupPassword"
              id="signupPassword"
              placeholder="請輸入密碼"
            />
            <ErrorMessage
              className="form-alert"
              name="signupPassword"
              component="div"
            />
          </div>
          <div className="u-form-group mb-3">
      
            <Field
              className="form-input"
              type="password"
              name="rePassword"
              id="rePassword"
              placeholder="請再次輸入密碼"
            />
            <ErrorMessage
              className="form-alert"
              name="rePassword"
              component="div"
            />
          </div>
          <div className="u-form-group mb-3">
            <Field
              className="form-input"
              type="checkbox"
              name="confirm"
              id="confirm"
            />
            <label htmlFor="confirm">已閱讀使用規範</label>
            <ErrorMessage
              className="form-alert"
              name="confirm"
              component="div"
            />
          </div>
          <div className="u-form-group">
            <button type="submit" className="btn-brown">
              註冊
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;