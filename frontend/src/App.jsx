import React from 'react'
import Page1Intro from './components/pages/Page1Intro'
import Page2NYC from './components/pages/Page2NYC'
import Page3Dashboard from './components/pages/Page3Dashboard'
import Page4Devices from './components/pages/Page4Devices'
import Page5Features from './components/pages/Page5Features'
import Page6Outro from './components/pages/Page6Outro'

export default function App() {
  return (
    <main className="w-full">
      <div id="page1"><Page1Intro /></div>
      <div id="page2"><Page2NYC /></div>
      <div id="page3"><Page3Dashboard /></div>
      <div id="page4"><Page4Devices /></div>
      <div id="page5"><Page5Features /></div>
      <div id="page6"><Page6Outro /></div>
    </main>
  )
}
