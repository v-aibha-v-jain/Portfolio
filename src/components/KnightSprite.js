import React, { useCallback, useEffect, useRef, useState } from 'react';
import idleSprite from '../assets/sprites/theknightidlepixel.png';
import jumpSprite from '../assets/sprites/theknightpixeljump.png';
import slashSprite from '../assets/sprites/theknightslashpixel.png';
import walkingSprite from '../assets/sprites/theknightwalkingpixel.png';
import './KnightSprite.css';

const ANIMATIONS = {
  idle: { image: idleSprite, frames: 2, frameWidth: 30, frameDuration: 420 },
  walk: { image: walkingSprite, frames: 4, frameWidth: 30, frameDuration: 90 },
  jump: { image: jumpSprite, frames: 7, frameWidth: 30, frameDuration: 90 },
  slash: { image: slashSprite, frames: 4, frameWidth: 40, frameDuration: 90 },
};

const getRandomStopDelay = () => 4500 + Math.random() * 6500;

const KnightSprite = () => {
  const [animation, setAnimation] = useState('walk');
  const [frame, setFrame] = useState(0);
  const [direction, setDirection] = useState(1);
  const [position, setPosition] = useState(0);
  const directionRef = useRef(1);
  const positionRef = useRef(0);
  const animationRef = useRef('walk');
  const actionTimeoutRef = useRef(null);
  const stopTimeoutRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const setKnightAnimation = useCallback((nextAnimation) => {
    animationRef.current = nextAnimation;
    setAnimation(nextAnimation);
    setFrame(0);
  }, []);

  const scheduleStop = useCallback(() => {
    stopTimeoutRef.current = window.setTimeout(() => {
      if (animationRef.current === 'walk') {
        setKnightAnimation('idle');
        resumeTimeoutRef.current = window.setTimeout(() => {
          setKnightAnimation('walk');
          scheduleStop();
        }, 2200 + Math.random() * 2400);
      }
    }, getRandomStopDelay());
  }, [setKnightAnimation]);

  const triggerAction = useCallback(() => {
    if (animationRef.current === 'jump' || animationRef.current === 'slash') {
      return;
    }

    const wasIdle = animationRef.current === 'idle';
    const returnAnimation = wasIdle ? 'walk' : animationRef.current;
    if (wasIdle) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    if (Math.random() < 0.3) {
      const nextDirection = directionRef.current * -1;
      directionRef.current = nextDirection;
      setDirection(nextDirection);
    }

    window.clearTimeout(actionTimeoutRef.current);
    const action = Math.random() < 0.5 ? 'jump' : 'slash';
    setKnightAnimation(action);
    actionTimeoutRef.current = window.setTimeout(() => {
      setKnightAnimation(returnAnimation);
      if (wasIdle) {
        scheduleStop();
      }
    }, ANIMATIONS[action].frames * ANIMATIONS[action].frameDuration + 100);
  }, [scheduleStop, setKnightAnimation]);

  useEffect(() => {
    scheduleStop();

    let lastTimestamp = performance.now();
    let animationFrame;
    const move = (timestamp) => {
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (animationRef.current === 'walk') {
        const nextPosition = positionRef.current + directionRef.current * elapsed * 0.11;
        const spriteWidth = 60;
        const viewportWidth = window.innerWidth;

        if (nextPosition > viewportWidth - spriteWidth) {
          positionRef.current = viewportWidth - spriteWidth;
          setPosition(viewportWidth - spriteWidth);
          directionRef.current = -1;
          setDirection(-1);
        } else if (nextPosition < 0) {
          positionRef.current = 0;
          setPosition(0);
          directionRef.current = 1;
          setDirection(1);
        } else {
          positionRef.current = nextPosition;
          setPosition(nextPosition);
        }
      }

      animationFrame = window.requestAnimationFrame(move);
    };

    animationFrame = window.requestAnimationFrame(move);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(stopTimeoutRef.current);
      window.clearTimeout(resumeTimeoutRef.current);
      window.clearTimeout(actionTimeoutRef.current);
    };
  }, [scheduleStop]);

  useEffect(() => {
    const frameTimer = window.setInterval(() => {
      setFrame((currentFrame) => (currentFrame + 1) % ANIMATIONS[animation].frames);
    }, ANIMATIONS[animation].frameDuration);

    return () => window.clearInterval(frameTimer);
  }, [animation]);

  const currentAnimation = ANIMATIONS[animation];

  return (
    <button
      type="button"
      className="knight-sprite"
      aria-label="Tap the knight to make it jump or slash"
      onClick={triggerAction}
      style={{
        left: `${position}px`,
        transform: `scaleX(${direction})`,
        width: `${currentAnimation.frameWidth * 2}px`,
        backgroundImage: `url(${currentAnimation.image})`,
        backgroundPosition: `-${frame * currentAnimation.frameWidth * 2}px 0`,
        backgroundSize: `${currentAnimation.frames * currentAnimation.frameWidth * 2}px 60px`,
      }}
    />
  );
};

export default KnightSprite;
