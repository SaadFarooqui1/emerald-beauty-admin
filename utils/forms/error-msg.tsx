import React from 'react'
import { ErrorMsgProps } from '@/types/types'

const ErrorMsg: React.FC<ErrorMsgProps> = ({ error }) => (
    <>{error != undefined && <p style={{ color: 'red' }} className='capitalize'>{error}</p>}</>
)

export default ErrorMsg
