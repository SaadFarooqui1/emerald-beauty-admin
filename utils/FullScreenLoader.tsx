import { useTranslation } from 'react-i18next'

function FullScreenLoader() {
    const { t } = useTranslation()
    return (
        <div className="screen">
            <div className="loader">
                <p style={{ transform: 'translateY(70px)' }}>
                    {t('downloading')}...
                </p>
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
            </div>
        </div>
    )
}

export default FullScreenLoader
