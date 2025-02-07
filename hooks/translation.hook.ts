import { useEffect, useState } from 'react'
import i18n from 'i18next'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
// import { DEFAULT_LANGUAGE } from '@/constants/app'

const useTranlationKey = () => {
    const { t } = useTranslation()

    const _ca = getCookie('lang')

    // const [lang, setlang] = useState<string>(_ca || DEFAULT_LANGUAGE)

    // useEffect(() => {
    //     setlang(i18n.language)
    // }, [t])

    // return { lang }
}
export default useTranlationKey
