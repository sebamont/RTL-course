import React, { FC, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
} from "@chakra-ui/react";
import { FaTwitter, FaWhatsapp } from "react-icons/fa";

interface ShareButtonsProps {
  twMessage?: string
  wppMessage?: string;
  linkHref: string;
}
const ShareButtons: FC<ShareButtonsProps> = ({ linkHref, twMessage="Hey! Could you guess the hidden word?", wppMessage="Hey! Could you guess the hidden word?" }) => {
  const [copied, setCopied] = useState(false);

  return (
    <VStack>
      <InputGroup size="md">
        <Input value={linkHref} pr="4.5rem" disabled />
        <InputRightElement width="4.5rem">
          <CopyToClipboard text={linkHref} onCopy={() => setCopied(true)}>
            <Button h="1.75rem" size="sm">
              {!copied ? "Copy" : "Copied"}
            </Button>
          </CopyToClipboard>
        </InputRightElement>
      </InputGroup>
      <Divider />
      <HStack alignItems={"center"} spacing="4px">
          <Button colorScheme={"green"} as={Link} href={`https://wa.me/?text=${wppMessage}%0A ${encodeURIComponent(linkHref)}` } isExternal leftIcon={<FaWhatsapp />}>Whatsapp</Button>
          <Button className="twitter-share-button" colorScheme={"cyan"} as={Link} href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(linkHref)}&text=${twMessage}%0a` } isExternal leftIcon={<FaTwitter />}>Tweet</Button>
      </HStack>
    </VStack>
  );
};

export default ShareButtons;
