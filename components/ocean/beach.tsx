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
        topPrct={9.8}
        leftPrct={75}
        className={'h-96 w-96'}
      ></OceanElement>
      <Credenza>
        <CredenzaTrigger>
          <OceanElement
            key={-2}
            lottieSource={'/animations/monkey.json'}
            imageSource={null}
            topPrct={8}
            leftPrct={70}
            className={'h-52 w-52'}
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
