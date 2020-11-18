import logo from './logo.svg';
import './app2.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
<ul class="topnav" id="menu">
<h1>Shop Name</h1>
<div class="bottom-arrow"><a href="#index" class="active">Home</a></div>
  <a href="public/products.html">Products</a>
  <a href="Shipping/shipping.html">Shipping & Returns</a>
  <a href="Contact/contact.html">Contact</a>
    <button class="topButton">Signup</button>
    <button class="topButton" onclick="showLogin()">Login</button>
    <div class="cart"><a href="../Cart/cart.html" class="cartlink"><img src="https://i.ibb.co/0DkxSzb/cart.png" class="cartimg"></img></a></div>
</ul>
  );
  }
  const slideData = [
    {
      index: 0,
      headline: 'Illidan the Betrayer',
      button: 'Shop now',
      src: 'https://img.alicdn.com/imgextra/i2/1713761720/O1CN01FjPm9s1OZnnBht2ZC_!!1713761720.jpg'
    },
    {
      index: 1,
      headline: 'Frostmourne Runeblade',
      button: 'Shop now',
      src: 'https://ae01.alicdn.com/kf/HTB1iQcBXULrK1Rjy0Fjq6zYXFXaS/For-Dota-Frostmourne-Sword-Keycaps-ESC-OEM-Backlight-3D-Backlit-Aluminum-Metal-Keycaps-for-Mechanical-Gaming.jpg_q50.jpg'
    },
    {
      index: 2,
      headline: 'Gengar - Pokemon',
      button: 'Catch him today',
      src: 'https://media.karousell.com/media/photos/products/2020/6/12/scraft_artisan_pokemon_resin_k_1591948920_9887bf4b_progressive'
    },
    {
      index: 3,
      headline: 'Mystical Dragon series',
      button: 'Shop now',
      src: 'https://www.dwarf-factory.com/wp-content/uploads/2020/05/Mystic-Dragon-V2-Concept-Crop-5.jpg'
    }
  ]
  
  
  // =========================
  // Slide
  // =========================
  
  class Slide extends React.Component {
    constructor(props) {
      super(props)
  
      this.handleMouseMove = this.handleMouseMove.bind(this)
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
      this.handleSlideClick = this.handleSlideClick.bind(this)
      this.imageLoaded = this.imageLoaded.bind(this)
      this.slide = React.createRef()
    }
    
    handleMouseMove(event) {
      const el = this.slide.current
      const r = el.getBoundingClientRect()
  
      el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
      el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
    }
    
    handleMouseLeave(event) {    
      this.slide.current.style.setProperty('--x', 0)
      this.slide.current.style.setProperty('--y', 0)
    }
    
    handleSlideClick(event) {
      this.props.handleSlideClick(this.props.slide.index)
    }
    
    imageLoaded(event) {
      event.target.style.opacity = 1
    }
    
    render() {
      const { src, button, headline, index } = this.props.slide
      const current = this.props.current
      let classNames = 'slide'
      
      if (current === index) classNames += ' slide--current'
      else if (current - 1 === index) classNames += ' slide--previous'
      else if (current + 1 === index) classNames += ' slide--next'
          
      return (
        <li 
          ref={this.slide}
          className={classNames} 
          onClick={this.handleSlideClick}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="slide__image-wrapper">
            <img 
              className="slide__image"
              alt={headline}
              src={src}
              onLoad={this.imageLoaded}
            />
          </div>
          
          <article className="slide__content">
            <h2 className="slide__headline">{headline}</h2>
            <BrowserRouter><Link to="/public/products.html"><button className="slide__action btn">{button}</button></Link></BrowserRouter>
          </article>
        </li>
      )
    }
  }
  
  
  // =========================
  // Slider control
  // =========================
  
  const SliderControl = ({ type, title, handleClick }) => {
    return (
      <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
        <svg className="icon" viewBox="0 0 24 24">
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
    )
  }
  
  
  // =========================
  // Slider
  // =========================
  
  class Slider extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = { current: 0 }
      this.handlePreviousClick = this.handlePreviousClick.bind(this)
      this.handleNextClick = this.handleNextClick.bind(this)
      this.handleSlideClick = this.handleSlideClick.bind(this)
    }
    
    handlePreviousClick() {
      const previous = this.state.current - 1
          
      this.setState({ 
        current: (previous < 0) 
          ? this.props.slides.length - 1
          : previous
      })
    }
    
    handleNextClick() {
      const next = this.state.current + 1;
      
      this.setState({ 
        current: (next === this.props.slides.length) 
          ? 0
          : next
      })
    }
    
    handleSlideClick(index) {
      if (this.state.current !== index) {
        this.setState({
          current: index
        })
      }
    }
  
    render() {
      const { current, direction } = this.state
      const { slides, heading } = this.props 
      const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
      const wrapperTransform = {
        'transform': `translateX(-${current * (100 / slides.length)}%)`
      }
      
      return (
        <div className='slider' aria-labelledby={headingId}>
          <ul className="slider__wrapper" style={wrapperTransform}>
            <h3 id={headingId} class="visuallyhidden">{heading}</h3>
            
            {slides.map(slide => {
              return (
                <Slide
                  key={slide.index}
                  slide={slide}
                  current={current}
                  handleSlideClick={this.handleSlideClick}
                />
              )
            })}
          </ul>
          
          <div className="slider__controls">
            <SliderControl 
              type="previous"
              title="Go to previous slide"
              handleClick={this.handlePreviousClick}
            />
            
            <SliderControl 
              type="next"
              title="Go to next slide"
              handleClick={this.handleNextClick}
            />
          </div>
        </div>
      )
    }
  }
  
  
  ReactDOM.render(<Slider heading="Example Slider" slides={slideData} />, document.getElementById('app'));

export default App;
