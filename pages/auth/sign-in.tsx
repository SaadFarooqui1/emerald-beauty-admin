import { useSignInAction } from '@/actions/auth.action';
import IconLoader from '@/components/Icon/IconLoader';
import BlankLayout from '@/components/Layouts/BlankLayout';
import ErrorMsg from '@/utils/forms/error-msg';
import Spinner from '@/utils/forms/spinner';
import { getToken } from '@/utils/helper';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
    const router = useRouter();

    const { mutate: SignInAction, isLoading } = useSignInAction();
    const initialVal: any = { email: "", password: "", roles: [1 , 4.1] }
    const { signInSchema } = useValidationSchemaHook();
    const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
        useFormik({
            initialValues: initialVal,
            validationSchema: signInSchema,
            onSubmit: async (values, { resetForm }) => {
                SignInAction(values)
                resetForm()
            }
        });

    useEffect(() => {
        if (getToken()) {
            router.replace('/')
        }
    }, [])

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-[#00253B]">
                                        <input type="email" placeholder="Enter Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="email"
                                            className="form-input ps-4 h-[50px] rounded-[15px] placeholder:text-[#00253B]" />
                                        {touched.email && <ErrorMsg error={errors.email as string} />}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-[#00253B]">
                                        <input
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="password"
                                            type="password" placeholder="Enter Password" className="form-input rounded-[15px] ps-4 h-[50px] placeholder:text-[#00253B]" />
                                        {touched.password && <ErrorMsg error={errors.password as string} />}
                                    </div>
                                </div>
                                <div>
                                    {/* <Link href="/auth/password-reset" className="text-[#00253B] hover:text-primary">Forgot Password?</Link> */}
                                </div>
                                <button
                                    type="submit"
                                    // onClick={() => router.push('/')}
                                    className="btn bg-secondary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {isLoading ? <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" /> : 'Sign in'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.authenticate = false

Login.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default Login;
