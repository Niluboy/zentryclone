import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['Nexus','Vault','Prologue','About','Contact'];

const Navbar = () => {
    const [audioPlay , setaudioPlay] = useState(false);
    const [indicatorActive, setindicatorActive] = useState(false);
    const [lastScrollY, setlastScrollY] = useState(0)
    const [navVisible, setnavVisible] = useState(true)

    const navRef = useRef(null)
    const audioRef = useRef(null)

    const {y:currentScrollY} = useWindowScroll();

    useEffect(()=>{
        if(currentScrollY === 0){
          setnavVisible(true);
          navRef.current.classList.remove('floating-nav')
        }
        else if(currentScrollY > lastScrollY){
          setnavVisible(false)
          navRef.current.classList.add('floating-nav')
        }
        else if(currentScrollY < lastScrollY){
          setnavVisible(true)
          navRef.current.classList.add('floating-nav')
        }
        setlastScrollY(currentScrollY)
    },[currentScrollY])

    useEffect(()=>{
      gsap.to(navRef.current,{
        y: navVisible ? 0 : -100,
        opacity: navVisible ? 1 : 0,
        duration: 0.2,
      })
    },[navVisible])

    const toggleAudio = ()=>{
        setaudioPlay(prev=>!prev);
        setindicatorActive(prev=>!prev);
    }
    useEffect(()=>{
        if(audioPlay){
          audioRef.current.play()
        }
        else{
          audioRef.current.pause();
        }
    },[audioPlay])
  return (
    <div ref={navRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
          {/*left section  */}
          <div className='flex items-center gap-7'>
              <img src="/img/logo.png" alt="logo" className='w-10'/>
              <Button 
              id='product--button'
              title='Products'
              rightIcon={<TiLocationArrow/>}
              containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
              />
          </div>
          {/* right */}
          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map((item)=>(
                <a key={item} className='nav-hover-btn' href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              ))}
            </div>
            <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudio}>
              <audio ref={audioRef} className='hidden' src="/audio/loop.mp3" loop/>
              {[1,2,3,4].map((bar)=>(
                <div key={bar} className={`indicator-line ${indicatorActive ? 'active' : ''}`} style={{animationDelay:`${bar *0.1}s`}}/>

              ))}
            
            </button>
          </div>

        </nav>
            
        </header>

    </div>
  )
}

export default Navbar