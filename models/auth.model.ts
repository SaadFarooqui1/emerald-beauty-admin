// import { add_user } from "@/redux/features/auth-slice"
// import { AppDispatch } from "@/redux/store"
// import auth_service from "@/services/auth.service"
// import { useRouter } from "next/router"
// import { useState } from "react"
// import { useQuery } from "react-query"
// import { useDispatch } from "react-redux"

import { add_user } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import auth_service from "@/services/auth.service";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

// export const useModelGetVeirfy = (data: any, enable: boolean = true) => {
//     const [isUser, setisUser] = useState(0)
//     const dispatch = useDispatch<AppDispatch>()
//     const router = useRouter()

//     return useQuery(['user', data], () => auth_service.verify(), {
//         enabled: enable,
//         staleTime: 60 * (60 * 1000),
//         async onSuccess(data) {
//             if (data == null) {
//                 router.push('/auth/sign-in')
//                 return false
//             }
//             else {
//                 setisUser(1)
//                 dispatch(add_user(data.user))
//             }
//         },
//     })

// }



export const useModelGetVeirfy = (data: any, enable: boolean = true) => {
    const [isUser, setisUser] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    return useQuery(['user', data], () => auth_service.verify(data), { // Pass `data` as `params`
        enabled: enable,
        staleTime: 60 * (60 * 1000),
        async onSuccess(data) {
            if (data == null) {
                router.push('/auth/sign-in');
                return false;
            } else {
                setisUser(1);
                dispatch(add_user(data.profile));
            }
        },
    });
};