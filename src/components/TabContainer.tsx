import React, { useState } from 'react';
import { Text, Box, Button, ButtonGroup, Flex, Input } from "@yamada-ui/react";
import { Listbox } from './Listbox';

type Tab = {
  id: string;
  label: string;
}

export const TabContainer = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [newTabName, setNewTabName] = useState<string>("");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  }
  const handleAddTab = () => {
    const newTabId = `tab${tabs.length + 1}`;
    const newTabLabel = newTabName.trim() !== "" ? newTabName : `Tab ${tabs.length + 1}`;
    const newTab: Tab = { id: newTabId, label: newTabLabel };
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId);
    setNewTabName("");
  }

  return (
    <Box bg='gray.300' p={6}>
      <Flex>
        <Input
          placeholder="New List Name"
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
          mr={2}
          bgColor='white'
          focusBorderColor='primary.300'
        />
        <Button colorScheme='primary' onClick={handleAddTab}>Add List</Button>
      </Flex>
      <Box bg='gray.100' mt={4} rounded='md' overflow="auto">
        <Text p={4} fontSize='2xl'>Tab of List</Text>
        <ButtonGroup p={4} gap={4}>
          {tabs.map((tab) => (
            <Button
              _hover={{ bg: 'primary.200', color: 'black', }}
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              color={activeTab === tab.id ? 'white' : 'black'}
              bgColor={activeTab === tab.id ? 'primary' : 'white'}
            >
              {tab.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box mt={4}>
        {tabs.map((tab) => (
          <Box key={tab.id} display={activeTab === tab.id ? 'block' : 'none'}>
            <Listbox message={`Contents of ${tab.label}`} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
