import React, { FC } from "react"

import { Box,  HStack } from "@chakra-ui/react"
import { NumberFrom4To10 } from "../../pages/game/types"

interface MicroChartBarProps {
    value: NumberFrom4To10
}

export const MicrochartBar:FC<MicroChartBarProps> = ({value}) => {
    return (
        <HStack spacing="1px" h={"full"} display={"flex"} alignItems={"flex-end"}>
            {Array(6).fill(0).map((_,dif) => 
            <Box key={dif} w="4px"  h={`${(dif+4)*8}%`} bgColor={ value >= (dif+4) ? "purple.300" : "gray.300"} ></Box>
            )}
        </HStack>
    )
}
