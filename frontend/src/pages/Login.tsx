import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, logoutUser } from "../redux/slices/user";
import { loginBodyData } from "../api/userApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const LoginPage = () => {
  const { username, token, isLoginSuccessful } = useAppSelector(
    (state) => state.user,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Required")
      .min(5, "Too Short!")
      .max(20, "Too Long!"),
    password: yup
      .string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      const loginBody: loginBodyData = { username, password };
      dispatch(loginUser(loginBody));
    },
  });
  const { errors, touched } = formik;

  useEffect(() => {
    if (isLoginSuccessful === false) {
      toast.error("🦄 Wrong login or password", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      dispatch(logoutUser());
    }
    if (username !== null && token !== null) navigate("/");
    if (inputRef.current) inputRef.current?.focus();
  }, [username, isLoginSuccessful]);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    ref={inputRef}
                    placeholder="Ваш ник"
                  />
                  <label htmlFor="username">Ваш ник</label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  Войти
                </Button>
              </Form>
              {touched.username && touched.password ? (
                <div style={{ color: "red" }}>
                  <span>{errors.username}</span>
                  {errors.username ? <br /> : null}
                  <span>{errors.password}</span>
                </div>
              ) : null}
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </div>
  );
};

export default LoginPage;
