import Box, { BoxProps } from "@mui/material/Box";

export const Widget: React.FC<React.PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => (
  <Box component="section" height={400} {...rest}>
    {children}
  </Box>
);
