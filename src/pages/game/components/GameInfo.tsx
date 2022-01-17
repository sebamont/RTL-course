import React, { FC } from "react";

import {
  Flex,
  Box,
  HStack,
  theme,
  Tooltip,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";

import { MicrochartBar } from "../../../common/components/MicrochartBar";
import { NumberFrom4To10 } from "../types";
import ShareButtons from "../../../common/components/ShareButtons";

interface GameInfoProps {
    difficulty: NumberFrom4To10
    attempts: number
    shareableLink: string
}

const GameInfo:FC<GameInfoProps> = ({difficulty, attempts, shareableLink}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <HStack
      my={3}
      py={2}
      w="full"
      borderBottom={`2px solid ${theme.colors.purple[200]}`}
      h={16}
      alignItems={"center"}
      justifyContent={"space-around"}
      spacing={"30px"}
    >
         <Box>
         <Tooltip label={"More game modes coming soon..."}>
          <Flex direction={"column"} alignItems={"center"}>
              <Text fontSize={"2xl"} fontWeight={"extrabold"}>
                {attempts===5&&difficulty===5 ? "Classic" : "Custom"}
              </Text>
            <Text fontSize={"xs"}>Game Mode</Text>
          </Flex>
          </Tooltip>
      </Box>
      <Box>
        <Tooltip label={`${difficulty} letters`}>
          <Flex direction={"column"} alignItems={"center"}>
            <Box h={"36px"}>
              <MicrochartBar value={difficulty} />
            </Box>
            <Text fontSize={"xs"}>Difficulty</Text>
          </Flex>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip label={`${attempts} attempts`}>
          <Flex direction={"column"} alignItems={"center"}>
              <Text fontSize={"2xl"} fontWeight={"extrabold"}>
                {attempts}
              </Text>
            <Text fontSize={"xs"}>Attempts</Text>
          </Flex>
        </Tooltip>
      </Box>
      {/* <Box>
        <Tooltip label={"more languages coming soon..."}>
          <Flex direction={"column"} alignItems={"center"}>
            <Image boxSize={"36px"} objectFit={"cover"} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/285/flag-united-kingdom_1f1ec-1f1e7.png" alt="GB Flag"/>
            <Text fontSize={"xs"}>Language</Text>
          </Flex>
        </Tooltip>
      </Box> */}
      <Button title="Share current game" onClick={onOpen}>
          <FaShare />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                  Share current game
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <ShareButtons linkHref={shareableLink} twMessage="I challenge you to solve this Wordle!" wppMessage="I challenge you to solve this Wordle" />
              </ModalBody>
              <ModalFooter>
              <Button colorScheme='gray' mr={3} onClick={onClose}>
              Close
            </Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
    </HStack>
  );
};

export default GameInfo;
