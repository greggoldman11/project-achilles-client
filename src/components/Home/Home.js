import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import './home.scss'

const Home = () => {
  const [about, setAbout] = useState(false)
  const aboutRef = useRef()
  const topRef = useRef()
  function aboutClicked () {
    setAbout(!about)
  }

  useEffect(() => {
    if (about) {
      aboutRef.current.scrollIntoView()
    }
  }, [about])

  const aboutJSX =
  <div>
    <p>The story of Project Achilles:</p>
    <div className="indented">
      <p>
        Homer&apos;s <i>Iliad</i> tells the stroy of Achilles, the greatest warrior in all of Greece during the Trojan War.
        He was invincible everywhere, except for on his heel. After being struck with an arrow to the ankle Achilles perished.
      </p>
      <p>
        Project Achilles was created out of the understanding that although most Veterans have access to many resources, some do not.
        Therefore, it was created to help bring resources to those who have less access.
        Through Project Achilles Veterans can come together and share some of their favorite reources, and help others get much needed
        assistance.
      </p>
    </div>
  </div>
  return (
    <section className="aboutSection">
      <div className="container" ref={topRef}>
        <div className="header-row row">
          <div className="header-row-text row">
          Project Achilles
          </div>
        </div>
        <div className="row" ref={aboutRef}>
          <section className={about ? 'show-class' : ''}>
            {about ? aboutJSX : ''}
          </section>
        </div>
        <div className="row">
          <Button onClick={aboutClicked} className={about ? 'show-button' : ''}>{about ? 'Close' : 'About'}</Button>
        </div>
      </div>
    </section>
  )
}

export default Home
