import { RootState } from "@/redux/store"
import { NextPage } from "next"
import { useSelector } from "react-redux"

const usePermissions = (permissions: NextPage['permissions']) => {

    const { user } = useSelector((state: RootState) => state.auth)

    const hasPermissions = () => {
        
        if (!permissions) return true

        // const user_permission = user?.roles?.permissions ?? null

        // if (user_permission == null) return true

        // const hasPermissions = permissions?.every(r => user_permission.includes(r))

        // return hasPermissions
    }

    return { hasPermissions }
}

export default usePermissions
