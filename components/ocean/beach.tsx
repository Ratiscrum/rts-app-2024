import React from 'react';
import OceanElement from '../ocean-element/ocean-element';
import {
  Credenza,
  CredenzaContent,
  CredenzaTitle,
  CredenzaTrigger,
} from '../ui/credenza';
import Chat from '../shared/chat';

export default function BeachBackground() {
  return (
    <div>
      <OceanElement
        key={-1}
        lottieSource={'/animations/beach.json'}
        imageSource={null}
        topPrct={16.2}
        leftPrct={75}
        className={'h-[20%] w-[40%] max-lg:h-[20%] max-lg:w-[50%]'}
        name="Discutez avec le Monkey !"
      ></OceanElement>
      <Credenza>
        <CredenzaTrigger>
          <OceanElement
            key={-2}
            lottieSource={'/animations/monkey.json'}
            imageSource={null}
            topPrct={13}
            leftPrct={72}
            className={':w-[40%] h-[19%] max-lg:h-[16.5%] max-lg:w-[40%]'}
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
