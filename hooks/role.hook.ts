import { RootState } from "@/redux/store"
import { NextPage } from "next"
import { useSelector } from "react-redux"



const useRole = (roles: NextPage['roles']) => {

    const { user } = useSelector((state: RootState) => state.auth)

    const hasRole = () => {

        if (!roles) return true

        const user_role = user?.roles[0].name ?? null

        if (user_role == null) return true

        const hasRole = roles?.every(r => [user_role].includes(r))

        return hasRole
    }

    return { hasRole }
}

export default useRole
