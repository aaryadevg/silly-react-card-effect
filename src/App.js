import './App.css';
import React, { useEffect, useState } from 'react'
import myBabyGirl from "./baby_girl.jpg"

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const relX = event.clientX / window.innerWidth  - 0.5;
      const relY = event.clientY / window.innerHeight - 0.5;
      setMousePos({ x: relX, y: relY});
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  const crossProduct = (vecA, vecB) => {
    let result = [0, 0, 0];
    result[0] = vecA[1] * vecB[2] - vecA[2] * vecB[1];
    result[1] = vecA[2] * vecB[0] - vecA[0] * vecB[2];
    result[2] = vecA[0] * vecB[1] - vecA[1] * vecB[0];
    
    return result
  }

  const mag = (vec) => {
    return Math.sqrt(vec.map((x) => x * x).reduce((a, b) => a + b))
  }

  const norm = (vec) => {
    const len = mag(vec)
    return vec.map((x) => x / len)
  }

  const dot = (vecA, vecB) => {
    return vecA.map((x, i) => x * vecB[i]).reduce((a, b) => a + b);
  }

  const rotate = () => {
    const planeNorm = [0, 0, 1];
    const mouse3D = norm([mousePos.x, mousePos.y, 1]);
  
    const axes = crossProduct(planeNorm, mouse3D);

    const angle = Math.acos(dot(planeNorm, mouse3D));
  
    const angleDeg = (angle * 180) / Math.PI;
  
    const rotationDirection = axes[2] >= 0 ? 1 : -1;
  
    return `rotate3d(${-axes[0]}, ${-axes[1]}, ${-axes[2]}, ${rotationDirection * angleDeg}deg)`;
  };
  

  console.log(rotate())

  return (
    <div className="App">
      <div className='card' style={{
        transform: rotate()
      }}>
        <h1 className='head'>Suzuki Hayabusa</h1>
        <img src={myBabyGirl} className="card_img" />
        <p>
        Famed for its abundant power, agility and majestic presence. Legendary for establishing new levels of ultimate sport performance, and for retaining the number one position for the past two decades
        </p>
        <hr />
        <h3>Price: ₹ 16,00,000</h3>
        <div className='footer'>
          <a href="https://www.suzukimotorcycle.co.in/product-details/hayabusa" className='btn' target='_blank'>Buy Now!</a>
        </div>
      </div>
    </div>
  );
}

export default App;
