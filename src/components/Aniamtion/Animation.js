import React from 'react'
import ReactLottie from 'react-lottie'
import { useSelector } from 'react-redux'

import * as animationData from '../../asset/blenderColor.json'

const defaultOptions = {
  loop: true,
  autoplay: false,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    viewBoxSize: '130 150 250 250',
  },
}

export default function App() {
  const isProcessing = useSelector((state) => state.processing.isProcessing)

  return (
    <ReactLottie
      options={defaultOptions}
      isPaused={!isProcessing}
      isClickToPauseDisabled
    />
  )
}
