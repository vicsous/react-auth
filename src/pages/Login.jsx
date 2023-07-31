
import { login } from "../store/userSlice";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as Yup from 'yup';

export default function Login () {
    const [ loading, setLoading ] = useState(false);
  
    const dispatch = useDispatch();
  
    const initialValues = {
        email: '',
        password: ''
    }
  
    const validationSchema = Yup.object({
        email: Yup.string()
        .email('E-mail inválido')
        .min(2, 'O e-mail deve ter pelo menos 2 caracteres')
        .max(128, 'O e-mail deve ter no máximo 128 caracteres'),
        password: Yup.string().required('Campo obrigatório')
      });
    
    const handleSubmit = (values) => {
        setLoading(true)
        dispatch(login(values))
          .then(data=> {
            localStorage.setItem('accessToken', data.payload.accessToken)
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => {
            setLoading(false)
          })
    }
  
    const user = useSelector(state => state.user)
  
    return (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              <Form >
                  <div>{user?.error}</div>
                  <div >
                      <label htmlFor="email">Email:</label>
                      <Field type="text" id="email"name="email"/>
                      <ErrorMessage name="email" component="div"/>
                  </div>
  
                <div>
                  <label htmlFor="password">Password:</label>
                  <Field type="password" id="password" name="password"/>
                  <ErrorMessage name="password" component="div"/>
                </div>
  
                <button disabled={loading} type="submit">Submit</button>
              </Form>
        </Formik>
    )
  }