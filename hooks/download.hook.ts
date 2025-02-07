import { useRef, useState } from 'react'

export const useDownloadFile = () => {
    const ref = useRef<HTMLAnchorElement | null>(null)
    const [url, setFileUrl] = useState<string>()
    const [name, setFileName] = useState<string>()

    const download = async (data: Blob) => {
        try {
            const url = URL.createObjectURL(new Blob([data]))
            setFileUrl(url)
            setFileName('test.pdf')
            ref.current?.click()
            URL.revokeObjectURL(url)
        } catch (error) {}
    }

    return { download, ref, url, name }
}
