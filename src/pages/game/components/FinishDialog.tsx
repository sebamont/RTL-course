import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Text,
  HStack,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

import { NumberFrom4To10 } from "../types";
import ShareButtons from "../../../common/components/ShareButtons";

interface FinishDialogProps {
  openFinishDialog: boolean;
  setOpenFinishDialog: React.Dispatch<React.SetStateAction<boolean>>;
  attempts: NumberFrom4To10;
  emojiDrawResult: string[];
  shareableLink: string;
  hiddenWord: string;
  hiddenWordDefinition: string;
  hasWon?: boolean;
}

const FinishDialog: FC<FinishDialogProps> = ({
  openFinishDialog,
  setOpenFinishDialog,
  attempts,
  emojiDrawResult,
  shareableLink,
  hiddenWord,
  hiddenWordDefinition,
  hasWon = false,
}) => {
  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState(false);
  const handleUpvoteWord = () => {
    console.log("upvote word");
    setHasVoted(true);
  };
  const handleDownvoteWord = () => {
    console.log("downvote word");
    setHasVoted(true);
  };

  return (
    <Modal isOpen={openFinishDialog} onClose={() => setOpenFinishDialog(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {hasWon
            ? `You won on: ${emojiDrawResult.length}/${attempts} attempts!`
            : "You Lost!"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack textAlign={"center"} spacing={2}>
            <HStack>
              <Text fontSize={"xl"}>
                Hidden word: <strong>{hiddenWord}</strong>{" "}
              </Text>
              {!hasVoted && (
                <HStack spacing={1}>
                  <Button size={'sm'} title="Downvote word" onClick={handleDownvoteWord}>
                    <FaThumbsDown />
                  </Button>
                  <Button size={'sm'} title="Upvote word" onClick={handleUpvoteWord}>
                    <FaThumbsUp />
                  </Button>
                </HStack>
              )}
            </HStack>
            <Text fontSize={"md"}>
              <em>"{hiddenWordDefinition}"</em>
            </Text>
            <Divider />
            <Text fontSize={"lg"} textAlign={"left"}>
              Share
            </Text>
            <ShareButtons
              linkHref={shareableLink}
              wppMessage={
                hasWon
                  ? `It took me ${emojiDrawResult.length}/${attempts} attempts to guess the world. Can you do it better?`
                  : '"I couldnt guess the hidden word! %0a I challenge you to do it %0a "'
              }
              twMessage={
                hasWon
                  ? emojiDrawResult.join("%0a") +
                    `%0a It took me ${emojiDrawResult.length} attempt${
                      emojiDrawResult.length > 1 ? "s" : ""
                    } to find the hidden word! %0a Can you do it better?`
                  : "I couldnt find the hidden word! 🤔 %0a Do you think you could? %0a "
              }
            />
            <Divider />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' colorScheme={'purple'} onClick={() => navigate('/')}>
              Go to Home
          </Button>
          <Button
            colorScheme={"purple"}
            as={Link}
            href={`/play?attempts=${attempts}&difficulty=${hiddenWord.length}`}
          >
            Play again with same config
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default FinishDialog;
