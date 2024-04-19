import React, { useState } from 'react'
import {
  Box,
  Checkbox,
  Stack,
  HStack,
  Flex,
  Spacer,
  Grid,
  Center,
  Text,
  Button,
  Input,
  ListItem,
  DiscList,
} from "@yamada-ui/react"

export const Listbox = ({ message }) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  type Item = {
    inputValue: string;
    id: number;
    checked: boolean;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: Item = {
      inputValue: inputValue,
      id: items.length,
      checked: false,
    };

    setItems([newItem, ...items]);
    setInputValue("");
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.inputValue = inputValue;
      }
      return item;
    });

    setItems(newItems);
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.checked = !checked;
      }
      return item;
    });

    setItems(newItems);
  }

  const handleDelete = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);

    setItems(newItems);
  }

  return (
    <Box bg='gray.100' p={6} rounded='md' >
      <Box textAlign="center">
        <Text fontSize='2xl'>{message}</Text>
      </Box>

      <Stack>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex>
            <Input
              type='text'
              bgColor='white'
              focusBorderColor='primary.300'
              placeholder='Item'
              value={inputValue}
              onChange={(e) => handleChange(e)}>
            </Input>

            <Button textColor='white' colorScheme='primary' type='submit'>
              Add
            </Button>
          </Flex>
        </form>
        <Flex justifyContent="center">
          <DiscList>
            <Stack>
              {items.map((item) => (
                <ListItem key={item.id}>
                  <HStack>
                    <Input
                      type='text'
                      bgColor='white'
                      focusBorderColor='primary.300'
                      onChange={(e) => handleEdit(item.id, e.target.value)}
                      value={item.inputValue}
                      disabled={item.checked}
                    />
                    <Checkbox
                      bgColor='white'
                      size='lg'
                      onChange={() => handleChecked(item.id, item.checked)}
                    />
                    <Button size='sm' colorScheme='red' onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </HStack>
                </ListItem>
              ))}
            </Stack>
          </DiscList>
        </Flex>
      </Stack>
    </Box>
  )
}