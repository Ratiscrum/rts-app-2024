/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

//@ts-ignore
export default function DoomCaptcha({ onKill: any }) {
  window.addEventListener('message', (event) => {
    //@ts-ignore
    onKill();
  });

  return (
    <>
      <iframe
        id="doom_frame"
        src="/doom_page.html"
        width="100%"
        height="100%"
      ></iframe>
    </>
  );
}
