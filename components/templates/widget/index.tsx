import Box, { BoxProps } from "@mui/material/Box";

export function Widget({ children, ...rest }: BoxProps) {
  return (
    <Box component="section" height={400} {...rest}>
      {children}
    </Box>
  );
}
