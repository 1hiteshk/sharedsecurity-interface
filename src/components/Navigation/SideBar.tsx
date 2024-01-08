import { Box, Divider, Flex, Image, Input, Text, Slide, Button } from "@chakra-ui/react";
import kubikLogo from "../../assets/kubik-logo-white.png";
// import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import ConnectWalletButton from "../Buttons/ConnectWalletButton";
import { Resizable } from 're-resizable';


const SideBar = () => {
  return (
    <>
      <Resizable
        minWidth="230px"
        minHeight={'100vh'}
        maxWidth={"50%"}
      >
        <Box
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          borderRight={"1px solid white"}
          justifyContent={"space-between"}
          py={"20px"}
          px={"20px"}
          // width={"300px"}
          overflow={"hidden"}
          height={"100vh"}
          backgroundColor={"black"}
          zIndex={10}
        >
          <Box minWidth={"200px"}>
            <Flex gap={"10px"} alignItems={"center"}>
              <Image width={"60px"} src={kubikLogo} alt="logo" />
              <Text fontSize={"2xl"} noOfLines={1} textAlign={"left"}>Shared Security</Text>
            </Flex>
            <Divider height={"1px"} bg={"white"} />
            {/* <ConnectWalletButton />
      <Divider height={"1px"} bg={"white"} /> */}

            <Box mt={"30px"} display={"flex"} flexDir={"column"} gap={"10px"}>
              <NavItem path="overview" name="Overview" iconName="overview" />
              <NavItem
                path="aez"
                name="Atomic Economic Zone"
                iconName="swap_horiz"
              />
              <NavItem path="gov" name="Governance" iconName="person" />
              <NavItem path="assets" name="Asset" iconName="toll" />
              <NavItem
                path="validators"
                name="Validator"
                iconName="supervisor_account"
              />
            </Box>
          </Box>
          <ConnectWalletButton />
        </Box>
      </Resizable>
    </>
  );
};

export default SideBar;
