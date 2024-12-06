import React from 'react';
import OceanElement from '../ocean-element/ocean-element';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
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
        className={'max-lg:h-[20%] max-lg:w-[50%] h-[20%] w-[40%]'}
      ></OceanElement>
      <Credenza>
        <CredenzaTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <OceanElement
                key={-2}
                lottieSource={'/animations/monkey.json'}
                imageSource={null}
                topPrct={13}
                leftPrct={72}
                className={'max-lg:h-[16.5%] max-lg:w-[40%] h-[19%] :w-[40%]'}
              ></OceanElement>
            </TooltipTrigger>
            <TooltipContent>Communiquez avec le Monkey</TooltipContent>
          </Tooltip>
        </CredenzaTrigger>
        <CredenzaContent className="">
          <CredenzaTitle>{null}</CredenzaTitle>
          <Chat></Chat>
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
