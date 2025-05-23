"use client";

import {
  Animation,
  Animator,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  Sticky,
  StickyIn,
  ZoomIn,
  batch,
} from "@/components/react-scroll-motion";

export default function Home() {
  // Batch animations
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());

  // Make custom animation
  const Spin = (cycle: number, direction: "in" | "out" | "both" = "both") =>
    ({
      in:
        direction === "in" || direction === "both"
          ? { style: { transform: (p) => `rotate(${p * 360 * cycle}deg)` } }
          : {},
      out:
        direction === "out" || direction === "both"
          ? { style: { transform: (p) => `rotate(${p * 360 * cycle}deg)` } }
          : {},
    }) as Animation;

  return (
    <ScrollContainer>
      <ScrollPage>
        <Animator animation={batch(Sticky(), Fade(), Spin(1, "out"))}>
          <h1 style={{ fontSize: 50 }}>Hello!!!</h1>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
          <span style={{ fontSize: 30 }}>
            Let me show you scroll animation 😀
          </span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <span style={{ fontSize: 40 }}>I&apos;m FadeUpScrollOut ✨</span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={FadeUp}>
          <span style={{ fontSize: 40 }}>I&apos;m FadeUp ⛅️</span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <span style={{ fontSize: 40 }}>
            <Animator animation={MoveIn(-1000, 0)}>Hello Guys 👋🏻</Animator>
            <Animator animation={MoveIn(1000, 0)}>Nice to meet you 🙋🏻‍♀️</Animator>
            - I&apos;m Dante Chun -
            <Animator animation={MoveOut(1000, 0)}>Good bye ✋🏻</Animator>
            <Animator animation={MoveOut(-1000, 0)}>See you 💛</Animator>
          </span>
        </div>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={batch(Fade(), Sticky())}>
          <span style={{ fontSize: 40 }}>Done</span>
          <br />
          <span style={{ fontSize: 30 }}>
            There&apos;s FadeAnimation, MoveAnimation, StickyAnimation,
            ZoomAnimation
          </span>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
}
