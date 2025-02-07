import React from 'react'
import { HeadBannerProps } from '../../types/types'

const HeadBanner: React.FC<HeadBannerProps> = ({ title }) => (
    <section
        className="breadcrumb__area breadcrumb__overlay"
        style={{
            backgroundImage: `url(/assets/media/backgrounds/head.jpg)`,
        }}
    >
        <h2 className="tp-breadcrumb__title">{title}</h2>
    </section>
)

export default HeadBanner
