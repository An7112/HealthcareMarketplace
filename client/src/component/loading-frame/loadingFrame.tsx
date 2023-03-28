import React from 'react'
import './loading.scss'

interface IProps {
  divWidth: any;
  divHeight: any;
  spacing?: any;
  borderRadius?:any;
  maxDivWidth?:any;
}
export function LoadingFrame({divWidth, divHeight, spacing, borderRadius, maxDivWidth}:IProps) {
  return (
    <div className='div-load' style={{width:`${divWidth}`, height:`${divHeight}`, margin:`${spacing}`, borderRadius:`${borderRadius}`, maxWidth:`${maxDivWidth}`}}></div>
  )
}