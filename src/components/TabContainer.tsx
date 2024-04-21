import React, { useState } from 'react';
import {
  Text,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@yamada-ui/react";
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
  const [editTabId, setEditTabId] = useState<string | null>(null);
  const [editedTabName, setEditedTabName] = useState<string>("");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setEditTabId(null);
    setEditedTabName("");
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

  const handleTabDelete = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
  }

  const handleEditTab = (tabId: string) => {
    setEditTabId(tabId);
    const tabToEdit = tabs.find((tab) => tab.id === tabId);
    if (tabToEdit) {
      setEditedTabName(tabToEdit.label);
    }
  }

  const handleSaveEditTab = (tabId: string) => {
    const editedTabs = tabs.map((tab) => {
      if (tab.id === tabId) {
        return { ...tab, label: editedTabName.trim() !== "" ? editedTabName : tab.label };
      }
      return tab;
    });
    setTabs(editedTabs);
    setEditTabId(null);
    setEditedTabName("");
  }

  const handleCancelEditTab = () => {
    setEditTabId(null);
    setEditedTabName("");
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
          />
          <Button colorScheme='primary' type='submit'>Add List</Button>
        </Flex>
      </form>

      <Box bg='gray.100' mt={4} rounded='md' overflow="auto">
        <Text p={4} fontSize='2xl'>Tab of List</Text>
        <ButtonGroup p={4} gap={4}>
          {tabs.map((tab) => (
            <ButtonGroup isAttached key={tab.id}>
              {editTabId === tab.id ? (
                <form onSubmit={() => handleSaveEditTab(tab.id)}>
                  <Input
                    value={editedTabName}
                    onChange={(e) => setEditedTabName(e.target.value)}
                    bgColor='white'
                    autoFocus // 自動的にフォーカスを当てる
                  />
                  <Button colorScheme="green" onClick={() => handleSaveEditTab(tab.id)}>Save</Button>
                  <Button colorScheme="red" onClick={handleCancelEditTab}>Cancel</Button>
                </form>
              ) : (
                <>
                  <Flex key={tab.id}>
                    <Button
                      _hover={{ bg: 'primary', color: 'yellow' }}
                      onClick={() => handleTabClick(tab.id)}
                      color={activeTab === tab.id ? 'yellow' : 'white'}
                      bgColor={activeTab === tab.id ? 'primary' : 'primary.300'}
                    >
                      {tab.label}
                    </Button>
                    <Menu>
                      <MenuButton
                        as={Button}
                        bg="white"
                      >
                        ...
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleEditTab(tab.id)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleTabDelete(tab.id)}>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </>
              )}
            </ButtonGroup>
          ))}
        </ButtonGroup>
      </Box>
      <Box mt={4}>
        {tabs.map((tab) => (
          <Box key={tab.id} display={activeTab === tab.id ? 'block' : 'none'}>
            <Listbox message={tab.label} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
