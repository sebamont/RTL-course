import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const extendedTheme = extendTheme({
  styles: {
    global: (props:any) => ({
      body: {
        bg: mode('white', 'gray.700')(props),
      },
    }),
  },
})

export default extendedTheme