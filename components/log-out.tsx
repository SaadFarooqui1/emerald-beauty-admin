import { useSignOutAction } from "@/actions/auth.action"
import { add_user } from "@/redux/features/auth-slice"
import { AppDispatch } from "@/redux/store"
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"

const LogOutComponent = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const queryClient = useQueryClient()
    const { mutate: SignOut } = useSignOutAction()

    const Logout = async () => {
        deleteCookie('_ca');
        router.push("/auth/sign-in")
        // SignOut({}, {
        //     onSuccess(data) {
        //         if (data != null && data.flag === 1) {
        //             // dispatch(add_user({}))
        //             deleteCookie('_ca')
        //             queryClient.removeQueries()
        //             router.push("/auth/signin")
        //         }
        //     }
        // })
    }

    return (
        <li onClick={Logout} className="cursor-pointer border-t py-2">
            <div className="truncate ltr:pl-4 rtl:pr-4 text-danger text-center font-[600]">
                Logout
            </div>
        </li>
    )
}

export default LogOutComponent
