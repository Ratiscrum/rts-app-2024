import React from 'react'
import OceanElement from '../ocean-element/ocean-element'
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import { Credenza, CredenzaContent, CredenzaTitle, CredenzaTrigger } from '../ui/credenza'
import Chat from '@/app/(main)/chat/page'

export default function BeachBackground() {
  return (
    <div>
        <OceanElement
            key={-1}
            lottieSource={'/animations/beach.json'}
            imageSource={null}
            topPrct={15}
            leftPrct={70}
            className={'h-[20%] w-[40%]'}
          ></OceanElement> 
          <Credenza>
            <CredenzaTrigger >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <OceanElement
                        key={-2}
                        lottieSource={'/animations/monkey.json'}
                        imageSource={null}
                        topPrct={8}
                        leftPrct={65}
                        className={'h-[10%] w-[30%]'}
                    ></OceanElement>        
                    </TooltipTrigger>                          
                <TooltipContent>Communiquez avec le Monkey</TooltipContent>
                </Tooltip>
            </CredenzaTrigger>
            <CredenzaContent className="">
                <CredenzaTitle children={undefined}></CredenzaTitle>
                <Chat></Chat>
            </CredenzaContent>
        </Credenza>   
    </div>            
  )                    
}
