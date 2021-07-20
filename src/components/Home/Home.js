import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

const Home = () => {
  const [about, setAbout] = useState(false)
  const aboutJSX =
  <div>
    <h2>About Section</h2>
    <p>The story of Project Achilles:</p>
    <section>
    Homer&apos;s <i>Iliad</i> tells the stroy of Achilles, the greatest warrior in all of Greece during the Trojan War.
    He was invincible everywhere, except for on his heel. After being struck with an arrow to the ankle Achilles perished.

    Project Achilles was created out of the understanding that although most Veterans have access to many resources, some do not.
    Therefore, it was created to help bring resources to those who have less access.

    Through Project Achilles Veterans can come together and share some of their favorite reources, and help others get much needed
    assistance.
    </section>
  </div>
  return (
    <div className="flex-container">
      <h1 className="flex-item home">Project Achilles</h1>
      <section className="flex-item home">{about ? aboutJSX : ''}
      </section>
      <Button onClick={() => setAbout(!about)}>{about ? 'Close' : 'About'}</Button>
    </div>
  )
}

export default Home
