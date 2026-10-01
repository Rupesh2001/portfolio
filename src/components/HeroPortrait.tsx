import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useCallback, type PointerEvent } from 'react';
import profilePhoto from '../assets/profile.webp';

const TILT = 6;
const PERSPECTIVE = 900;

export function HeroPortrait() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [TILT, -TILT]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-TILT, TILT]), { stiffness: 160, damping: 18 });

  const handleMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (reduce) return;
      const box = event.currentTarget.getBoundingClientRect();
      pointerX.set((event.clientX - box.left) / box.width - 0.5);
      pointerY.set((event.clientY - box.top) / box.height - 0.5);
    },
    [pointerX, pointerY, reduce],
  );

  const handleLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <motion.figure
      className="id-card"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: PERSPECTIVE }}
    >
      <div className="id-card__media">
        <img src={profilePhoto} alt="Portrait of Rupesh Mahat, QA and automation engineer" width={720} height={720} />
        <span className="id-card__scan" aria-hidden="true" />
      </div>

      <figcaption className="id-card__meta">
        <span>ID RM-001</span>
        <span>BHAKTAPUR · NP</span>
      </figcaption>

      <p className="status-row">
        <span className="status-dot" aria-hidden="true" />
        <span>[ STATUS: AVAILABLE ]</span>
      </p>
    </motion.figure>
  );
}
