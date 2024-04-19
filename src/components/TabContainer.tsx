import React, { useState } from 'react';
import { Text, Box, Button, ButtonGroup, Flex, Input } from "@yamada-ui/react";
import { Listbox } from './Listbox';
import { v4 as uuidv4 } from 'uuid';

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
  const handleAddTab = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTabId = uuidv4();
    const newTabLabel = newTabName.trim() !== "" ? newTabName : `Tab`;
    const newTab: Tab = { id: newTabId, label: newTabLabel };
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId);
    setNewTabName("");
  }

  const handleTabDelete=(tabId: string) =>{
    const newTabs = tabs.filter((tab) => tab.id !== tabId);

    setTabs(newTabs);
  }

  return (
    <Box bg='gray.300' p={6}>

      <form onSubmit={(e) => handleAddTab(e)}>
        <Flex gap={4}>
          <Input
            placeholder="New List Name"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            bgColor='white'
            focusBorderColor='primary.300'
          />
          <Button colorScheme='primary' type='submit'>Add List</Button>
        </Flex>
      </form>

      <Box bg='gray.100' mt={4} rounded='md' overflow="auto">
        <Text p={4} fontSize='2xl'>Tab of List</Text>
        <ButtonGroup p={4} gap={4}>
          {tabs.map((tab) => (
            <ButtonGroup isAttached>
              <Button
                _hover={{ bg: 'primary.200', color: 'black', }}
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                color={activeTab === tab.id ? 'white' : 'black'}
                bgColor={activeTab === tab.id ? 'primary' : 'white'}
              >
                {tab.label}
              </Button>

              <Button colorScheme='red' onClick={() => handleTabDelete(tab.id)}>
                ×
              </Button>
            </ButtonGroup>
          ))}
        </ButtonGroup>
      </Box>
      <Box mt={4}>
        {tabs.map((tab) => (
          <Box key={tab.id} display={activeTab === tab.id ? 'block' : 'none'}>
            <Listbox message={`${tab.label}`} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
