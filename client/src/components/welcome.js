import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

import Typewriter from 'typewriter-effect';

export default function Welcome() {
    return (
        <Typewriter
        options={{
          delay: 30,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter.typeString('Craft a story with the world.')
            .pauseFor(1500)
            .deleteAll(-1)
            .typeString('Login to play now!')
            .pauseFor(5000)
            .deleteAll(-1)
            .start()
        }}
      />
    )
}

