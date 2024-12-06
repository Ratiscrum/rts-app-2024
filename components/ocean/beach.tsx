import React from 'react';
import OceanElement from '../ocean-element/ocean-element';
import {
  Credenza,
  CredenzaContent,
  CredenzaTitle,
  CredenzaTrigger,
} from '../ui/credenza';
import Chat from '@/app/(main)/chat/page';

export default function BeachBackground() {
  return (
    <div>
      <OceanElement
        key={-1}
        lottieSource={'/animations/beach.json'}
        imageSource={null}
        topPrct={13}
        leftPrct={70}
        className={'h-[20%] w-[40%]'}
        name="Discutez avec le Monkey !"
      ></OceanElement>
      <Credenza>
        <CredenzaTrigger>
          <OceanElement
            key={-2}
            lottieSource={'/animations/monkey.json'}
            imageSource={null}
            topPrct={7}
            leftPrct={65}
            className={'h-[10%] w-[30%]'}
            name="Discutez avec le Monkey !"
          ></OceanElement>
        </CredenzaTrigger>
        <CredenzaContent className="">
          <CredenzaTitle>{null}</CredenzaTitle>
          <Chat></Chat>
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
